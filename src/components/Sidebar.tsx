import { FaTwitter } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { GoBell } from "react-icons/go";
import { MdMailOutline } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 h-screen bg-white shadow-md z-10  box-border overflow-y-auto overflow-x-hidden p-5" >
      <ul className="space-y-4 " >

        <li className="w-[275px] font-bold text-xl flex items-center cursor-pointer"
          onClick={() => navigate("/home")}>
          <FaTwitter className="text-blue-500 w-10 h-10" />
        </li>

        <li className="w-[275px] font-bold text-xl flex items-center mt-8 cursor-pointer"
          onClick={() => navigate("/home")} >
          <AiFillHome className="w-8 h-8 mr-5" />
          <span >Trang chủ</span>
        </li>

        <li className="w-[275px] text-xl flex items-center mt-8 cursor-pointer"
          onClick={() => navigate("/explore")}>
          <IoIosSearch className="w-8 h-8 mr-5" /> Khám phá</li>

        <li className="w-[275px] text-xl flex items-center mt-8 cursor-pointer"
        onClick={() => navigate("/notifications")}>
          <GoBell className="w-7 h-7 mr-6" /> Thông báo</li>

        <li className="w-[275px] text-xl flex items-center mt-8 cursor-pointer"
        onClick={() => navigate("/message")}>
          <MdMailOutline className="w-7 h-7 mr-6" /> Tin nhắn</li>

        <li className="w-[275px] text-xl flex items-center mt-8 cursor-pointer"
        onClick={() => navigate("/profile")}>
          <IoPersonOutline className="w-7 h-7 mr-6" /> Hồ sơ</li>
      </ul>

      <button className="text-2xl w-full bg-blue-500 text-white py-2 rounded-full mt-10">
        Đăng
      </button>
    </div>
  );
};

export default Sidebar;
