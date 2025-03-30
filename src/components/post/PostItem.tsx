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
import { useNavigate } from "react-router";

function PostItem({ post, user }: { post: IPost; user: User | null }) {
    const [open, setOpen] = useState(false);
    const navigation = useNavigate();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isLiked, setIsLiked] = useState<boolean>(
        !!post.likes.find((like) => like._id === user?.id)
    );
    const isPostOfCurrentUser = useMemo(
        () => user?.id === post.author._id,
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
        <div className="p-5  ">
            <div className="flex justify-between">
                <h3 className="font-bold">{post.author.username}</h3>
                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="hover:text-blue-500"
                            role="button"
                        >
                            Options
                        </Button>
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

            <p className="text-start">{post.content}</p>
            {post.media.map((source) => (
                <div key={source}>
                    <img
                        src={source}
                        alt={source}
                        className="w-full rounded-lg mt-2"
                    />
                </div>
            ))}
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
