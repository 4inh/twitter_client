import MainContent from "../components/MainContent";
import RightSidebar from "../components/RightSidebar";

function HomePage() {
    return (

        <div className="flex flex-1">
            <MainContent />

            <RightSidebar />
        </div>

    );
}

export default HomePage;