import { getNotifications } from "@/api/notifications";
import { AuthContext } from "@/context/auth/AuthContext";
import { INotification } from "@/types/notification";
import { useContext } from "react";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";

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
        <div className="w-2/3 border-r border-gray-200">
            <h2 className="text-2xl font-bold mb-0 p-4 bg-black text-white">
                Thông báo
            </h2>
            <ul className="mt-0 list-none">
                {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <div key={index} className="bg-white p-4 border-b">
                            <p>
                                Từ{" "}
                                {/* <span className="text-blue-500">
                                    {notification.senderId.username}
                                </span> */}
                                <Link
                                    to={`/profile/${notification.senderId.username}`}
                                    className=" font-bold text-black hover:underline"
                                >
                                    {notification.senderId.username}
                                </Link>
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
