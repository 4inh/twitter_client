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
}
