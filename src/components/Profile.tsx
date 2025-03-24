import React, { useState } from "react";

const Profile = () => {
  const user = {
    name: "Tuấn Lâm Trần",
    username: "@tran_tuan23050",
    joined: "Tháng 3 năm 2025",
    following: 2,
    followers: 0,
    avatar: "https://via.placeholder.com/100",
    cover: "https://via.placeholder.com/600x200",
  };

  const [posts, setPosts] = useState([
    { id: 1, content: "Đây là bài viết đầu tiên của tôi!", date: "24 Tháng 3, 2025" },
    { id: 2, content: "Chào mọi người!", date: "22 Tháng 3, 2025" },
  ]);

  return (
    <div className="max-w-2xl mx-auto w-full bg-gray-200">
      {/* Cover Photo */}
      <div className="relative">
        <img src={user.cover} alt="Cover" className="w-full h-48 object-cover bg-gray-300" />
        <div className="absolute -bottom-12 left-4 border-4 border-white rounded-full">
          <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full bg-gray-400" />
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-4 mt-12">
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-500">{user.username}</p>
        <p className="text-gray-500 text-sm">📅 Tham gia {user.joined}</p>

        {/* Follow Info */}
        <div className="flex space-x-4 mt-2 text-gray-700">
          <p><span className="font-bold">{user.following}</span> Đang theo dõi</p>
          <p><span className="font-bold">{user.followers}</span> Người theo dõi</p>
        </div>

        {/* Edit Profile Button */}
        <button className="mt-2 px-4 py-1 border rounded-full text-sm font-medium hover:bg-gray-200">
          Chỉnh sửa hồ sơ
        </button>
      </div>

      {/* Posts Section */}
      <div className="border-t mt-4 bg-white">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="p-4 border-b">
              <p className="text-gray-800">{post.content}</p>
              <p className="text-gray-500 text-sm mt-1">{post.date}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 p-4">Chưa có bài viết nào.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
