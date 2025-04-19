import { useContext, useEffect, useState } from "react";
import apiClient from "@/api/apiClient";
import { IUser } from "@/types/auth";
import { IPost } from "@/types/post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Link, useNavigate } from "react-router";
import PostItem from "./post/PostItem";
import { AuthContext } from "@/context/auth/AuthContext";

type ExploreProps = {
    query: string;
};

export default function ExploreResults({ query }: ExploreProps) {
    const [users, setUsers] = useState<IUser[]>([]);
    const [posts, setPosts] = useState<IPost[]>([]);
    const { currentUser } = useContext(AuthContext);
    const navigation = useNavigate();
    useEffect(() => {
        if (!query) return;
        apiClient
            .get(`/explore?query=${query}`)
            .then((res) => {
                setUsers(res.data.data.users || []);
                setPosts(res.data.data.posts || []);
            })
            .catch((error) => console.log(error));
    }, [query]);

    return (
        <div className="mt-4 space-y-6">
            {users.length > 0 && (
                <div>
                    <h2 className="text-lg font-semibold mb-2  px-5">Users</h2>
                    <div className="grid gap-2">
                        {users.map((user) => (
                            <Link
                                className="p-2   flex justify-start items-center rounded-md gap-2 hover:bg-muted"
                                to={`/profile/${user.username}`}
                                key={user._id}
                            >
                                <Avatar className="size-10">
                                    <AvatarImage src={user.profilePicture} />
                                    <AvatarFallback>
                                        {user.username.at(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <p>{user.displayName ?? user.username}</p>
                                    <p className="text-gray-500">
                                        {user.email}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {posts.length > 0 && (
                <div>
                    <h2 className="text-lg font-semibold mb-2 px-5">Posts</h2>
                    <div className="">
                        {posts.map((post, index) => (
                            <div
                                key={`${post._id} ${index}`}
                                className={`relative w-full block border-y p-5 hover:bg-gray-100 hover:cursor-pointer
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
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
