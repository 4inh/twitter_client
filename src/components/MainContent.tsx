import { ChangeEvent, useEffect, useState } from "react";
import AutoGrowTextArea from "./AutoGrowTextArea";
import { IPost, IPostPayloadData } from "@/types/post";
import { addPost, getPosts } from "@/api/post";
const sampleUsers = [
    {
        id: "1",
        name: "John Doe",
        username: "johndoe",
        avatar: "https://placehold.co/32x32",
    },
    {
        id: "2",
        name: "Jane Smith",
        username: "janesmith",
        avatar: "https://placehold.co/32x32",
    },
    {
        id: "3",
        name: "Robert Johnson",
        username: "rjohnson",
        avatar: "https://placehold.co/32x32",
    },
    {
        id: "4",
        name: "Emily Davis",
        username: "emilyd",
        avatar: "https://placehold.co/32x32",
    },
    {
        id: "5",
        name: "Michael Wilson",
        username: "mikewilson",
        avatar: "https://placehold.co/32x32",
    },
];
const MainContent = () => {
    const [text, setText] = useState<string>("");
    const [posts, setPosts] = useState<IPost[]>([]);
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setText(e.target.value);
    };
    const handleSubmit = async () => {
        const mentions = new Set(text.match(/@\w+/g) || []);
        const tags = new Set(text.match(/#\w+/g) || []);
        console.log("text:", text);
        console.log("Mentions:", mentions);
        console.log("Tags:", tags);
        const prepareData: IPostPayloadData = {
            content: text,
            media: [],
            mentions: [],
            tags: [...tags],
            visibility: "public",
        };
        try {
            const res = await addPost(prepareData);
            console.log({ res });
            setText("");
        } catch (error) {
            console.log("Error", error);
        }
    };
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postData = await getPosts();
                setPosts(postData);
            } catch (error) {
                console.log("Error", error);
            }
        };
        fetchPosts();
    }, []);
    return (
        <div className="flex-1 bg-white shadow-md p-5">
            <h2 className="text-xl font-bold mb-4">Dành cho bạn</h2>

            {/* Form đăng bài */}
            <div className="border-b pb-4 mb-4">
                <AutoGrowTextArea
                    value={text}
                    onChange={handleChange}
                    users={sampleUsers}
                />
                <button
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:cursor-pointer"
                    onClick={handleSubmit}
                >
                    Đăng
                </button>
            </div>

            {/* Bài đăng */}
            {posts.map((post) => (
                <div className="mt-4" key={post._id}>
                    <h3 className="font-bold">{post.author.username}</h3>
                    <p>{post.content}</p>
                    {post.media.map((source) => (
                        <div className="" key={source}>
                            <img
                                src={source} // Thay bằng link ảnh thực
                                alt={source}
                                className="w-full rounded-lg mt-2"
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MainContent;

// Type for user objects in the suggestion list
