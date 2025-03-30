import { IUser } from "@/types/auth";
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
