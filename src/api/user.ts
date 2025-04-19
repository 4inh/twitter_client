import { Friend, IUser } from "@/types/auth";
import apiClient from "./apiClient";
import { FormDataResponse } from "@/types";

import axios from "axios";

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
export const getUserByUsername = async (
    username: string
): Promise<FormDataResponse<IUser>> => {
    const response = await apiClient.get(`/users/user/${username}`);
    return response.data;
};

export const getUser = async (
    userId: string
): Promise<FormDataResponse<IUser>> => {
    const response = await apiClient.get(`/users/${userId}`);
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
export const addRemoveFriend = async (
    userId: string
): Promise<FormDataResponse<IUser>> => {
    const response = await apiClient.post(`/users/follow/${userId}`);
    return response.data;
};

export const getMostFollowedUsers = async (): Promise<
    FormDataResponse<IUser[]>
> => {
    const response = await apiClient.get("/users/most-followers");
    console.log({ Usersuggestions: response });

    return response.data;
};
