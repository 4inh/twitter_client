import { AuthForm } from "@/components/auth/AuthForm";
import Logo from "../components/ui/Logo";
import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "@/context/auth/AuthContext";

const AuthPage = () => {
    const { token } = useContext(AuthContext);
    if (token) {
        return <Navigate to={"/home"} />;
    }
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="flex max-w-5xl w-full px-6">
                <div className="w-1/2 flex items-center justify-center">
                    <Logo />
                </div>
                <div className="w-1/2 flex items-center">
                    <AuthForm />
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
