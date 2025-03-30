export interface ILogin {
    token: string;
    user: User;
}

export interface User {
    id: string;
    username: string;
    email: string;
    role: "admin" | "user";
    avatar: string;
    displayName: string;
    createdAt: string;
}

export interface IUser {
    profileBackground: string;
    friends: any[];
    _id: string;
    username: string;
    email: string;
    profilePicture: string;
    role: "admin" | "user";
    createdAt: string;
    updatedAt: string;
    __v: number;
    displayName: string;
}
