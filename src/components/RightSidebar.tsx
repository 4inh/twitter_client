import { getTopTags } from "@/api/post";
import { ITopTag } from "@/types/post";
import { useEffect, useState } from "react";

const RightSidebar = () => {
    const [topTags, setTopTags] = useState<ITopTag[]>([]);

    useEffect(() => {
        const fetchTopTags = async () => {
            try {
                const res = await getTopTags();
                setTopTags(res);
            } catch (error) {
                console.log("Error", error);
            }
        };
        fetchTopTags();
    }, []);
    return (
        <div className="w-80 bg-white p-5 shadow-md min-h-screen">
            <h3 className="text-lg font-bold mb-3">Những điều đang diễn ra</h3>
            <ul className="space-y-2">
                {topTags.map((topTag) => (
                    <li key={topTag._id}>
                        {topTag._id} - {topTag.count} bài đăng
                    </li>
                ))}
            </ul>
            <button className="mt-5 w-full bg-blue-500 text-white py-2 rounded-lg">
                Hiển thị thêm
            </button>
        </div>
    );
};

export default RightSidebar;
