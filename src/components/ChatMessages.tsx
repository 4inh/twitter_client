import React, { useContext, useEffect, useRef } from "react";
import { ChatContext } from "@/context/chat/ChatContext";
import { AuthContext } from "@/context/auth/AuthContext";

const ChatMessages: React.FC = () => {
    const { messages, activeChat } = useContext(ChatContext);
    const { currentUser } = useContext(AuthContext);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    if (!activeChat) {
        return (
            <div className="w-120 flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center text-gray-500">
                    <svg
                        className="w-16 h-16 mx-auto text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                    </svg>
                    <p className="mt- text-lg">
                        Select a contact to start chatting
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-120 flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                        <p>No messages yet. Start the conversation!</p>
                    </div>
                ) : (
                    messages.map((message) => {
                        const isCurrentUser =
                            message.senderId === currentUser?._id;
                        return (
                            <div
                                key={message._id}
                                className={`flex ${
                                    isCurrentUser
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <div
                                    className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${
                                        isCurrentUser
                                            ? "bg-blue-600 text-white"
                                            : "bg-white border"
                                    }`}
                                >
                                    <div>{message.content}</div>
                                    {message.media &&
                                        message.media.length > 0 && (
                                            <div className="mt-2 space-y-2">
                                                {message.media.map(
                                                    (mediaUrl, index) => (
                                                        <img
                                                            key={index}
                                                            src={mediaUrl}
                                                            alt="Media"
                                                            className="rounded max-h-60 max-w-full"
                                                        />
                                                    )
                                                )}
                                            </div>
                                        )}
                                    <div
                                        className={`text-xs mt-1 ${
                                            isCurrentUser
                                                ? "text-blue-200"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        {new Date(
                                            message.timestamp
                                        ).toISOString()}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};
export default ChatMessages;
