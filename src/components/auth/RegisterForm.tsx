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
export const RegisterForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useContext(AuthContext);
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Mật khẩu nhập lại không chính xác");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await register(email, password, username);
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
                <span className="border border-primary block w-full px-4 py-2 rounded-full  text-primary hover:bg-primary hover:text-white hover:cursor-pointer">
                    Tạo tài khoản
                </span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <IoLogoSnapchat className="text-primary text-5xl" />
                        <span className="text-center">Đăng ký tài khoản</span>
                    </DialogTitle>

                    <Input
                        placeholder="Tên tài khoản"
                        onChange={(e) => setUsername(e.target.value)}
                        className="p-2 border-b border-gray-300 focus:border-primary focus:border-b-2 outline-none"
                    />
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
                    <Input
                        placeholder="Nhập lại mật khẩu"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="p-2 border-b border-gray-300 focus:border-primary focus:border-b-2 outline-none"
                    />
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="grid grid-cols-1 gap-4 mt-5 place-items-center">
                        <Button
                            disabled={isLoading}
                            className="w-full rounded-full text-white bg-primary hover:opacity-70 hover:text-white hover:cursor-pointer transition-all duration-300"
                            onClick={handleRegister}
                        >
                            {/* Đăng ký */}
                            {isLoading ? "Đang đăng ký..." : "Đăng ký"}
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
