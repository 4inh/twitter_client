import { RegisterForm } from "./RegisterForm";
import { LoginForm } from "./LoginForm";
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

            <LoginForm />
        </div>
    );
};
