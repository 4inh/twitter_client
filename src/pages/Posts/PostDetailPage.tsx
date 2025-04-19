import PostItem from "@/components/post/PostItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/textarea";
import { AuthContext } from "@/context/auth/AuthContext";
import { PostContext } from "@/context/post/PostContext";
import { IUser } from "@/types/auth";
import { IPost } from "@/types/post";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const PostDetailPage = () => {
    const param = useParams();
    const { currentPost, getCurrentPost } = useContext(PostContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { currentUser } = useContext(AuthContext);
    const navigation = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            if (!param.id) {
                console.log("Missing post id");

                return;
            }
            setIsLoading(true);
            try {
                await getCurrentPost(param.id);
                setIsLoading(false);
            } catch (error) {
                console.log("Error", error);
                // setErrorMessage("Error" + error.message)
                setIsLoading(false);
            }
        };
        fetchPost();
    }, [param.id]);
    return (
        <div className="flex-1 bg-white relative">
            <header className="px-5 py-3 flex gap-4 items-center sticky left-0 top-0 bg-white z-50">
                <button onClick={() => navigation(-1)}>back</button>
                <h2 className="text-xl font-bold ">Bài đăng</h2>
            </header>

            {isLoading ? (
                <p>Đang tải ...</p>
            ) : currentPost ? (
                <div className="px-5 relative">
                    <PostItem post={currentPost} user={currentUser} />
                    <div className="pt-2 space-y-4 border-t">
                        {currentPost.comments.length === 0 && (
                            <p className="text-sm text-gray-500">
                                No comments yet.
                            </p>
                        )}

                        {currentPost.comments.map((comment) => (
                            <div
                                key={comment._id}
                                className="flex gap-3 items-start"
                            >
                                <Avatar className="size-10">
                                    <AvatarImage
                                        src={comment.user.profilePicture || ""}
                                    />
                                    <AvatarFallback>
                                        {comment.user.email.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col gap-0.5">
                                    <p className="font-medium text-sm">
                                        {comment.user.displayName ??
                                            comment.user.username}
                                    </p>
                                    <p className="text-sm">{comment.text}</p>
                                </div>
                            </div>
                        ))}

                        {currentUser && (
                            <CommentInput
                                currentUser={currentUser}
                                currentPost={currentPost}
                            />
                        )}
                    </div>
                </div>
            ) : (
                <p>Không có bài đăng</p>
            )}
        </div>
    );
};

function CommentInput({
    currentUser,
    currentPost,
}: {
    currentUser: IUser;
    currentPost: IPost;
}) {
    const [commentText, setCommentText] = useState("");
    const { commentOnPost } = useContext(PostContext);
    const handleSubmitComment = async () => {
        if (!commentText.trim()) return;
        try {
            await commentOnPost(currentPost._id, commentText);
            setCommentText(""); // clear input after posting
        } catch (error) {
            console.error("Failed to submit comment", error);
        }
    };
    const isDisabled = !commentText.trim();
    const insertSymbol = (symbol: string) => {
        const textarea = document.querySelector("textarea");
        if (!textarea) return;

        const start = textarea.selectionStart || 0;
        const end = textarea.selectionEnd || 0;
        const before = commentText.slice(0, start);
        const after = commentText.slice(end);

        const newText = before + symbol + after;
        setCommentText(newText);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + 1, start + 1);
        }, 0);
    };

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const toggleEmojiPicker = () => {
        setShowEmojiPicker((prev) => !prev);
    };

    const onEmojiClick = (emojiData: EmojiClickData) => {
        setCommentText((prev) => prev + emojiData.emoji);
        setShowEmojiPicker(false);
    };
    return (
        <div className="flex gap-3 items-start mt-4">
            <Avatar className="w-8 h-8">
                <AvatarImage src={currentUser.profilePicture || ""} />
                <AvatarFallback>{currentUser.email.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
                <Textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full resize-none"
                />
                <div className="flex justify-between items-center">
                    <div className="flex justify-start gap-2 items-center">
                        <button
                            className={
                                "w-10 h-10 text-primary p-2 border border-black-500 rounded-lg hover:text-primary hover:border-primary"
                            }
                            onClick={() => insertSymbol("@")}
                        >
                            @
                        </button>

                        <button
                            className={
                                "w-10 h-10 text-primary p-2 border border-black-500 rounded-lg hover:text-primary hover:border-primary"
                            }
                            onClick={() => insertSymbol("#")}
                        >
                            #
                        </button>
                        <button
                            className="w-10 h-10 text-primary p-2 border border-black-500 rounded-lg hover:text-primary hover:border-primary"
                            onClick={toggleEmojiPicker}
                        >
                            😊
                        </button>
                        {showEmojiPicker && (
                            <div className="absolute top-12 z-50">
                                <EmojiPicker onEmojiClick={onEmojiClick} />
                            </div>
                        )}
                    </div>
                    <Button
                        onClick={handleSubmitComment}
                        variant={isDisabled ? "outline" : "default"}
                        disabled={isDisabled}
                    >
                        Post Comment
                    </Button>
                </div>
            </div>
        </div>
    );
}
export default PostDetailPage;
