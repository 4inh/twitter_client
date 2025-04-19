import { IoLogoSnapchat } from "react-icons/io";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/Dialog";

import { useNavigate } from "react-router-dom";
import mainRoutes from "@/routes/MainRoutes";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/auth/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { LuEllipsis } from "react-icons/lu";
import { Button } from "./ui/Button";
const Sidebar = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <div className="sticky top-0 h-screen bg-white border-r z-10 flex flex-col justify-between box-border overflow-y-auto overflow-x-hidden">
            <div className="flex flex-col gap-4  p-5">
                <div
                    className="w-[275px] font-bold text-xl flex items-center cursor-pointer"
                    onClick={() => navigate("/home")}
                >
                    <IoLogoSnapchat className="w-10 h-10" />
                </div>
                <ul className="flex flex-col gap-6">
                    {mainRoutes.map((mainRoute) => {
                        const Icon =
                            location.pathname === mainRoute.navigateLink
                                ? mainRoute.activeiIcon
                                : mainRoute.icon;
                        return (
                            <li
                                key={mainRoute.label}
                                className={`w-[275px] text-xl flex items-center  cursor-pointer ${
                                    location.pathname === mainRoute.navigateLink
                                        ? "font-bold text-black-500"
                                        : ""
                                }`}
                                onClick={() => navigate(mainRoute.navigateLink)}
                            >
                                <Icon className="w-6 h-6 mr-5" />
                                <span>{mainRoute.label}</span>
                            </li>
                        );
                    })}
                </ul>

                <button
                    className="text-2xl font-semibold w-full bg-black text-white py-2 rounded-full  hover:bg-[rgba(0,0,0,0.8)]"
                    onClick={() => navigate("/home")}
                >
                    Đăng
                </button>
            </div>
            {currentUser && (
                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger asChild>
                        <div className="flex gap-1 justify-between items-center hover:bg-gray-100  p-5 cursor-pointer">
                            <div className="flex gap-2  items-center">
                                <Avatar className="size-10">
                                    <AvatarImage
                                        src={currentUser.profilePicture}
                                    />
                                    <AvatarFallback>
                                        {currentUser.username.at(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col ">
                                    <h3 className="text-xl font-semibold">
                                        {currentUser?.displayName ??
                                            currentUser?.username}
                                    </h3>
                                    <p className="text-gray-500">
                                        {currentUser?.email}
                                    </p>
                                </div>
                            </div>

                            <LuEllipsis />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem
                            onClick={() => setDialogOpen(true)}
                            role="button"
                            className=" cursor-pointer w-full"
                        >
                            Đăng xuất {currentUser?.email}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Đăng xuất khỏi </DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            role="button"
                            onClick={() => setDialogOpen(false)}
                        >
                            Hủy
                        </Button>
                        <Button
                            className="bg-primary hover:opacity-90"
                            variant="default"
                            onClick={logout}
                            role="button"
                        >
                            Đăng xuất
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Sidebar;
