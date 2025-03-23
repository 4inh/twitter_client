import { ILogin } from "@/types/auth";
import apiClient from "./apiClient";

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
export const removeToken = () => sessionStorage.removeItem("token");
