import { useEffect, useMemo, useState } from "react";
import { IPost } from "@/types/post";
import AddPostForm from "./forms/AddPostForm";

import { getUser } from "@/api/auth";
import { getPosts } from "@/api/post";
import PostItem from "./post/PostItem";
import { useNavigate } from "react-router";

const MainContent = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const navigation = useNavigate();
    const currentUser = useMemo(() => {
        return getUser();
    }, []);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postData = await getPosts();
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
        <div className="flex-1 bg-white  pb-20">
            {/* <h2 className="text-xl font-bold mb-4 px-5">Dành cho bạn</h2> */}

            {/* Form đăng bài */}
            {currentUser && <AddPostForm currentUser={currentUser} />}

            {/* Bài đăng */}
            {posts.map((post, index) => (
                <div
                    key={post._id}
                    className={`relative w-full block border-y
                        ${index === 0 ? "border-t" : "border-t-0"}`}
                    onClick={(e) => {
                        if (
                            (e.target as HTMLElement).closest('[role="button"]')
                        ) {
                            e.preventDefault();
                            return;
                        }
                        navigation(`/posts/${post._id}`);
                    }}
                >
                    <PostItem post={post} user={currentUser} />
                </div>
            ))}
        </div>
    );
};

export default MainContent;

// Type for user objects in the suggestion list
