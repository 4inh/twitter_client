import { ChatContext } from "@/context/chat/ChatContext";
import React, { useContext } from "react";

const ChatHeader: React.FC = () => {
    const { activeChat } = useContext(ChatContext);

    if (!activeChat) return null;

    return (
        <div className="bg-white border-b p-4 flex items-center">
            <div className="h-10 w-10 rounded-full bg-gray-300 mr-3 overflow-hidden">
                {activeChat.profilePicture ? (
                    <img
                        src={activeChat.profilePicture}
                        alt={activeChat.displayName || activeChat.username}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center bg-blue-500 text-white text-xl font-semibold">
                        {(activeChat.displayName || activeChat.username)
                            .charAt(0)
                            .toUpperCase()}
                    </div>
                )}
            </div>
            <div>
                <h2 className="font-semibold text-lg">
                    {activeChat.displayName || activeChat.username}
                </h2>
            </div>
        </div>
    );
};
export default ChatHeader;
