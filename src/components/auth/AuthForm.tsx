import { RegisterForm } from "./RegisterForm";
import { LoginForm } from "./LoginForm";
import { Link } from "react-router";
export const AuthForm = () => {
    return (
        <div className="max-w-md text-left space-y-4">
            <h1 className="text-7xl font-bold w-[750px]">
                Đang diễn ra ngay bây giờ
            </h1>
            <h2 className="text-xl font-semibold">Tham gia ngay.</h2>
            <RegisterForm />

            <p className="text-xs text-gray-500 mb-10">
                Khi đăng ký, bạn đã đồng ý với{" "}
                <Link to={"/terms-of-service"} className="hover:cursor-pointer hover:underline text-primary font-bold">
                    Điều khoản Dịch vụ
                </Link>{" "}
                và{" "}
                <Link to={"/privacy-policy"} className="hover:cursor-pointer hover:underline text-primary font-bold">
                    Chính sách Quyền riêng tư
                </Link>
                , gồm cả{" "}
                <Link to={"/cookie-policy"} className="hover:cursor-pointer hover:underline text-primary font-bold">
                    Sử dụng Cookie
                </Link>
                .
            </p>

            <p className="text-lg font-semibold">Đã có tài khoản?</p>

            <LoginForm />
        </div>
    );
};
