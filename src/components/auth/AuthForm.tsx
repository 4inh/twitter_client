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
import { FaTwitter } from "react-icons/fa";
import { login, setToken, setUser } from "@/api/auth";
import axios from "axios";
import { useState } from "react";
export const AuthForm = () => {
    const navigate = useNavigate();
    // const [isOpen, setIsOpen] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const data = await login(email, password);
            console.log("Login successful:", data);
            setToken(data.token);
            setUser(data.user);
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
        <div className="max-w-md text-left space-y-4">
            <h1 className="text-7xl font-bold w-[750px]">
                Đang diễn ra ngay bây giờ
            </h1>
            <h2 className="text-xl font-semibold">Tham gia ngay.</h2>

            <Button
                className="w-100 bg-blue-500 text-white rounded-full hover:text-blue-500 hover:bg-blue-100 hover:cursor-pointer"
                onClick={() => navigate("/signup")}
            >
                Tạo tài khoản
            </Button>

            <p className="text-xs text-gray-500 mb-10">
                Khi đăng ký, bạn đã đồng ý với{" "}
                <span className="hover:cursor-pointer hover:underline text-blue-500">
                    Điều khoản Dịch vụ
                </span>{" "}
                và{" "}
                <span className="hover:cursor-pointer hover:underline text-blue-500">
                    Chính sách Quyền riêng tư
                </span>
                , gồm cả{" "}
                <span className="hover:cursor-pointer hover:underline text-blue-500">
                    Sử dụng Cookie
                </span>
                .
            </p>

            <p className="text-lg font-semibold">Đã có tài khoản?</p>

            {/* <SigninModal isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}
            <Dialog>
                <DialogTrigger>
                    <Button
                        variant="outline"
                        className="rounded-full w-100 text-blue-500 hover:bg-blue-500 hover:text-white hover:cursor-pointer"
                        // onClick={() => setIsOpen(true)}
                    >
                        Đăng nhập
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <FaTwitter className="text-blue-500 text-5xl" />
                            <h1 className="text-center">
                                Đăng nhập vào Twitter
                            </h1>
                        </DialogTitle>

                        <Input
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-2 border-b border-gray-300 focus:border-blue-500 focus:border-b-2 outline-none"
                        />
                        <Input
                            placeholder="Mật khẩu"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-2 border-b border-gray-300 focus:border-blue-500 focus:border-b-2 outline-none"
                        />
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        <div className="grid grid-cols-1 gap-4 mt-5 place-items-center">
                            <Button
                                disabled={isLoading}
                                className="w-full rounded-full text-white bg-gray-500 hover:bg-blue-500 hover:text-white hover:cursor-pointer transition-all duration-300"
                                onClick={handleLogin}
                            >
                                {/* Đăng nhập */}
                                {isLoading ? "Logging in..." : "Login"}
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full rounded-full text-blue-500 hover:bg-blue-500 hover:text-white hover:cursor-pointer mt-2 transition-all duration-300"
                                onClick={() => navigate("/")}
                            >
                                Quên mật khẩu?
                            </Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};
