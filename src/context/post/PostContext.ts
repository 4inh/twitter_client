import { PostContextType } from "@/types/context";
import { createContext } from "react";

export const PostContext = createContext<PostContextType>({
    createPost: async () => {},
    editPost: async () => {},
    error: null,
    loading: false,
    posts: [],
    resetError: () => {},
    currentPost: null,
    getCurrentPost: async () => {},
});
