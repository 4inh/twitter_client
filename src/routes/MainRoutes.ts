import { IMainRoutes } from "@/types/routes";
import { AiFillHome } from "react-icons/ai";
import { GoBell } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { MdMailOutline } from "react-icons/md";

const mainRoutes: IMainRoutes[] = [
    {
        icon: AiFillHome,
        activeiIcon: AiFillHome,
        label: "Trang chủ",
        navigateLink: "/home",
    },
    {
        icon: IoIosSearch,
        activeiIcon: IoIosSearch,
        label: "Khám phá",
        navigateLink: "/explore",
    },
    {
        icon: GoBell,
        activeiIcon: GoBell,
        label: "Thông báo",
        navigateLink: "/notifications",
    },
    {
        icon: MdMailOutline,
        activeiIcon: MdMailOutline,
        label: "Tin nhắn",
        navigateLink: "/message",
    },
    {
        icon: IoPersonOutline,
        activeiIcon: IoPersonOutline,
        label: "Hồ sơ",
        navigateLink: "/profile",
    },
];

export default mainRoutes;
