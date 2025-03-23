import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="w-full max-w-7xl flex">
                <Sidebar />

                <div className="w-full overflow-auto flex p-0 h-[2000px]">
                    <Outlet /> {/* Outlet giúp hiển thị nội dung của Route con */}
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
