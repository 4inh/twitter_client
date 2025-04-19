import { VideoCallContextType } from "@/types/context";
import { createContext } from "react";

export const VideoCallContext = createContext<VideoCallContextType | null>(
    null
);
