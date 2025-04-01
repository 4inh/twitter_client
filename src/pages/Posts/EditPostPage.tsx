import { getUser } from "@/api/auth";
import { getPost, updatePost } from "@/api/post";
import EditPostForm from "@/components/forms/EditPostForm";
import { IPost } from "@/types/post";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

const EditPostPage = () => {
    const param = useParams();
    const navigation = useNavigate();
    const [post, setPost] = useState<IPost | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const currentUser = useMemo(() => {
        return getUser();
    }, []);
    // const [errorMessage,setErrorMessage] = useState<string>("")
    const handleUpdatePost = async ({
        text,
        mediaFiles,
    }: {
        text: string;
        mediaFiles: (File | string)[];
    }) => {
        if (!post) return;
        try {
            const formData = new FormData();
            formData.append("content", text);
            mediaFiles.forEach((file) => {
                formData.append("media", file); // Use array notation for multiple files
            });

            const res = await updatePost(post._id, formData);
            console.log({ res });
            navigation(`/posts/${post._id}`);
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
                const res = await getPost(param.id);
                if (res.data) {
                    setPost(res.data);
                }

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
        <div className="flex-1 bg-white shadow-md p-5">
            <h2 className="text-xl font-bold mb-4">Bài đăng</h2>

            {isLoading ? (
                <p>Đang tải ...</p>
            ) : post ? (
                <p>Loading ...</p>
            ) : post && currentUser ? (
                <EditPostForm
                    initialMediaFiles={post.media}
                    initialText={post.content}
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
