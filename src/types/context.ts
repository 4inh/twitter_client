import { Friend, IUser } from "./auth";
import { Message } from "./message";
import { IEditPostPayloadData, IPost, IPostPayloadData, ITopTag } from "./post";

export interface AuthContextType {
    currentUser: IUser | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    updateCurrentUser: (newUser: IUser) => void;
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
    topTags: ITopTag[];
    getCurrentPost: (postId: string) => Promise<void>;
    toggleLikePost: (postId: string) => Promise<void>;
    commentOnPost: (postId: string, text: string) => Promise<void>;
    deletePost: (postId: string) => Promise<void>;
    currentPost: IPost | null;
}
export interface VideoCallContextType {
    isIncomingCall: boolean;
    isCallActive: boolean;
    callPartner: { _id: string; name: string } | null;
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
    startCall: (friendId: string, friendName: string) => void;
    answerCall: () => void;
    rejectCall: () => void;
    endCall: () => void;
    connectionStatus: string;
}
