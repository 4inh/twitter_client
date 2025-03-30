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
    const [displayName, setDisplayName] = useState(currentUser.displayName);
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
                    avatar: user.profilePicture,
                    createdAt: user.createdAt,
                    displayName: user.displayName,
                    email: user.email,
                    id: user._id,
                    role: user.role,
                    username: user.username,
                };
                setUser(prepare);
            }
            console.log(res);
        } catch (error) {
            console.error("Failed to update profile", error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
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
                                            : currentUser?.avatar
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
                                    Change
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label
                            htmlFor="displayname"
                            className="text-sm font-medium text-right"
                        >
                            Display Name
                        </label>
                        <Input
                            id="displayname"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
