import { Friend, User } from "./auth";
import { Message } from "./message";

export interface AuthContextType {
    currentUser: User | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export interface ChatContextType {
    friends: Friend[];
    activeChat: Friend | null;
    messages: Message[];
    sendMessage: (content: string, media?: string[]) => Promise<void>;
    setActiveChat: (friend: Friend) => void;
}
