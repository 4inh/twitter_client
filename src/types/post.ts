import { User } from "./auth";

export interface IPost {
    _id: string;
    content: string;
    author: Author;
    media: string[];
    likes: Like[];
    visibility: string;
    tags: string[];
    mentions: User[];
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
    displayName: string?;
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
    media: string[];
    tags: string[];
    mentions: any[];
    visibility: IVisibility;
}

export interface IAddPostData {
    content: string;
    author: string;
    media: string[];
    likes: any[];
    visibility: IVisibility;
    tags: string[];
    mentions: any[];
    _id: string;
    comments: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
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
