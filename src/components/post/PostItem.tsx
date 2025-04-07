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
import { ReactNode, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

function PostItem({ post, user }: { post: IPost; user: User | null }) {
    const [open, setOpen] = useState(false);
    const navigation = useNavigate();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [displayElement, setDisplayElement] = useState<ReactNode>(
        post.content
    );

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
    const processHighlighting = (): void => {
        // Split content by mentions and hashtags
        // This regex matches @word or #word patterns (word = letters, numbers, underscores)
        const parts: string[] = post.content.split(
            /(\s@[\w]+|\s#[\w]+|^@[\w]+|^#[\w]+)/g
        );

        const highlightedContent = parts.map((part, index) => {
            // Check if the part is a mention (@)
            if (part.trim().startsWith("@")) {
                return (
                    <span key={index}>
                        <span
                            // to={`/profile/${}`}
                            role="button"
                            style={{ color: "blue", fontWeight: 600 }}
                        >
                            {part}
                        </span>
                    </span>
                );
            }
            // Check if the part is a hashtag (#)
            else if (part.trim().startsWith("#")) {
                return (
                    <span key={index}>
                        <span style={{ color: "black", fontWeight: 600 }}>
                            {part}
                        </span>
                    </span>
                );
            }
            // Regular text
            return <span key={index}>{part}</span>;
        });

        setDisplayElement(highlightedContent);
    };
    useEffect(() => {
        processHighlighting();
    }, []);
    return (
        <div className="p-5 hover:bg-gray-100 hover:cursor-pointer">
            <div className="flex justify-between">
                <Link
                    className="flex items-center  gap-2 mb-5"
                    to={`/profile/${post.author.username}`}
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
                            {post.author?.displayName ?? post.author.username}
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
                            className="w-12 h-12 text-md hover:rounded-full hover:bg-primary-foreground"
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
                                    Xóa
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => {
                                        navigation(`/posts/${post._id}/edit`);
                                    }}
                                    className="cursor-pointer"
                                    role="button"
                                >
                                    Chỉnh sửa
                                </DropdownMenuItem>
                            </>
                        )}
                        <DropdownMenuItem role="button" className="cursor-pointer">
                            Báo cáo
                        </DropdownMenuItem>
                        <DropdownMenuItem role="button" className="cursor-pointer">
                            Thông tin
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Confirm Dialog */}
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Xác nhận xóa</DialogTitle>
                            <DialogDescription>
                                Bạn có chắc muốn xóa bài viết này? Hành động này
                                không thể hoàn lại.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                role="button"
                                onClick={() => setDialogOpen(false)}
                            >
                                Hủy
                            </Button>
                            <Button
                                className="bg-primary hover:opacity-90"
                                variant="default"
                                onClick={handleDelete}
                                role="button"
                            >
                                Xóa
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <p className="text-start mb-4">{displayElement}</p>
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
                <div className="flex gap-1 hover:border-b-2" role="button">
                    <button
                        onClick={() => {
                            console.log("Comment button clicked"); // Add your logic
                        }}
                    >
                        Bình luận
                    </button>
                    <p>{post.comments.length}</p>
                </div>

                {/* Likes Button */}
                <div className="flex gap-1" role="button">
                    <button onClick={handleLikePost}>
                        {isLiked ? (
                            <AiFillLike className="text-primary hover:scale-150 transition-transform duration-200" />
                        ) : (
                            <AiOutlineLike className="text-primary hover:scale-150 transition-transform duration-200" />
                        )}
                    </button>

                    <p>{post.likes.length}</p>
                </div>
            </div>
        </div>
    );
}

export default PostItem;
