import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import RequireAuth from "@/components/RequireAuth";
import { PostProvider } from "@/context/post/PostProvider";
import { VideoCallProvider } from "@/context/videoCall/VideoCallProvider";

function MainLayout() {
    return (
        <RequireAuth>
            <VideoCallProvider>
                <PostProvider>
                    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
                        <div className="w-full max-w-7xl flex">
                            <Sidebar />

                            <div className="w-full flex p-0 ">
                                <Outlet />{" "}
                                {/* Outlet giúp hiển thị nội dung của Route con */}
                            </div>
                        </div>
                    </div>
                </PostProvider>
            </VideoCallProvider>
        </RequireAuth>
    );
}

export default MainLayout;
