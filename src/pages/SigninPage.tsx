import { useState } from "react";
import SigninModal from "@/components/auth/SigninModal";
import Logo from "@/components/ui/Logo";
import { AuthForm } from "@/components/auth/AuthForm";

const Signin = () => {
    const [isOpen, setIsOpen] = useState(true);

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
            <SigninModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
};

export default Signin;
