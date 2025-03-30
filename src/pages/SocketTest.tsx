import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Adjust URL if needed

export default function SocketTest() {
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        // Handle connection
        socket.on("connect", () => {
            console.log("Connected to server");
            setIsConnected(true);
        });

        // Handle disconnection
        socket.on("disconnect", () => {
            console.log("Disconnected from server");
            setIsConnected(false);
        });

        // Cleanup on unmount
        return () => {
            socket.off("connect");
            socket.off("disconnect");
        };
    }, []);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-6 bg-gray-200 rounded-lg shadow-md text-center">
                <h1 className="text-xl font-bold">Socket.IO Connection</h1>
                <p className="mt-2">
                    Status: {isConnected ? "Connected" : "Disconnected"}
                </p>
            </div>
        </div>
    );
}
