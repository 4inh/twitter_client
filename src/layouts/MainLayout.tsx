import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import RequireAuth from "@/components/RequireAuth";
import { PostProvider } from "@/context/post/PostProvider";

function MainLayout() {
    // const navigate = useNavigate();
    // useEffect(() => {
    //     const token = getToken();

    //     if (!token) {
    //         navigate("/login");
    //     }
    // }, [navigate]);
    return (
        <RequireAuth>
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
        </RequireAuth>
    );
}

export default MainLayout;
