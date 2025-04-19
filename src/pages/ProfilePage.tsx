import Profile from "../components/Profile";
// import FollowSuggestions from "../components/FollowSuggestions";
import RightSidebar from "../components/RightSidebar";

const ProfilePage = () => {
    return (
        <div className="flex flex-1">
            <Profile />

            <RightSidebar />
        </div>
    );
};

export default ProfilePage;
