import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import AutoGrowTextArea from "../AutoGrowTextArea";

interface MediaFile {
    file?: File;
    preview: string;
    type: string;
}

interface EditPostFormProps {
    initialText: string;
    initialMediaFiles: string[];
    onSubmit: (text: string, mediaFiles: (File | string)[]) => Promise<void>;
}

const EditPostForm = ({
    initialText,
    initialMediaFiles,
    onSubmit,
}: EditPostFormProps) => {
    const [text, setText] = useState<string>(initialText);
    const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Convert initialMediaFiles (string URLs) into MediaFile objects
        const mediaFromUrls = initialMediaFiles.map((url) => ({
            preview: url,
            type: url?.match(/\.(mp4|webm|ogg)$/i) ? "video" : "image",
        }));
        setMediaFiles(mediaFromUrls);
    }, [initialMediaFiles]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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

        setMediaFiles((prev) => [...prev, ...newFiles]);
    };

    const removeMedia = (index: number) => {
        const updatedFiles = [...mediaFiles];
        if (updatedFiles[index].file) {
            URL.revokeObjectURL(updatedFiles[index].preview);
        }
        updatedFiles.splice(index, 1);
        setMediaFiles(updatedFiles);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const mediaFilesForAPI = mediaFiles.map(
                (media) => media.file || media.preview
            );
            console.log({ text, mediaFilesForAPI });
            await onSubmit(text, mediaFilesForAPI);
        } catch (error) {
            console.error("Error updating post:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="py-4 flex gap-4">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="w-full flex flex-col gap-2">
                <AutoGrowTextArea
                    value={text}
                    onChange={handleChange}
                    placeholder="Chỉnh sửa bài viết..."
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
                                    ✕
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
                        onClick={handleMediaClick}
                    >
                        Thêm ảnh/video
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-full"
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? "Đang cập nhật..." : "Cập nhật"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPostForm;
