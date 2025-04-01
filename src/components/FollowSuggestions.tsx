import { useEffect, useState } from "react";
import { getSuggestedUsers } from "@/api/user";
import { IUser } from "@/types/auth";

const FollowSuggestions: React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getSuggestedUsers();
                setUsers(Array.isArray(data) ? data : []); // Kiểm tra data có phải mảng không
            } catch (error) {
                console.error("Error fetching users:", error);
                setUsers([]); // Gán mảng rỗng nếu có lỗi
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="w-80 bg-white p-5 shadow-md rounded-md mx-2 mb-2">
            <div className="rounded-lg p-4">
                <h3 className="font-bold text-lg mb-3">Gợi ý theo dõi</h3>
                {Array.isArray(users) && users.length > 0 ? (
                    users.map((user) => (
                        <div key={user._id} className="flex items-center justify-between w-full mb-3">
                            <div className="flex items-center space-x-3">
                                <img
                                    src={user.profilePicture || "/default-avatar.png"} 
                                    alt={user.displayName}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <h4 className="font-semibold">{user.displayName}</h4>
                                    <p className="text-gray-500 text-sm">@{user.username}</p>
                                </div>
                            </div>
                            <button className="flex-shrink-0 bg-black text-white px-4 py-1 rounded-full hover:bg-blue-500 hover:cursor-pointer">
                                Theo dõi
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Không có gợi ý nào.</p>
                )}
            </div>
        </div>
    );
};

export default FollowSuggestions;
