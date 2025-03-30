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
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={!activeChat}
                    className="flex-1 p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    disabled={!message.trim() || !activeChat}
                    className="bg-blue-600 text-white p-3 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-300"
                >
                    Send
                </button>
            </div>
        </form>
    );
};
export default MessageInput;
