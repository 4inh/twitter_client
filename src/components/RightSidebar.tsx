const RightSidebar = () => {
    return (
      <div className="w-80 bg-white p-5 shadow-md rounded-md mx-2 mb-2">
        <h3 className="text-lg font-bold mb-3">Những điều đang diễn ra</h3>
        <ul className="space-y-2">
          <li>#Chínhtrị - 3.214 bài đăng</li>
          <li>#Nhànước - 40.2N bài đăng</li>
          <li>#KhámPha - 125N bài đăng</li>
        </ul>
        <button className="mt-5 w-full bg-blue-500 text-white py-2 rounded-lg">
          Hiển thị thêm
        </button>
      </div>
    );
  };
  
  export default RightSidebar;
  