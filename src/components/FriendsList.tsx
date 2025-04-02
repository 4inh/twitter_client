import { ChatContext } from "@/context/chat/ChatContext";
import React, { useContext } from "react";

const FriendsList: React.FC = () => {
    const { friends, activeChat, setActiveChat } = useContext(ChatContext);

    return (
        <div className="w-64 bg-gray-100 h-screen overflow-y-auto">
            <div className="p-5 bg-blue-600 text-white">
                <h2 className="text-xl font-semibold">Liên hệ</h2>
            </div>
            <div className="">
                {friends.map((friend) => (
                    <div className="">
                        <div
                            key={friend._id}
                            className={`border-b-2 p-4 cursor-pointer flex items-center ${activeChat?._id === friend._id
                                    ? "bg-blue-200"
                                    : "hover:bg-gray-200"
                                }`}
                            onClick={() => setActiveChat(friend)}
                        >
                            <div className="h-10 w-10 rounded-full bg-gray-300 mr-3 overflow-hidden">
                                {friend.profilePicture ? (
                                    <img
                                        src={friend.profilePicture}
                                        alt={friend.displayName || friend.username}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center bg-blue-500 text-white text-xl font-semibold">
                                        {(friend.displayName || friend.username)
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="font-medium">
                                    {friend.displayName || friend.username}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {friends.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                        Không có liên hệ
                    </div>
                )}
            </div>
        </div>
    );
};
export default FriendsList;
