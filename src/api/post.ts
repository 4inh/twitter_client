import { FormDataResponse } from "@/types";
import apiClient from "./apiClient";
import { IDeletePost, IPost, ITopTag, PaginatedResponse } from "@/types/post";

export const getPosts = async (
    page: number = 1,
    limit: number = 10
): Promise<FormDataResponse<PaginatedResponse>> => {
    const response = await apiClient.get("/posts", {
        params: { page, limit },
    });
    return response.data;
};

// Helper function to get the next page of posts
export const getNextPage = async (
    currentPage: number,
    limit: number = 10
): Promise<FormDataResponse<PaginatedResponse>> => {
    return getPosts(currentPage + 1, limit);
};

// Helper function to get the previous page of posts
export const getPrevPage = async (
    currentPage: number,
    limit: number = 10
): Promise<FormDataResponse<PaginatedResponse>> => {
    if (currentPage <= 1) return getPosts(1, limit);
    return getPosts(currentPage - 1, limit);
};
export const getPostsMe = async (): Promise<FormDataResponse<IPost[]>> => {
    const response = await apiClient.get("/posts/me");
    return response.data;
};
export const getPostsOfUser = async (
    userId: string
): Promise<FormDataResponse<IPost[]>> => {
    const response = await apiClient.get(`/posts/user/${userId}`);
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
): Promise<FormDataResponse<IPost>> => {
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
): Promise<FormDataResponse<IPost>> => {
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
export const commentPost = async (
    postId: string,
    text: string
): Promise<FormDataResponse<IPost>> => {
    const response = await apiClient.post(`posts/${postId}/comment`, {
        text,
    });
    return response.data;
};
