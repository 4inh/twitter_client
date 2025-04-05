import { addPost, getPost, getPosts, updatePost } from "@/api/post";
import { IEditPostPayloadData, IPost, IPostPayloadData } from "@/types/post";
import axios from "axios";
import { ReactNode, useContext, useEffect, useState } from "react";
import { PostContext } from "./PostContext";
import socket from "@/config/socketConfig";
import { AuthContext } from "../auth/AuthContext";

export const PostProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [currentPost, setCurrentPost] = useState<IPost | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { currentUser } = useContext(AuthContext);
    const createPost = async (payload: IPostPayloadData): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();

            // Add text fields
            formData.append("content", payload.content);

            if (payload.visibility) {
                formData.append("visibility", payload.visibility);
            }

            // Add tags if provided
            if (payload.tags && payload.tags.length > 0) {
                formData.append("tags", JSON.stringify(payload.tags));
            }

            // Add mentions if provided
            if (payload.mentions && payload.mentions.length > 0) {
                formData.append("mentions", JSON.stringify(payload.mentions));
            }

            // Add media files if provided
            if (payload.media && payload.media.length > 0) {
                payload.media.forEach((file) => {
                    formData.append("media", file);
                });
            }

            // Make the API request with authentication
            const res = await addPost(formData);

            if (!res.data) {
                return;
            }
            const newPost = res.data;

            setPosts((prevPosts) => [newPost, ...prevPosts]);
            // return newPost;

            // Update the posts state with the new post

            // Listen for real-time socket updates (assuming you have socket setup)
            // This would typically be in a useEffect in a higher component, but included here for reference
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const errorMessage =
                    err.response?.data?.message || "Failed to create post";
                setError(errorMessage);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    const editPost = async (
        postId: string,
        payload: IEditPostPayloadData
    ): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();

            // Add text fields
            formData.append("content", payload.content);

            if (payload.visibility) {
                formData.append("visibility", payload.visibility);
            }

            // Add tags if provided
            if (payload.tags && payload.tags.length > 0) {
                formData.append("tags", JSON.stringify(payload.tags));
            }

            // Add mentions if provided
            if (payload.mentions && payload.mentions.length > 0) {
                formData.append("mentions", JSON.stringify(payload.mentions));
            }

            // Add media files if provided
            if (payload.media && payload.media.length > 0) {
                payload.media.forEach((file) => {
                    formData.append("media", file);
                });
            }

            // Make the API request with authentication
            const res = await updatePost(postId, formData);

            if (!res.data) {
                return;
            }
            const newPost = res.data;

            setPosts((prevPosts) => [newPost, ...prevPosts]);
            // return newPost;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const errorMessage =
                    err.response?.data?.message || "Failed to create post";
                setError(errorMessage);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    };
    const getCurrentPost = async (postId: string): Promise<void> => {
        setLoading(true);

        try {
            const res = await getPost(postId);
            if (res.data) {
                setCurrentPost(res.data);
            }

            setLoading(false);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const errorMessage =
                    err.response?.data?.message || "Failed to create post";
                setError(errorMessage);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    const resetError = () => {
        setError(null);
    };
    useEffect(() => {
        if (!currentUser) return;
        // Listen for new posts
        socket.on("new-post", (newPost: IPost) => {
            if (newPost.author._id === currentUser._id) {
                console.log("New post for current user");

                return;
            }
            console.log("New post from another user");

            setPosts((prevPosts) => [newPost, ...prevPosts]);
        });

        return () => {
            socket.off("new-post");
        };
    }, [currentUser]);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postData = await getPosts();
                // console.log(currentUser);

                if (postData.data) {
                    setPosts(postData.data);
                }
            } catch (error) {
                console.log("Error", error);
            }
        };
        fetchPosts();
    }, []);
    return (
        <PostContext.Provider
            value={{
                posts,
                loading,
                error,
                createPost,
                resetError,
                editPost,
                getCurrentPost,
                currentPost,
            }}
        >
            {children}
        </PostContext.Provider>
    );
};
