import { FaTwitter } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import mainRoutes from "@/routes/MainRoutes";

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className="sticky top-0 h-screen bg-white border-r  z-10  box-border overflow-y-auto overflow-x-hidden p-5">
            <div
                className="w-[275px] font-bold text-xl flex items-center cursor-pointer"
                onClick={() => navigate("/home")}
            >
                <FaTwitter className="text-blue-500 w-10 h-10" />
            </div>
            <ul className="space-y-4 ">
                {mainRoutes.map((mainRoute) => {
                    const Icon =
                        location.pathname === mainRoute.navigateLink
                            ? mainRoute.activeiIcon
                            : mainRoute.icon;
                    return (
                        <li
                            key={mainRoute.label}
                            className={`w-[275px] text-xl flex items-center mt-8 cursor-pointer ${
                                location.pathname === mainRoute.navigateLink
                                    ? "font-bold text-blue-500"
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

            <button className="text-2xl w-full bg-blue-500 text-white py-2 rounded-full mt-10">
                Đăng
            </button>
        </div>
    );
};

export default Sidebar;
