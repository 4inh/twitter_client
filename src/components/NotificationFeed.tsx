import { getNotifications } from "@/api/notifications";
import { AuthContext } from "@/context/auth/AuthContext";
import { INotification } from "@/types/notification";
import { useContext } from "react";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

// interface Notification {
//     message: string;
//     postId: string;
// }

const NotificationFeed = () => {
    const [notifications, setNotifications] = useState<INotification[]>([]);
    const { currentUser } = useContext(AuthContext);
    useEffect(() => {
        if (!currentUser) return;
        socket.emit("join", currentUser._id);

        socket.on("notification", (data) => {
            console.log({ data });

            // setNotifications((prev) => [data, ...prev]);
        });

        return () => {
            socket.off("notification");
        };
    }, [currentUser]);
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await getNotifications();
                console.log(res);
                if (res.data) {
                    setNotifications(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchNotifications();
    }, []);
    return (
        <div className="w-2/3 p-4 border-r border-gray-300 mx-auto">
            <h2 className="text-xl font-bold mb-4 ">Thông báo</h2>
            <ul className="mt-4 space-y-3  list-none">
                {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <div key={index}>
                            <p>
                                From{" "}
                                <span className="text-blue-500">
                                    {notification.senderId.username}
                                </span>
                            </p>
                            <p className="text-md">{notification.message}</p>
                        </div>
                    ))
                ) : (
                    <li>Không có thông báo</li>
                )}
            </ul>
        </div>
    );
};

export default NotificationFeed;
