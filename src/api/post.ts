import { FormDataResponse } from "@/types";
import apiClient from "./apiClient";
import { IAddPostData, IDeletePost, IPost, ITopTag } from "@/types/post";

export const getPosts = async (): Promise<FormDataResponse<IPost[]>> => {
    const response = await apiClient.get("/posts");
    return response.data;
};

export const getPostsMe = async (): Promise<FormDataResponse<IPost[]>> => {
    const response = await apiClient.get("/posts/me");
    return response.data;
};

export const getPost = async (
    postId: string
): Promise<FormDataResponse<IPost>> => {
    const response = await apiClient.get(`/posts/${postId}`);
    return response.data;
};
export const addPost = async (
    payload: FormData
): Promise<FormDataResponse<IAddPostData>> => {
    const response = await apiClient.post("/posts", payload, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
export const updatePost = async (
    postId: string,
    payload: FormData
): Promise<FormDataResponse<IAddPostData>> => {
    const response = await apiClient.put(`/posts/${postId}`, payload, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
export const deletePost = async (
    postId: string
): Promise<FormDataResponse<IDeletePost>> => {
    const response = await apiClient.delete(`/posts/${postId}`);
    return response.data;
};
export const getTopTags = async (): Promise<FormDataResponse<ITopTag[]>> => {
    const response = await apiClient.get("/posts/top-tags");
    return response.data;
};

export const likePost = async (
    postId: string
): Promise<FormDataResponse<IPost>> => {
    const response = await apiClient.post(`posts/${postId}/like`);
    return response.data;
};
