import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import RequireAuth from "@/components/RequireAuth";

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
            <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
                <div className="w-full max-w-7xl flex">
                    <Sidebar />

                    <div className="w-full flex p-0 ">
                        <Outlet />{" "}
                        {/* Outlet giúp hiển thị nội dung của Route con */}
                    </div>
                </div>
            </div>
        </RequireAuth>
    );
}

export default MainLayout;
