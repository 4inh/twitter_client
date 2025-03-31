import React from "react";
import FriendsList from "../components/FriendsList";
import ChatMessages from "../components/ChatMessages";
import ChatHeader from "../components/ChatHeader";
import MessageInput from "../components/MessageInput";

const ChatPage: React.FC = () => {
    return (
        <div className="flex-1 flex h-screen">
            <FriendsList />
            <div className="flex-1 flex flex-col">
                <ChatHeader />
                <ChatMessages />
                <MessageInput />
            </div>
        </div>
    );
};
export default ChatPage;
