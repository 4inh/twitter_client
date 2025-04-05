import EditPostForm from "@/components/forms/EditPostForm";
import { AuthContext } from "@/context/auth/AuthContext";
import { PostContext } from "@/context/post/PostContext";
import { IEditPostPayloadData } from "@/types/post";
import { removeAtSymbol } from "@/utils";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const EditPostPage = () => {
    const param = useParams();
    const navigation = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { currentUser } = useContext(AuthContext);
    const { currentPost, getCurrentPost, editPost } = useContext(PostContext);
    // const [errorMessage,setErrorMessage] = useState<string>("")
    const handleUpdatePost = async ({
        text,
        mediaFiles,
    }: {
        text: string;
        mediaFiles: (File | string)[];
    }) => {
        if (!currentPost || !currentUser) return;
        const mentions = new Set(text.match(/@\w+/g) || []);
        const tags = new Set(text.match(/#\w+/g) || []);

        try {
            const validateMentions = removeAtSymbol([...mentions]);

            const matchedFriendIds = currentUser.friends
                .filter((friend) => validateMentions.includes(friend.username))
                .map((matchedFriend) => matchedFriend._id);
            console.log("matchedFriendIds:", matchedFriendIds);
            const prepareEditPayload: IEditPostPayloadData = {
                content: text,
                tags: [...tags],
                media: mediaFiles,
                mentions: matchedFriendIds,
            };
            await editPost(currentPost._id, prepareEditPayload);
            navigation(`/posts/${currentPost._id}`);
        } catch (error) {
            console.log("Error", error);
        }
    };
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
    }, [param.id, getCurrentPost]);
    return (
        <div className="flex-1 bg-white shadow-md p-5">
            <h2 className="text-xl font-bold mb-4">Bài đăng</h2>

            {isLoading ? (
                <p>Đang tải ...</p>
            ) : currentPost && currentUser ? (
                <EditPostForm
                    initialMediaFiles={currentPost.media}
                    initialText={currentPost.content}
                    onSubmit={(text, mediaFiles) =>
                        handleUpdatePost({ text, mediaFiles })
                    }
                    currentUser={currentUser}
                />
            ) : (
                <p>Không có bài đăng</p>
            )}
        </div>
    );
};

export default EditPostPage;
