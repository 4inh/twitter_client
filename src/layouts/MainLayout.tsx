import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            {/* Container with max width */}
            <div className="w-full max-w-7xl flex">
                {/* Sidebar (Sticky) */}
                <Sidebar />

                {/* Content Area (pushed right) */}
                <div className="w-full overflow-auto flex p-0 h-[2000px]">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
