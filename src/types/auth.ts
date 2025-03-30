export interface ILogin {
    token: string;
    user: User;
}

export interface User {
    _id: string;
    username: string;
    email: string;
    displayName?: string;
    profilePicture: string;
    profileBackground: string;
    role: "user" | "admin";
}
export type Friend = Pick<
    User,
    "username" | "displayName" | "profilePicture" | "email" | "_id"
>;
export interface IUser extends User {
    friends: Friend[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}
