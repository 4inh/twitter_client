import {
    addPost,
    commentPost,
    getPost,
    getPosts,
    likePost,
    updatePost,
    deletePost as deletePostAPI,
    getTopTags as getTopTagsAPI,
} from "@/api/post";
import {
    IEditPostPayloadData,
    IPost,
    IPostPayloadData,
    ITopTag,
} from "@/types/post";
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
    const [topTags, setTopTags] = useState<ITopTag[]>([]);

    const getTopTags = async (): Promise<void> => {
        try {
            const res = await getTopTagsAPI();
            if (res.data) {
                setTopTags(res.data);
            }
        } catch (error) {
            console.log("Error", error);
        }
    };

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
    const deletePost = async (postId: string) => {
        try {
            const res = await deletePostAPI(postId);
            const updatePosts = posts.filter((post) => post._id !== postId);
            setPosts(updatePosts);
            console.log("Item deleted", res);
        } catch (error) {
            console.log("Error", error);
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
    const toggleLikePost = async (postId: string): Promise<void> => {
        try {
            const res = await likePost(postId);
            if (!res.data) {
                console.log("No data response at like Post");

                return;
            }
            const likedPost = posts.find((post) => post._id === res.data?._id);
            if (!likedPost) {
                console.log("Liked post not found " + res.data?._id);

                return;
            }
            const updatePosts = posts.map((post) =>
                post._id === likedPost._id ? { ...(res.data as IPost) } : post
            );
            setPosts(updatePosts);
        } catch (error) {
            console.log("Error", error);
        }
    };
    const commentOnPost = async (
        postId: string,
        text: string
    ): Promise<void> => {
        try {
            const res = await commentPost(postId, text);
            if (!res.data) {
                console.log("No data response at like Post");

                return;
            }

            const commentedPost = posts.find(
                (post) => post._id === res.data?._id
            );

            if (!commentedPost) {
                console.log("commentedPost not found " + res.data?._id);

                return;
            }
            const updatePosts = posts.map((post) =>
                post._id === commentedPost._id
                    ? { ...(res.data as IPost) }
                    : post
            );
            setPosts(updatePosts);
            if (currentPost) {
                setCurrentPost(res.data as IPost);
            }
        } catch (error) {
            console.log("Error", error);
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
    useEffect(() => {
        getTopTags();
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
                toggleLikePost,
                commentOnPost,
                deletePost,
                topTags,
            }}
        >
            {children}
        </PostContext.Provider>
    );
};
