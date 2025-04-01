import { getUser } from "@/api/auth";
import { getPost } from "@/api/post";
import PostItem from "@/components/post/PostItem";
import { IPost } from "@/types/post";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";

const PostDetailPage = () => {
    const param = useParams();
    const [post, setPost] = useState<IPost | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const currentUser = useMemo(() => {
        return getUser();
    }, []);

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
                <PostItem post={post} user={currentUser} />
            ) : (
                <p>Không có bài đăng</p>
            )}
        </div>
    );
};

export default PostDetailPage;
