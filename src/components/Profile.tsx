import { getUser } from "@/api/auth";
import React, { useEffect, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { useNavigate } from "react-router";
import { IPost } from "@/types/post";
import { getPostsMe } from "@/api/post";
import PostItem from "./post/PostItem";
import { EditProfileForm } from "./forms/EditProfileForm";

const Profile = () => {
    const navigation = useNavigate();
    const currentUser = useMemo(() => {
        return getUser();
    }, []);
    const [postsOfCurrentUser, setPostsOfCurrentUser] = useState<IPost[]>([]);
    const { joinedMonth, joinedYear } = useMemo(() => {
        const date = currentUser
            ? new Date(currentUser?.createdAt)
            : new Date();
        const joinedMonth = date.getMonth() + 1;
        const joinedYear = date.getFullYear();
        return { joinedMonth, joinedYear };
    }, [currentUser]);
    console.log({ currentUser });

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postData = await getPostsMe();
                if (postData.data) {
                    setPostsOfCurrentUser(postData.data);
                }
            } catch (error) {
                console.log("Error", error);
            }
        };
        fetchPosts();
    }, []);
    return (
        <div className="flex-1 bg-white">
            <div className="sticky z-50 top-0 left-0 w-full bg-white shadow-xs">
                <div className="flex items-center gap-4 px-4 py-1">
                    <button onClick={() => navigation(-1)}>back</button>
                    <div className="flex flex-col">
                        <h2 className="text-xl font-semibold">
                            {currentUser?.displayName}
                        </h2>
                        <p>{postsOfCurrentUser.length} posts</p>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="bg-gray-400">
                    <div className="pb-[33%]"></div>
                </div>
            </div>
            <div className="px-4">
                <div className="py-4 relative w-full flex justify-between">
                    <div className="relative w-full">
                        <div className="absolute top-0 left-0 w-full -translate-y-1/2">
                            <Avatar className="min-w-12 w-1/4 h-[unset] aspect-square border-4 border-black">
                                <AvatarImage src={currentUser?.avatar} />
                                <AvatarFallback>
                                    {currentUser?.email.at(0)}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>

                    <div className="flex justify-end items-center min-w-[150px] h-[36px] max-w-full mb-4">
                        {currentUser && (
                            <EditProfileForm currentUser={currentUser} />
                        )}
                        {/* <button className=" px-4 py-2 border rounded-full text-sm font-medium hover:bg-gray-200">
                            Chỉnh sửa hồ sơ
                        </button> */}
                    </div>
                </div>

                {/* Profile Info */}
                <div className="py-4 ">
                    <h2 className="text-2xl font-bold">
                        {currentUser?.displayName}
                    </h2>
                    <p className="text-gray-500">{currentUser?.email}</p>
                    <p className="text-gray-500 text-sm">
                        📅 Tham gia tháng {joinedMonth} năm {joinedYear}
                    </p>

                    {/* Follow Info
          <div className="flex space-x-4 mt-2 text-gray-700">
            <p><span className="font-bold">{user.following}</span> Đang theo dõi</p>
            <p><span className="font-bold">{user.followers}</span> Người theo dõi</p>
          </div> */}

                    {/* Edit Profile Button */}
                </div>
            </div>

            {/* Posts Section */}
            <div className=" mt-4 bg-white">
                {postsOfCurrentUser.length > 0 ? (
                    postsOfCurrentUser.map((post, index) => (
                        <div
                            key={post._id}
                            className={`relative w-full block border-y
                ${index === 0 ? "border-t" : "border-t-0"}`}
                            onClick={(e) => {
                                if (
                                    (e.target as HTMLElement).closest(
                                        '[role="button"]'
                                    )
                                ) {
                                    e.preventDefault();
                                    return;
                                }
                                navigation(`/posts/${post._id}`);
                            }}
                        >
                            <PostItem post={post} user={currentUser} />
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 p-4">
                        Chưa có bài viết nào.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Profile;
