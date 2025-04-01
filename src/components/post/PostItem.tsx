import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/Dialog";
import { deletePost, likePost } from "@/api/post";

import { User } from "@/types/auth";
import { IPost } from "@/types/post";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";

function PostItem({ post, user }: { post: IPost; user: User | null }) {
    const [open, setOpen] = useState(false);
    const navigation = useNavigate();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isLiked, setIsLiked] = useState<boolean>(
        !!post.likes.find((like) => like._id === user?._id)
    );
    const isPostOfCurrentUser = useMemo(
        () => user?._id === post.author._id,
        [post, user]
    );
    const isAdmin = useMemo(() => user?.role === "admin", [user]);
    const handleLikePost = async () => {
        try {
            const res = await likePost(post._id);
            console.log(res);
        } catch (error) {
            console.log("Error", error);
        }
    };
    const handleDelete = async () => {
        try {
            const res = await deletePost(post._id);
            console.log("Item deleted", res);
            setDialogOpen(false);
            setOpen(false);
        } catch (error) {
            console.log("Error", error);
            setDialogOpen(false);
            setOpen(false);
        }
    };
    return (
        <div className="p-5 hover:bg-gray-100 hover:cursor-pointer">
            <div className="flex justify-between">
                <Link
                    className="flex items-center  gap-2 mb-5"
                    to={`/profile/${post.author._id}`}
                    role="button"
                >
                    <Avatar className="size-10">
                        <AvatarImage src={post.author.profilePicture} />
                        <AvatarFallback>
                            {post.author.username.at(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-xl">
                            {post.author.username}
                        </h3>
                        <p className=" text-md text-gray-500">
                            {post.author.email}
                        </p>
                    </div>
                </Link>
                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger asChild>
                        <button
                            role="button"
                            className="w-12 h-12 text-md hover:rounded-full hover:bg-blue-100"
                        >
                            •••
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {(isAdmin || isPostOfCurrentUser) && (
                            <>
                                <DropdownMenuItem
                                    onClick={() => setDialogOpen(true)}
                                    role="button"
                                    className="text-red-500 cursor-pointer"
                                >
                                    Delete
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => {
                                        navigation(`/posts/${post._id}/edit`);
                                    }}
                                    role="button"
                                    className="cursor-pointer"
                                >
                                    Edit
                                </DropdownMenuItem>
                            </>
                        )}
                        <DropdownMenuItem role="button">
                            Report
                        </DropdownMenuItem>
                        <DropdownMenuItem role="button">Info</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Confirm Dialog */}
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this item? This
                                action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                role="button"
                                onClick={() => setDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="default"
                                onClick={handleDelete}
                                role="button"
                            >
                                Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <p className="text-start mb-4">{post.content}</p>
            <div className="flex flex-col gap-2 overflow-hidden rounded-lg shadow-sm">
                {post.media.map((source) => (
                    <div key={source}>
                        <img
                            src={source}
                            alt={source}
                            className="w-full rounded-lg "
                        />
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-between py-2">
                {/* Comments Button */}
                <div className="flex gap-1" role="button">
                    <button
                        className=" hover:text-blue-500"
                        onClick={() => {
                            console.log("Comment button clicked"); // Add your logic
                        }}
                    >
                        Comments
                    </button>
                    <p>{post.comments.length}</p>
                </div>

                {/* Likes Button */}
                <div className="flex gap-1" role="button">
                    <button
                        className={` hover:text-blue-500 ${
                            isLiked ? "text-blue-500" : "text-black"
                        }`}
                        onClick={handleLikePost}
                    >
                        Likes
                    </button>
                    <p>{post.likes.length}</p>
                </div>
            </div>
        </div>
    );
}

export default PostItem;
