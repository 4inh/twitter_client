import { ChatContext } from "@/context/chat/ChatContext";
import { MediaFile } from "@/types";
import { IMessagePayloadData } from "@/types/message";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import React, { useState, useContext, ChangeEvent, useRef } from "react";
import { LuImage, LuX } from "react-icons/lu";
import LoadingIndicator from "./LoadingIndicator";
const MessageInput: React.FC = () => {
    const { sendMessage, activeChat } = useContext(ChatContext);
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const toggleEmojiPicker = () => {
        setShowEmojiPicker((prev) => !prev);
    };
    const onEmojiClick = (emojiData: EmojiClickData) => {
        setMessage((prev) => prev + emojiData.emoji);
        setShowEmojiPicker(false);
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (message.trim() && activeChat) {
            setIsLoading(true);
            const mediaFilesForAPI = mediaFiles.map(
                (mediaFile) => mediaFile.file
            );
            console.log({ mediaFilesForAPI });

            const preparePayload: IMessagePayloadData = {
                content: message,
                media: mediaFilesForAPI,
            };
            await sendMessage(preparePayload);
            setMessage("");
            setMediaFiles([]);
            setIsLoading(false);
        }
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

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-4 border-t rounded-t-lg"
        >
            {mediaFiles.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-2">
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
                                <LuX className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <div className="flex items-center">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        placeholder="Nhập tin nhắn..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={!activeChat}
                        className=" p-3 w-full border focus:outline-none focus:ring-1 focus:ring-primary rounded-l-lg"
                    />
                    <div className="absolute top-1/2 -translate-1/2 right-0 flex justify-end items-center gap-2">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            multiple
                            accept="image/*,video/*"
                        />

                        <button
                            className="w-8 h-8 flex justify-center items-center text-primary  border border-black-500 rounded-full hover:text-primary hover:border-primary"
                            id="add-media-btn"
                            type="button"
                            onClick={handleMediaClick}
                        >
                            <LuImage className="w-4 h-4" />
                        </button>
                        <button
                            className="w-8 h-8 flex justify-center items-center  text-primary text-base  border border-black-500 rounded-full hover:text-primary hover:border-primary"
                            onClick={toggleEmojiPicker}
                            type="button"
                        >
                            😊
                        </button>
                    </div>
                    {showEmojiPicker && (
                        <div className="absolute bottom-[calc(100%+12px)] right-4 z-50">
                            <EmojiPicker onEmojiClick={onEmojiClick} />
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={!message.trim() || !activeChat || isLoading}
                    className="bg-primary text-white p-3.5 rounded-r-lg hover:opacity-70 focus:outline-none focus:ring-2 "
                >
                    {isLoading ? (
                        <LoadingIndicator className="border-white" />
                    ) : (
                        " Gửi"
                    )}
                </button>
            </div>
        </form>
    );
};
export default MessageInput;
