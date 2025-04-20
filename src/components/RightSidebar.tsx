import { PostContext } from "@/context/post/PostContext";
import { useContext } from "react";

const RightSidebar = () => {
    const { topTags } = useContext(PostContext);

    return (
        <div className="w-80 bg-white border-l  min-h-screen relative">
            <div className="sticky top-0 left-0 right-0  p-5">
                <h3 className="text-lg font-bold mb-3">
                    Những điều đang diễn ra
                </h3>
                <ul className="">
                    {topTags.map((topTag) => (
                        <li
                            key={topTag._id}
                            className="rounded p-2 hover:bg-gray-100 cursor-pointer"
                        >
                            <span className="font-bold" title={topTag._id}>
                                {topTag._id}
                            </span>
                            <br />
                            {topTag.count} bài đăng
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RightSidebar;
