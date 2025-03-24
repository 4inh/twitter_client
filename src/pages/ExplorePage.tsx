import FollowSuggestions from "../components/FollowSuggestions";
import ExploreFeed from "../components/ExploreFeed";

const ExplorePage = () => {
  return (

    <div className="flex flex-1">
      <ExploreFeed />
      <FollowSuggestions />
    </div>

  );
};

export default ExplorePage;