import { AuthForm } from "@/components/auth/AuthForm";
import Logo from "../components/ui/Logo";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getToken } from "@/api/auth";

const RegisterPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = getToken();
        console.log("token", token);

        if (token) {
            navigate("/home");
        }
    }, [navigate]);
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="flex max-w-5xl w-full px-6">
                <div className="w-1/2 flex items-center justify-left">
                    <Logo />
                </div>
                <div className="w-1/2 flex items-center">
                    <AuthForm />
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
