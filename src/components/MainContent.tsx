const MainContent = () => {
    return (
      <div className="flex-1 bg-white shadow-md p-5">
        <h2 className="text-xl font-bold mb-4">Dành cho bạn</h2>
  
        {/* Form đăng bài */}
        <div className="border-b pb-4 mb-4">
          <textarea
            placeholder="Chuyện gì đang xảy ra?"
            className="w-full p-2 border rounded-lg"
          ></textarea>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
            Đăng
          </button>
        </div>
  
        {/* Bài đăng */}
        <div className="mt-4">
          <h3 className="font-bold">@JAMJAMPICS</h3>
          <p>little prince 👑</p>
          <img
            src="https://your-image-link.com" // Thay bằng link ảnh thực
            alt="Post"
            className="w-full rounded-lg mt-2"
          />
        </div>
      </div>
    );
  };
  
  export default MainContent;
  