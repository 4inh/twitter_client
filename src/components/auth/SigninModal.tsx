import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader } from "../ui/Dialog";
import Input from "../ui/Input";
import { Button } from "../ui/Button";
import { X } from "lucide-react";
import { FaTwitter } from "react-icons/fa";

interface SigninModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SigninModal: React.FC<SigninModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    return (
        // <Dialog open={isOpen} onOpenChange={onClose}>
        //     <DialogContent className="max-w-xl relative p-6 md:p-12">
        //         <DialogHeader>
        //             <FaTwitter className="text-blue-500 text-5xl" />

        //             <button
        //                 onClick={() => navigate("/")}
        //                 className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200"
        //             >
        //                 <X className="w-6 h-6" />
        //             </button>

        //             <DialogHeader>
        //                 <h2 className="text-center text-3xl font-bold">Đăng nhập vào Twitter</h2>
        //             </DialogHeader>

        //         </DialogHeader>
        //         <Input placeholder="Email" className="p-2 border-b border-gray-300 focus:border-blue-500 focus:border-b-2 outline-none" />
        //         <Input placeholder="Mật khẩu" type="password" className="p-2 border-b border-gray-300 focus:border-blue-500 focus:border-b-2 outline-none" />

        //         <div className="grid grid-cols-1 gap-4 mt-5 place-items-center">
        //             <Button className="w-full rounded-full text-white bg-gray-500 hover:bg-blue-500 hover:text-white hover:cursor-pointer transition-all duration-300"
        //                 onClick={() => navigate("/home")}>
        //                     Đăng nhập
        //             </Button>
        //         <Button
        //             variant="outline"
        //             className="w-full rounded-full text-blue-500 hover:bg-blue-500 hover:text-white hover:cursor-pointer mt-2 transition-all duration-300"
        //             onClick={() => navigate("/")}
        //         >
        //             Quên mật khẩu?
        //         </Button>
        //     </div>

        //     <div className="text-left">
        //         <p className="text-sm text-gray-500 mt-8">
        //             Không có tài khoản? <span onClick={() => navigate("/signup")} className="hover:cursor-pointer hover:underline text-blue-500">Đăng ký</span>
        //         </p>
        //     </div>
        // </DialogContent>
        // </Dialog >
        <div>SigninModal</div>
    );
};

export default SigninModal;
