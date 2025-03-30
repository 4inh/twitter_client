import { AuthContext } from "@/context/auth/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router";
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { currentUser, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-xl text-gray-600">Loading...</div>
            </div>
        );
    }

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};
export default RequireAuth;
