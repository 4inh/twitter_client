import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/Dialog";
import Input from "../ui/Input";
import { IoLogoSnapchat } from "react-icons/io";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/auth/AuthContext";
export const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useContext(AuthContext);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await login(email, password);
            navigate("/home");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data.message || "An error occurred");
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger className="w-full">
                <span
                    // variant="outline"
                    className="w-full block px-4 py-2 bg-primary text-primary-foreground rounded-full hover:opacity-70 hover:cursor-pointer"
                    // onClick={() => setIsOpen(true)}
                >
                    Đăng nhập
                </span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <IoLogoSnapchat className="text-primary text-5xl" />
                        <span className="text-center">
                            Đăng nhập vào Twitter
                        </span>
                    </DialogTitle>

                    <Input
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 border-b border-gray-300 focus:border-primary focus:border-b-2 outline-none"
                    />
                    <Input
                        placeholder="Mật khẩu"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 border-b border-gray-300 focus:border-primary focus:border-b-2 outline-none"
                    />
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="grid grid-cols-1 gap-4 mt-5 place-items-center">
                        <Button
                            disabled={isLoading}
                            className="w-full rounded-full text-white bg-primary hover:opacity-70 hover:text-white hover:cursor-pointer transition-all duration-300"
                            onClick={handleLogin}
                        >
                            {/* Đăng nhập */}
                            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full rounded-full text-primary hover:bg-primary hover:text-white hover:cursor-pointer mt-2 transition-all duration-300"
                            onClick={() => navigate("/")}
                        >
                            Quên mật khẩu?
                        </Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
