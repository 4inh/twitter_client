import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/Dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import Input from "../ui/Input";
import { Button } from "../ui/Button";
import { User } from "@/types/auth";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { editProfile } from "@/api/user";
import { setUser } from "@/api/auth";

export function EditProfileForm({ currentUser }: { currentUser: User }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [displayName, setDisplayName] = useState<string>(
        currentUser.displayName ?? ""
    );
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleMediaClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleEditProfile = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("displayName", displayName);
        if (selectedFile) {
            formData.append("avatar", selectedFile);
        }

        try {
            console.log(formData);
            const res = await editProfile(formData);
            if (res.data) {
                const user = res.data;
                const prepare: User = {
                    profilePicture: user.profilePicture,
                    profileBackground: user.profileBackground,
                    displayName: user.displayName,
                    email: user.email,
                    _id: user._id,
                    role: user.role,
                    username: user.username,
                };
                setUser(prepare);
            }
            console.log(res);

            document.body.click();
            setTimeout(() => {
                window.location.reload();
            }, 200);
        } catch (error) {
            console.error("Failed to update profile", error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="hover:bg-blue-500 hover:text-white">Chỉnh sửa hồ sơ</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa</DialogTitle>
                    <DialogDescription>
                        Thực hiện các thay đổi cho hồ sơ của bạn ở đây. Nhấp vào Lưu khi bạn hoàn thành.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleEditProfile} className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 items-center gap-4 ">
                        <div className="min-w-12 w-1/4 relative group">
                            <Avatar className="w-full h-[unset] aspect-square border-4 border-black">
                                <AvatarImage
                                    src={
                                        selectedFile
                                            ? URL.createObjectURL(selectedFile)
                                            : currentUser?.profilePicture
                                    }
                                />
                                <AvatarFallback>
                                    {currentUser?.email.at(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="hidden absolute inset-0 group-hover:flex items-center justify-center">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept="image/*"
                                />
                                <button
                                    className="text-blue-500 p-2"
                                    id="add-media-btn"
                                    type="button"
                                    onClick={handleMediaClick}
                                >
                                    Thay đổi
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label
                            htmlFor="displayname"
                            className="text-sm font-medium text-right"
                        >
                            Tên hiển thị
                        </label>
                        <Input
                            id="displayname"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="hover:bg-blue-800">Lưu thay đổi</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
