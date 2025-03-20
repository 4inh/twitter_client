const RightSidebar = () => {
    return (
      <div className="w-80 bg-white p-5 shadow-md min-h-screen">
        <h3 className="text-lg font-bold mb-3">Những điều đang diễn ra</h3>
        <ul className="space-y-2">
          <li>#Tuyệt - 3.214 bài đăng</li>
          <li>#Chudai - 40.2N bài đăng</li>
          <li>Houthi - 125N bài đăng</li>
          <li>#Thôi - 18.8N bài đăng</li>
        </ul>
        <button className="mt-5 w-full bg-blue-500 text-white py-2 rounded-lg">
          Hiển thị thêm
        </button>
      </div>
    );
  };
  
  export default RightSidebar;
  