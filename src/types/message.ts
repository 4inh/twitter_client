export interface Message {
    _id: string;
    senderId: string;
    receiverId: string;
    content?: string;
    media?: string[];
    timestamp: Date;
    read: boolean;
    createdAt: string;
    updatedAt: string;
}
