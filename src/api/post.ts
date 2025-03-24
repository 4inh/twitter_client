import apiClient from "./apiClient";
import { IAddPostData, IPost, IPostPayloadData, ITopTag } from "@/types/post";

export const getPosts = async (): Promise<IPost[]> => {
    const response = await apiClient.get("/posts");
    return response.data;
};
export const addPost = async (
    payload: IPostPayloadData
): Promise<IAddPostData> => {
    const response = await apiClient.post("/posts", { ...payload });
    return response.data;
};
export const getTopTags = async (): Promise<ITopTag[]> => {
    const response = await apiClient.get("/posts/top-tags");
    return response.data;
};
