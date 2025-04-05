import { MentionUser, User } from "./auth";

export interface IPost {
    _id: string;
    content: string;
    author: Author;
    media: string[];
    likes: Like[];
    visibility: IVisibility;
    tags: string[];
    mentions: MentionUser[];
    comments: Comment[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Author {
    _id: string;
    username: string;
    email: string;
    profilePicture: string;
    displayName?: string;
}

export interface Like {
    _id: string;
    username: string;
    email: string;
    profilePicture: string;
}

export interface Comment {
    user: User;
    text: string;
    _id: string;
    createdAt: string;
}

export interface IPostPayloadData {
    content: string;
    media?: File[];
    tags: string[];
    mentions?: string[];
    visibility?: IVisibility;
}

export interface IEditPostPayloadData {
    content: string;
    media?: (File | string)[];
    tags: string[];
    mentions?: string[];
    visibility?: IVisibility;
}

export interface Author {
    _id: string;
    username: string;
    email: string;
    profilePicture: string;
}

export type IVisibility = "public" | "private" | "followers-only";

export interface ITopTag {
    _id: string; //tag
    count: number;
}
export interface IDeletePost {
    message: string;
}
