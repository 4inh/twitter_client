import React from "react";

const NotificationFeed = () => {
    const notifications = [
        { id: 1, message: "There was a login to your account @tran_tuan23050 from a new device on 24 thg 3, 2025. Review it now." },
        { id: 2, message: "There was a login to your account @tran_tuan23050 from a new device on 22 thg 3, 2025. Review it now." },
        { id: 3, message: "There was a login to your account @tran_tuan23050 from a new device on 17 thg 3, 2025. Review it now." },
        { id: 4, message: "There was a login to your account @tran_tuan23050 from a new device on 16 thg 3, 2025. Review it now." },
        { id: 5, message: "There was a login to your account @tran_tuan23050 from a new device on 15 thg 3, 2025. Review it now." },
    ];

    return (

        <div className="w-2/3 p-4 border-r border-gray-300 mx-auto">
            <h2 className="text-xl font-bold mb-4">Thông báo</h2>
            <div className="mt-4 space-y-3 hover:cursor-pointer">
                {notifications.map((notif) => (
                    <div key={notif.id} className="flex items-center p-3 border-b">
                        <span className="text-2xl mr-3">❌</span>
                        <p className="text-sm text-gray-700">{notif.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationFeed;
