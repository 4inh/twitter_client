import { addPost } from "@/api/post";
import { IPostPayloadData } from "@/types/post";
import { ChangeEvent, useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import AutoGrowTextArea from "../AutoGrowTextArea";

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

interface MediaFile {
    file: File;
    preview: string;
    type: string;
}

const AddPostForm = () => {
    const [text, setText] = useState<string>("");
    const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        setText(e.target.value);
    };

    const handleMediaClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newFiles: MediaFile[] = [];

        Array.from(files).forEach((file) => {
            // Check if file is an image or video
            if (
                file.type.startsWith("image/") ||
                file.type.startsWith("video/")
            ) {
                const preview = URL.createObjectURL(file);
                newFiles.push({
                    file,
                    preview,
                    type: file.type.startsWith("image/") ? "image" : "video",
                });
            }
        });

        setMediaFiles([...mediaFiles, ...newFiles]);
    };

    const removeMedia = (index: number) => {
        const updatedFiles = [...mediaFiles];
        // Revoke the URL to prevent memory leaks
        URL.revokeObjectURL(updatedFiles[index].preview);
        updatedFiles.splice(index, 1);
        setMediaFiles(updatedFiles);
    };

    const handleSubmit = async () => {
        const mentions = new Set(text.match(/@\w+/g) || []);
        const tags = new Set(text.match(/#\w+/g) || []);

        // Extract actual File objects for the API call
        const mediaFilesForAPI = mediaFiles.map((mediaFile) => mediaFile.file);

        console.log("text:", text);
        console.log("Mentions:", mentions);
        console.log("Tags:", tags);
        console.log("Media files:", mediaFilesForAPI);

        // Create FormData to send files to server
        const formData = new FormData();
        formData.append("content", text);

        // Add each file to the FormData
        mediaFilesForAPI.forEach((file) => {
            formData.append("media", file); // Use array notation for multiple files
        });

        // Add other data
        if (tags.size > 0) {
            formData.append("tags", JSON.stringify([...tags]));
        }

        if (mentions.size > 0) {
            formData.append("mentions", JSON.stringify([...mentions]));
        }

        formData.append("visibility", "public");

        setIsLoading(true);

        try {
            // Update the addPost function to handle FormData instead of JSON
            const res = await addPost(formData);
            console.log(res);

            setText("");
            setMediaFiles([]);
            setIsLoading(false);
        } catch (error) {
            console.log("Error", error);
            setIsLoading(false);
        }
    };

    return (
        <div className="p-5 flex gap-4 ">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="w-full flex flex-col gap-2">
                <AutoGrowTextArea
                    value={text}
                    onChange={handleChange}
                    users={sampleUsers}
                    placeholder="Chuyện gì đang xảy ra?"
                />

                {/* Media files preview */}
                {mediaFiles.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        {mediaFiles.map((media, index) => (
                            <div
                                key={index}
                                className="relative rounded-md overflow-hidden"
                            >
                                {media.type === "image" ? (
                                    <img
                                        src={media.preview}
                                        alt={`Preview ${index}`}
                                        className="w-full h-32 object-cover"
                                    />
                                ) : (
                                    <video
                                        src={media.preview}
                                        className="w-full h-32 object-cover"
                                        controls
                                    />
                                )}
                                <button
                                    className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 text-white"
                                    onClick={() => removeMedia(index)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line
                                            x1="18"
                                            y1="6"
                                            x2="6"
                                            y2="18"
                                        ></line>
                                        <line
                                            x1="6"
                                            y1="6"
                                            x2="18"
                                            y2="18"
                                        ></line>
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="w-full flex justify-between items-center">
                    {/* Hidden file input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        multiple
                        accept="image/*,video/*"
                    />

                    <button
                        className="text-blue-500 p-2"
                        id="add-media-btn"
                        onClick={handleMediaClick}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect
                                x="3"
                                y="3"
                                width="18"
                                height="18"
                                rx="2"
                                ry="2"
                            ></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-full"
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        Đăng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddPostForm;
