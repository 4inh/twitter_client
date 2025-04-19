import { PostContextType } from "@/types/context";
import { createContext } from "react";

export const PostContext = createContext<PostContextType>({
    topTags: [],
    createPost: async () => {},
    editPost: async () => {},
    error: null,
    loading: false,
    posts: [],
    resetError: () => {},
    currentPost: null,
    getCurrentPost: async () => {},
    toggleLikePost: async () => {},
    commentOnPost: async () => {},
    deletePost: async () => {},
});
