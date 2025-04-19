import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import socket from "@/config/socketConfig";
import { VideoCallContext } from "./VideoCallContext";

export const VideoCallProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { currentUser } = useContext(AuthContext);
    const [isIncomingCall, setIsIncomingCall] = useState(false);
    const [isCallActive, setIsCallActive] = useState(false);
    const [callPartner, setCallPartner] = useState<{
        _id: string;
        name: string;
    } | null>(null);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [connectionStatus, setConnectionStatus] = useState("idle");

    // Use refs for persistent state across renders
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const offerDataRef = useRef<any>(null);

    // Configure ICE servers including TURN servers for better NAT traversal
    const getIceServers = () => {
        return {
            iceServers: [
                {
                    urls: [
                        "stun:stun1.l.google.com:19302",
                        "stun:stun2.l.google.com:19302",
                    ],
                },
                // Add TURN servers for production (you'll need to set up your own or use a service)
                // {
                //   urls: 'turn:your-turn-server.com:3478',
                //   username: 'username',
                //   credential: 'password'
                // }
            ],
            iceCandidatePoolSize: 10,
        };
    };

    // Create RTCPeerConnection with enhanced logging
    const createPeerConnection = () => {
        try {
            setConnectionStatus("connecting");
            console.log("Creating peer connection");

            const pc = new RTCPeerConnection(getIceServers());

            pc.onicecandidate = (event) => {
                if (event.candidate && callPartner) {
                    console.log("Sending ICE candidate:", event.candidate);
                    socket.emit("iceCandidate", {
                        to: callPartner._id,
                        candidate: event.candidate,
                    });
                }
            };

            pc.oniceconnectionstatechange = () => {
                console.log("ICE connection state:", pc.iceConnectionState);
                setConnectionStatus(pc.iceConnectionState);
            };

            pc.ontrack = (event) => {
                console.log("Received remote track:", event.streams[0]);
                setRemoteStream(event.streams[0]);
            };

            // Additional state monitors for debugging
            pc.onsignalingstatechange = () => {
                console.log("Signaling state:", pc.signalingState);
            };

            pc.onconnectionstatechange = () => {
                console.log("Connection state:", pc.connectionState);
            };

            peerConnectionRef.current = pc;
            return pc;
        } catch (err) {
            console.error("Error creating peer connection:", err);
            setConnectionStatus("failed");
            return null;
        }
    };

    // Listen for WebRTC signaling events
    useEffect(() => {
        if (!socket) return;

        console.log("Setting up WebRTC event listeners");

        // Incoming call request
        socket.on("incomingCall", async ({ from, name }) => {
            console.log(`Incoming call from ${name} (${from})`);
            setCallPartner({ _id: from, name });
            setIsIncomingCall(true);
        });

        // Receiving WebRTC offer
        socket.on("offer", async ({ offer, from, name }) => {
            console.log(`Received offer from ${name}`, offer);
            offerDataRef.current = { offer, from, name };

            // If we're already accepting the call, process the offer
            if (isCallActive) {
                processReceivedOffer();
            }
        });

        // Call was accepted and answer received
        socket.on("callAccepted", async ({ answer }) => {
            console.log("Call accepted, setting remote description");
            try {
                if (peerConnectionRef.current) {
                    await peerConnectionRef.current.setRemoteDescription(
                        new RTCSessionDescription(answer)
                    );
                    setIsCallActive(true);
                }
            } catch (err) {
                console.error("Error setting remote description:", err);
            }
        });

        // Received ICE candidate from peer
        socket.on("iceCandidate", async ({ candidate }) => {
            console.log("Received ICE candidate:", candidate);
            try {
                if (peerConnectionRef.current && candidate) {
                    await peerConnectionRef.current.addIceCandidate(
                        new RTCIceCandidate(candidate)
                    );
                }
            } catch (err) {
                console.error("Error adding ICE candidate:", err);
            }
        });

        // Call ended by peer
        socket.on("callEnded", () => {
            console.log("Call ended by peer");
            endCallCleanup();
        });

        // Call rejected by peer
        socket.on("callRejected", () => {
            console.log("Call rejected");
            endCallCleanup();
        });

        return () => {
            // Clean up listeners
            socket.off("incomingCall");
            socket.off("offer");
            socket.off("callAccepted");
            socket.off("iceCandidate");
            socket.off("callEnded");
            socket.off("callRejected");
        };
    }, [socket]);

    // Process offer when we already have the local stream set up
    const processReceivedOffer = async () => {
        if (!offerDataRef.current) return;

        const { offer, from, name } = offerDataRef.current;

        try {
            console.log("Processing received offer");

            // Create peer connection if it doesn't exist
            const pc = peerConnectionRef.current || createPeerConnection();
            if (!pc) return;

            // Set remote description from the offer
            await pc.setRemoteDescription(new RTCSessionDescription(offer));

            // Create answer
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);

            // Send answer back
            console.log("Sending answer to caller");
            socket.emit("answer", { to: from, answer });

            setCallPartner({ _id: from, name });
            setIsCallActive(true);
            setIsIncomingCall(false);
        } catch (err) {
            console.error("Error processing offer:", err);
            endCallCleanup();
        }
    };

    // Start call function with better error handling
    const startCall = async (friendId: string, friendName: string) => {
        try {
            console.log(`Starting call to ${friendName} (${friendId})`);
            setConnectionStatus("requesting");

            // Get user media
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            console.log("Local stream obtained:", stream);
            setLocalStream(stream);

            // Create peer connection
            const pc = createPeerConnection();
            if (!pc) return;

            // Add tracks to peer connection
            stream.getTracks().forEach((track) => {
                console.log(`Adding ${track.kind} track to peer connection`);
                pc.addTrack(track, stream);
            });

            // Create offer
            const offer = await pc.createOffer({
                offerToReceiveAudio: true,
                offerToReceiveVideo: true,
            });

            // Set local description
            await pc.setLocalDescription(offer);

            // Send offer to callee
            console.log("Sending call offer");
            socket.emit("callUser", {
                to: friendId,
                from: currentUser?._id,
                name: currentUser?.username || "Unknown",
                offer,
            });

            setCallPartner({ _id: friendId, name: friendName });
        } catch (err) {
            console.error("Error starting call:", err);
            endCallCleanup();
            setConnectionStatus("failed");
        }
    };

    // Answer an incoming call with better media handling
    const answerCall = async () => {
        try {
            console.log("Answering call");
            setConnectionStatus("connecting");

            if (!callPartner) {
                console.error("No call partner to answer call");
                return;
            }

            // Get user media
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            console.log("Local stream obtained for answering call");
            setLocalStream(stream);

            // Create peer connection if it doesn't exist yet
            const pc = peerConnectionRef.current || createPeerConnection();
            if (!pc) return;

            // Add tracks to peer connection
            stream.getTracks().forEach((track) => {
                console.log(`Adding ${track.kind} track to peer connection`);
                pc.addTrack(track, stream);
            });

            // Notify caller that we're answering
            socket.emit("answerCall", {
                to: callPartner._id,
                from: currentUser?._id,
            });

            // Process the offer we received earlier
            if (offerDataRef.current) {
                await processReceivedOffer();
            }
        } catch (err) {
            console.error("Error answering call:", err);
            endCallCleanup();
            setConnectionStatus("failed");
        }
    };

    // Reject an incoming call
    const rejectCall = () => {
        console.log("Rejecting call");
        if (callPartner) {
            socket.emit("rejectCall", { to: callPartner._id });
        }
        endCallCleanup();
    };

    // End an active call
    const endCall = () => {
        console.log("Ending call");
        if (callPartner) {
            socket.emit("endCall", { to: callPartner._id });
        }
        endCallCleanup();
    };

    // Clean up resources when call ends
    const endCallCleanup = () => {
        console.log("Cleaning up call resources");

        // Stop local stream tracks
        if (localStream) {
            localStream.getTracks().forEach((track) => {
                console.log(`Stopping ${track.kind} track`);
                track.stop();
            });
        }

        // Close peer connection
        if (peerConnectionRef.current) {
            console.log("Closing peer connection");
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
        }

        // Reset state
        setLocalStream(null);
        setRemoteStream(null);
        setCallPartner(null);
        setIsCallActive(false);
        setIsIncomingCall(false);
        setConnectionStatus("idle");
        offerDataRef.current = null;
    };

    return (
        <VideoCallContext.Provider
            value={{
                isIncomingCall,
                isCallActive,
                callPartner,
                localStream,
                remoteStream,
                startCall,
                answerCall,
                rejectCall,
                endCall,
                connectionStatus,
            }}
        >
            {children}
        </VideoCallContext.Provider>
    );
};
