import { Friend, IUser } from "@/types/auth";
import apiClient from "./apiClient";
import { FormDataResponse } from "@/types";

export const editProfile = async (
    payload: FormData
): Promise<FormDataResponse<IUser>> => {
    const response = await apiClient.put("/users", payload, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

export const getUserMe = async (): Promise<FormDataResponse<IUser>> => {
    const response = await apiClient.get("/users/me");
    return response.data;
};

export const getFriends = async (): Promise<FormDataResponse<Friend[]>> => {
    const response = await apiClient.get("/users/friends");
    return response.data;
};
