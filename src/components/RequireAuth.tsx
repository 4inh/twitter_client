import { AuthContext } from "@/context/auth/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router";
import LoadingIndicator from "./LoadingIndicator";
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { currentUser, loading } = useContext(AuthContext);
    console.log({ RequireAuth: currentUser });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <LoadingIndicator />
            </div>
        );
    }

    if (!currentUser) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};
export default RequireAuth;
