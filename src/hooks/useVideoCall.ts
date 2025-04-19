import { VideoCallContext } from "@/context/videoCall/VideoCallContext";
import { useContext } from "react";

export const useVideoCall = () => {
    const context = useContext(VideoCallContext);
    if (!context) {
        throw new Error("useVideoCall must be used within a VideoCallProvider");
    }
    return context;
};
