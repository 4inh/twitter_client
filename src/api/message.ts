import apiClient from "./apiClient";
import { FormDataResponse } from "@/types";
import { Message } from "@/types/message";

export const getMessages = async (
    receiverId: string
): Promise<FormDataResponse<Message[]>> => {
    const response = await apiClient.get(`/messages/${receiverId}`);

    return response.data;
};
export const postMessage = async ({
    content,
    media,
    receiverId,
}: {
    receiverId: string;
    content: string;
    media: string[];
}) => {
    const response = await apiClient.post("/messages", {
        receiverId,
        content,
        media,
    });
    console.log("postMessage", response.data);

    return response.data;
};
