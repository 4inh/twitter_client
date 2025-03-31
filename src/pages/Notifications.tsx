import NotificationFeed from "../components/NotificationFeed";
import RightSidebar from "../components/RightSidebar";

const Notifications = () => {
    return (
        <div className="flex flex-1">
            <NotificationFeed />
            <RightSidebar />
        </div>
    );
};

export default Notifications;
