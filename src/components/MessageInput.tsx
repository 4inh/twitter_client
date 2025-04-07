import { ChatContext } from "@/context/chat/ChatContext";
import React, { useState, useContext } from "react";

const MessageInput: React.FC = () => {
    const [message, setMessage] = useState("");
    const { sendMessage, activeChat } = useContext(ChatContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && activeChat) {
            await sendMessage(message);
            setMessage("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 border-t">
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Nhập tin nhắn..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={!activeChat}
                    className="flex-1 p-3 border focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                    type="submit"
                    disabled={!message.trim() || !activeChat}
                    className="bg-primary text-white p-3.5 rounded-r-lg hover:opacity-70 focus:outline-none focus:ring-2 "
                >
                    Gửi
                </button>
            </div>
        </form>
    );
};
export default MessageInput;
