import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader } from "../ui/Dialog";
import { X } from "lucide-react";
import { FaTwitter } from "react-icons/fa";

interface SignupModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose, children }) => {
    const navigate = useNavigate();

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-xl relative p-6 md:p-6">
                <DialogHeader>
                    <FaTwitter className="text-blue-500 text-5xl" />

                    <button
                        onClick={() => navigate("/")}
                        className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 hover:cursor-pointer"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <h2 className="text-center text-3xl font-bold mt-4">Tạo tài khoản của bạn</h2>
                </DialogHeader>

                {children}
            </DialogContent>
        </Dialog>
    );
};

export default SignupModal;
