// import { User } from "@/types/auth";
// import React, { useState } from "react";

// const Messages = () => {
//     const [friends, setFriends] = useState<User[]>([
//         {
//             id: 1,
//             name: "BTS A.R.M.Y",
//             username: "@BTS_ARMY",
//             avatar: "https://via.placeholder.com/50",
//         },
//     ]);
//     const [selectedChat, setSelectedChat] = useState<User | null>(null);
//     const [message, setMessage] = useState("");

//     return (
//         <div className="flex flex-2 h-screen ">
//             {/* Sidebar */}
//             <div className="w-1/2 border-r p-4 bg-gray-100">
//                 <h2 className="text-xl font-bold mb-4">Tin nhắn</h2>

//                 <input
//                     type="text"
//                     placeholder="Tìm kiếm"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />

//                 {friends.length > 0 ? (
//                     friends.map((friend) => (
//                         <div
//                             key={friend.id}
//                             className={`mt-2 p-3 flex items-center space-x-3 cursor-pointer rounded-full ${
//                                 selectedChat?.id === friend.id
//                                     ? "bg-blue-100"
//                                     : "hover:bg-gray-200"
//                             }`}
//                             onClick={() => setSelectedChat(friend)}
//                         >
//                             <img
//                                 src={friend.avatar}
//                                 alt={friend.name}
//                                 className="w-10 h-10 rounded-full"
//                             />
//                             <div>
//                                 <h4 className="font-semibold">{friend.name}</h4>
//                                 <p className="text-gray-500 text-sm">
//                                     {friend.username}
//                                 </p>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-gray-500 text-center">
//                         Bạn chưa có tin nhắn nào.
//                     </p>
//                 )}
//             </div>

//             {/* Chat area */}
//             <div className="w-3/4 flex flex-col">
//                 {selectedChat ? (
//                     <>
//                         {/* Header */}
//                         <div className="p-4 border-b flex items-center">
//                             <img
//                                 src={selectedChat.avatar}
//                                 alt={selectedChat.name}
//                                 className="w-10 h-10 rounded-full mr-3"
//                             />
//                             <h2 className="text-lg font-semibold">
//                                 {selectedChat.name}
//                             </h2>
//                         </div>

//                         {/* Chat content */}
//                         <div className="flex-1 p-4 overflow-y-auto">
//                             Tin nhắn sẽ hiển thị ở đây...
//                         </div>

//                         {/* Message input */}
//                         <div className="p-4 border-t flex items-center">
//                             <input
//                                 type="text"
//                                 value={message}
//                                 onChange={(e) => setMessage(e.target.value)}
//                                 placeholder="Start a new message"
//                                 className="w-full p-2 border rounded-lg"
//                             />
//                             <button className="ml-3 p-2 bg-blue-500 text-white rounded-lg">
//                                 Send
//                             </button>
//                         </div>
//                     </>
//                 ) : (
//                     <div className="flex-1 flex flex-col justify-center items-center text-gray-500">
//                         <p>Bắt đầu một cuộc trò chuyện mới</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Messages;
