const RightSidebar = () => {
  const suggestedUsers = [
    {
      name: "Elon Musk",
      username: "@elonmusk",
      avatar: "https://source.unsplash.com/40x40/?man",
    },
    {
      name: "Bill Gates",
      username: "@BillGates",
      avatar: "https://source.unsplash.com/40x40/?tech",
    },
    {
      name: "BBC News (World)",
      username: "@BBCWorld",
      avatar: "https://source.unsplash.com/40x40/?news",
    },
  ];

  return (
    <div className="w-80 bg-white p-5 shadow-md rounded-md mx-2 mb-2">
      <div className="rounded-lg p-4">
        <h3 className="font-bold text-lg mb-3">Gợi ý theo dõi</h3>
        {suggestedUsers.map((user, index) => (
          <div key={index} className="flex items-center justify-between w-full mb-3">
            <div className="flex items-center space-x-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h4 className="font-semibold">{user.name}</h4>
                <p className="text-gray-500 text-sm">{user.username}</p>
              </div>
            </div>
            <button className="flex-shrink-0 bg-black text-white px-4 py-1 rounded-full hover:bg-blue-500 hover:cursor-pointer">
              Theo dõi
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;
