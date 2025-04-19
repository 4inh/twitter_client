import React, { useState, useEffect, useContext, ReactNode } from "react";
import { Friend } from "@/types/auth";
import { Message } from "@/types/message";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "./ChatContext";
import { getFriends } from "@/api/user";
import { getMessages, postMessage } from "@/api/message";
import socket from "@/config/socketConfig";

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { currentUser, token } = useContext(AuthContext);
    const [friends, setFriends] = useState<Friend[]>([]);
    const [activeChat, setActiveChat] = useState<Friend | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);

    // Fetch friends list
    useEffect(() => {
        const fetchFriends = async () => {
            if (currentUser && token) {
                try {
                    const res = await getFriends();
                    if (res.data) {
                        setFriends(res.data);
                    }
                } catch (err) {
                    console.error("Failed to fetch friends:", err);
                }
            }
        };

        fetchFriends();
    }, [currentUser, token]);

    // Listen for new messages
    useEffect(() => {
        console.log(" Listen for new messages", socket);

        socket.on("newMessage", (newMessage: Message) => {
            console.log("New message received via socket:", newMessage);
            if (
                (activeChat &&
                    (newMessage.senderId === activeChat._id ||
                        newMessage.receiverId === activeChat._id)) ||
                newMessage.senderId === currentUser?._id ||
                newMessage.receiverId === currentUser?._id
            ) {
                console.log("newMessage", newMessage);

                setMessages((prev) => [...prev, newMessage]);
            }
        });

        return () => {
            socket.off("newMessage");
        };
    }, [activeChat, currentUser?._id]);

    // Fetch messages when active chat changes
    useEffect(() => {
        console.log({ activeChat, token });

        const fetchMessages = async () => {
            if (activeChat && token) {
                try {
                    const res = await getMessages(activeChat._id);
                    console.log("fetchMessages", res);

                    if (res.data) {
                        setMessages(res.data);
                    }
                } catch (err) {
                    console.error("Failed to fetch messages:", err);
                }
            }
        };

        if (activeChat) {
            fetchMessages();
        } else {
            setMessages([]);
        }
    }, [activeChat, token]);

    const sendMessage = async (content: string, media: string[] = []) => {
        if (!activeChat || !currentUser || !token) return;

        try {
            await postMessage({ content, media, receiverId: activeChat._id });
        } catch (err) {
            console.error("Failed to send message:", err);
        }
    };

    return (
        <ChatContext.Provider
            value={{
                friends,
                activeChat,
                messages,
                sendMessage,
                setActiveChat,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};
