import { Friend, IUser } from "./auth";
import { Message } from "./message";
import { IEditPostPayloadData, IPost, IPostPayloadData } from "./post";

export interface AuthContextType {
    currentUser: IUser | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (
        email: string,
        password: string,
        username: string
    ) => Promise<void>;
}

export interface ChatContextType {
    friends: Friend[];
    activeChat: Friend | null;
    messages: Message[];
    sendMessage: (content: string, media?: string[]) => Promise<void>;
    setActiveChat: (friend: Friend) => void;
}

export interface PostContextType {
    posts: IPost[];
    loading: boolean;
    error: string | null;
    editPost: (postId: string, payload: IEditPostPayloadData) => Promise<void>;
    createPost: (payload: IPostPayloadData) => Promise<void>;
    resetError: () => void;
    getCurrentPost: (postId: string) => Promise<void>;
    currentPost: IPost | null;
}
