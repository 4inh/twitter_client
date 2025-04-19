import React from "react";
import { Friend } from "@/types/auth";
import { useVideoCall } from "@/hooks/useVideoCall";

// 1. First, let's fix the VideoCallUI component with better stream handling and debugging

import { useEffect, useRef } from "react";

export const VideoCall: React.FC = () => {
    const {
        isIncomingCall,
        isCallActive,
        callPartner,
        localStream,
        remoteStream,
        answerCall,
        rejectCall,
        endCall,
    } = useVideoCall();

    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);

    // Debug logging for stream state
    useEffect(() => {
        console.log("Stream state changed:", {
            localStream: localStream ? "available" : "null",
            remoteStream: remoteStream ? "available" : "null",
            tracks: remoteStream
                ?.getTracks()
                .map((t) => `${t.kind}:${t.readyState}`),
            isCallActive,
        });
    }, [localStream, remoteStream, isCallActive]);

    // Connect local stream to video element
    useEffect(() => {
        if (localVideoRef.current && localStream) {
            console.log("Attaching local stream to video element");
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);

    // Connect remote stream to video element separately
    useEffect(() => {
        if (remoteVideoRef.current && remoteStream) {
            console.log("Attaching remote stream to video element");
            remoteVideoRef.current.srcObject = remoteStream;

            // Force play if needed
            const playVideo = async () => {
                try {
                    await remoteVideoRef.current?.play();
                } catch (err) {
                    console.error("Error auto-playing video:", err);
                }
            };

            playVideo();
        }
    }, [remoteStream]);

    if (!isIncomingCall && !isCallActive) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 w-full max-w-2xl">
                {isIncomingCall && !isCallActive && (
                    <div className="text-center">
                        <h2 className="text-xl font-bold mb-4">
                            Incoming Call from {callPartner?.name}
                        </h2>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={answerCall}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                            >
                                Answer
                            </button>
                            <button
                                onClick={rejectCall}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                )}

                {(isCallActive || localStream) && (
                    <div>
                        <div className="relative w-full h-96 bg-gray-900">
                            {/* Main video (remote) */}
                            <div className="w-full h-full flex items-center justify-center">
                                <video
                                    ref={remoteVideoRef}
                                    autoPlay
                                    playsInline
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                {!remoteStream && (
                                    <div className="absolute inset-0 flex items-center justify-center text-white">
                                        Waiting for connection...
                                    </div>
                                )}
                            </div>

                            {/* Small video (local) */}
                            <div className="absolute bottom-4 right-4 w-32 h-24 border-2 border-white rounded-lg overflow-hidden bg-gray-800">
                                {localStream ? (
                                    <video
                                        ref={localVideoRef}
                                        autoPlay
                                        playsInline
                                        muted
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-white text-xs">
                                        No local video
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-center mt-4">
                            <button
                                onClick={endCall}
                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full"
                            >
                                End Call
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
interface CallButtonProps {
    friend: Friend;
}

export const CallButton: React.FC<CallButtonProps> = ({ friend }) => {
    const { startCall } = useVideoCall();

    return (
        <button
            onClick={() => startCall(friend._id, friend.username)}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
        </button>
    );
};
