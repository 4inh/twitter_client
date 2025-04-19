import { useContext, useEffect } from "react";
import AddPostForm from "./forms/AddPostForm";

import PostItem from "./post/PostItem";
import { useNavigate } from "react-router";
import { PostContext } from "@/context/post/PostContext";
import { AuthContext } from "@/context/auth/AuthContext";

const MainContent = () => {
    const { posts } = useContext(PostContext);
    const { currentUser } = useContext(AuthContext);
    const navigation = useNavigate();

    return (
        <div className="flex-1 bg-white pb-20">
            {/* <h2 className="text-xl font-bold mb-4 px-5">Dành cho bạn</h2> */}

            {/* Form đăng bài */}
            <div className="">
                {currentUser && <AddPostForm currentUser={currentUser} />}
            </div>
            {/* Bài đăng */}
            {posts.map((post, index) => (
                <div
                    key={`${post._id} ${index}`}
                    className={`relative w-full block border-y p-5 hover:bg-gray-100 hover:cursor-pointer
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
