import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { getToken } from "@/api/auth";

function MainLayout() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = getToken();

        if (!token) {
            navigate("/login");
        }
    }, [navigate]);
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="w-full max-w-7xl flex">
                <Sidebar />

                <div className="w-full flex p-0 ">
                    <Outlet />{" "}
                    {/* Outlet giúp hiển thị nội dung của Route con */}
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
