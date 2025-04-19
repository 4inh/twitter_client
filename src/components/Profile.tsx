import { useContext, useEffect, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { useNavigate, useParams } from "react-router";
import { IPost } from "@/types/post";
import { getPostsMe, getPostsOfUser } from "@/api/post";
import PostItem from "./post/PostItem";
import { EditProfileForm } from "./forms/EditProfileForm";
import { IUser } from "@/types/auth";
import { addRemoveFriend, getUserByUsername } from "@/api/user";
import { IoChevronBackOutline } from "react-icons/io5";
import { AuthContext } from "@/context/auth/AuthContext";

const Profile = () => {
    const navigation = useNavigate();
    const { currentUser, updateCurrentUser } = useContext(AuthContext);
    const param = useParams();
    const [user, setUser] = useState<IUser | null>(null);

    const [postsOfCurrentUser, setPostsOfCurrentUser] = useState<IPost[]>([]);
    const { joinedMonth, joinedYear } = useMemo(() => {
        const date = user ? new Date(user?.createdAt) : new Date();
        const joinedMonth = date.getMonth() + 1;
        const joinedYear = date.getFullYear();
        return { joinedMonth, joinedYear };
    }, [user]);

    const isFollowed = useMemo(() => {
        if (!user || !currentUser) return false;
        return currentUser.following
            .map((follower) => follower._id)
            .includes(user?._id);
    }, [user, currentUser]);
    const handleFollow = async () => {
        if (!user) {
            console.log("Missing user at follow");

            return;
        }
        try {
            const res = await addRemoveFriend(user._id);
            if (!res.data) {
                console.log("Missing data at add remove friend");
                return;
            }
            console.log(res.data);

            // navigation(0);
            updateCurrentUser(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (param.username) {
                    const res = await getUserByUsername(param.username);
                    if (!res.data) {
                        console.log("Missing data at get user");

                        return;
                    }
                    setUser(res.data);
                    console.log("user", res.data);

                    const posts = await getPostsOfUser(res.data._id);
                    if (!posts.data) {
                        console.log("Missing data at getPostsOfUser");

                        return;
                    }
                    setPostsOfCurrentUser(posts.data);
                } else {
                    // const res = await getUserMe();
                    // if (!res.data) {
                    //     console.log("Missing data at get user me");

                    //     return;
                    // }
                    setUser(currentUser);
                    const postData = await getPostsMe();
                    if (postData.data) {
                        setPostsOfCurrentUser(postData.data);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, [param.username]);
    return (
        <div className="flex-1 bg-white">
            <div className="sticky z-50 top-0 left-0 w-full bg-white shadow-xs">
                <div className="flex items-center gap-4 px-4 py-1">
                    <button
                        onClick={() => navigation(-1)}
                        className="hover:text-blue-500"
                    >
                        <IoChevronBackOutline />
                    </button>
                    <div className="flex flex-col">
                        <h2 className="text-xl font-semibold">
                            {user?.displayName ?? user?.username}
                        </h2>
                        <p>{postsOfCurrentUser.length} Bài đăng</p>
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
                                <AvatarImage src={user?.profilePicture} />
                                <AvatarFallback>
                                    {user?.email.at(0)}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>

                    <div className="flex justify-end items-center min-w-[150px] h-[36px] max-w-full mb-4">
                        {user && currentUser?._id == user?._id ? (
                            <EditProfileForm currentUser={user} />
                        ) : (
                            <button
                                className=" px-4 py-2 border rounded-full text-sm font-medium hover:bg-gray-200"
                                onClick={handleFollow}
                            >
                                {isFollowed ? "Hủy theo dõi" : "Theo dõi"}
                            </button>
                        )}
                    </div>
                </div>

                {/* Profile Info */}
                <div className="py-4 ">
                    <h2 className="text-2xl font-bold">
                        {user?.displayName ?? user?.username}
                    </h2>
                    <p className="text-gray-500">{user?.email}</p>
                    <p className="text-gray-500 text-sm">
                        📅 Tham gia tháng {joinedMonth} năm {joinedYear}
                    </p>
                </div>
            </div>

            {/* Posts Section */}
            <div className=" mt-4 bg-white">
                {postsOfCurrentUser.length > 0 ? (
                    postsOfCurrentUser.map((post, index) => (
                        <div
                            key={post._id}
                            className={`relative w-full  p-5 block border-y
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
                            <PostItem post={post} user={user} />
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
