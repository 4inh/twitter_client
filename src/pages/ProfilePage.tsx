import Profile from "../components/Profile";
import FollowSuggestions from "../components/FollowSuggestions";
import RightSidebar from "../components/RightSidebar";

const ProfilePage = () => {
    return(
        <div className="flex flex-1">
            <Profile/>
          <div className="">
          <FollowSuggestions/>
          <RightSidebar/>
          </div>
        </div>
    )
}

export default ProfilePage