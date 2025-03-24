import { IMainRoutes } from "@/types/routes";
import { GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";
import { IoSearchSharp } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { GoBellFill } from "react-icons/go";
import { MdMail } from "react-icons/md";
import { MdMailOutline } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";

const mainRoutes: IMainRoutes[] = [
    {
        icon: GoHome,
        activeiIcon: GoHomeFill,
        label: "Trang chủ",
        navigateLink: "/home",
    },
    {
        icon: IoSearchOutline,
        activeiIcon: IoSearchSharp,
        label: "Khám phá",
        navigateLink: "/explore",
    },
    {
        icon: GoBell,
        activeiIcon: GoBellFill,
        label: "Thông báo",
        navigateLink: "/notifications",
    },
    {
        icon: MdMailOutline,
        activeiIcon: MdMail,
        label: "Tin nhắn",
        navigateLink: "/message",
    },
    {
        icon: IoPersonOutline,
        activeiIcon: IoPerson,
        label: "Hồ sơ",
        navigateLink: "/profile",
    },
];

export default mainRoutes;
