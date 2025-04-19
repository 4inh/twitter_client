import { ChangeEvent, useState, useRef, useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import AutoGrowTextArea from "../AutoGrowTextArea";
import { IUser } from "@/types/auth";
import { Link } from "react-router";
import { PostContext } from "@/context/post/PostContext";
import { IPostPayloadData } from "@/types/post";
import { removeAtSymbol } from "@/utils";
import LoadingIndicator from "../LoadingIndicator";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
interface MediaFile {
    file: File;
    preview: string;
    type: string;
}

const AddPostForm = ({ currentUser }: { currentUser: IUser }) => {
    const [text, setText] = useState<string>("");
    const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { createPost } = useContext(PostContext);
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

        setIsLoading(true);
        const validateMentions = removeAtSymbol([...mentions]);

        const matchedFriendIds = currentUser.friends
            .filter((friend) => validateMentions.includes(friend.username))
            .map((matchedFriend) => matchedFriend._id);
        console.log("matchedFriendIds:", matchedFriendIds);

        try {
            const preparePayload: IPostPayloadData = {
                content: text,
                tags: [...tags],
                media: mediaFilesForAPI,
                mentions: matchedFriendIds,
            };
            await createPost(preparePayload);
            setText("");
            setMediaFiles([]);
            setIsLoading(false);
        } catch (error) {
            console.log("Error", error);
            setIsLoading(false);
        }
    };

    const insertSymbol = (symbol: string) => {
        const textarea = document.querySelector("textarea");
        if (!textarea) return;

        const start = textarea.selectionStart || 0;
        const end = textarea.selectionEnd || 0;
        const before = text.slice(0, start);
        const after = text.slice(end);

        const newText = before + symbol + after;
        setText(newText);

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
        setText((prev) => prev + emojiData.emoji);
        setShowEmojiPicker(false);
    };
    return (
        <div className="p-5 flex gap-4 border-transparent">
            <Link to={`/profile/${currentUser.username}`}>
                <Avatar>
                    <AvatarImage src={currentUser.profilePicture} />
                    <AvatarFallback>{currentUser.email.at(0)}</AvatarFallback>
                </Avatar>
            </Link>
            <div className="w-full flex flex-col gap-2">
                <AutoGrowTextArea
                    value={text}
                    onChange={handleChange}
                    users={currentUser.friends}
                    placeholder="Chuyện gì đang xảy ra?"
                    className="border-b border-gray-500 hover:border-b-2 transition-all duration-100"
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

                <div className="w-full flex justify-between items-center relative">
                    <div className="flex items-center gap-x-2 relative">
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
                            className="w-10 h-10 text-primary p-2 border border-black-500 rounded-lg hover:text-primary hover:border-primary"
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

                    <button
                        className={`px-4 py-2 rounded-full transition-all min-w-[86px] flex justify-center items-center ${
                            text.trim().length > 0
                                ? "bg-primary text-white hover:bg-primary hover:opacity-90"
                                : "bg-gray-300 text-gray-500"
                        }`}
                        onClick={handleSubmit}
                        disabled={isLoading || text.trim().length === 0}
                    >
                        {isLoading ? (
                            <LoadingIndicator className="w-5 h-5 border-primary-foreground" />
                        ) : (
                            "Đăng"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddPostForm;
