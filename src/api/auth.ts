import { ILogin, User } from "@/types/auth";
import apiClient from "./apiClient";
// POST http://localhost:5000/api/auth/register
// Content-Type: application/json

// {
//     "username": "linh05",
//     "password": "123456",
//     "email" : "linh05@123.com"
// }
export const register = async (
    email: string,
    password: string,
    username: string
): Promise<ILogin> => {
    const response = await apiClient.post("/auth/register", {
        email,
        password,
        username,
    });
    return response.data;
};
export const login = async (
    email: string,
    password: string
): Promise<ILogin> => {
    const response = await apiClient.post("/auth/login", { email, password });
    return response.data;
};
export const getToken = () => sessionStorage.getItem("token");
export const setToken = (token: string) =>
    sessionStorage.setItem("token", token);
export const setUser = (user: User) => {
    sessionStorage.setItem("user", JSON.stringify(user));
};
export const getUser = (): User | null => {
    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

export const removeToken = () => sessionStorage.removeItem("token");
