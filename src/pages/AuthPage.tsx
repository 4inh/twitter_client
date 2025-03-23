import { AuthForm } from "@/components/auth/AuthForm";
import Logo from "../components/ui/Logo";

const AuthPage = () => {
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

export default AuthPage;
