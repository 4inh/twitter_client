import { ChatContextType } from "@/types/context";
import { createContext } from "react";

export const ChatContext = createContext<ChatContextType>({
    friends: [],
    activeChat: null,
    messages: [],
    sendMessage: async () => {},
    setActiveChat: () => {},
});
