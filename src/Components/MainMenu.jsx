import { Link } from 'react-router-dom';
import logo from "../Data/MOTEL.png";

function MainMenu() {
  const cssMenu =
    "relative inline-block pb-2 text-gray-700 transition duration-300 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-red-500 hover:after:w-full after:transition-all after:duration-300";

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="logo phongtro84vh.com"
                className="h-12 w-auto"
              />
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/chu-dau-tu" className={cssMenu}>
                <span className="block text-sm text-gray-500">Chủ đầu tư</span>
                <span className="block text-sm font-medium">Chủ phòng trọ</span>
              </Link>
              <Link to="/nguoi-thue" className={cssMenu}>
                <span className="block text-sm font-medium">Người thuê</span>
              </Link>
              <Link to="/tho" className={cssMenu}>
                <span className="block text-sm font-medium">Thợ</span>
              </Link>
              <Link to="/cua-hang" className={cssMenu}>
                <span className="block text-sm font-medium">Cửa hàng</span>
              </Link>
              <Link to="/ve-chung-toi" className={cssMenu}>
                <span className="block text-sm font-medium">Về chúng tôi</span>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
              </svg>
              <span className="text-sm font-medium">Tải ứng dụng</span>
            </button>
            
            <button className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
            </button>

            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium">
                Đăng nhập
              </Link>
              <Link to="/register" className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors text-sm font-medium">
                Đăng ký
              </Link>
              <button className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-colors text-sm font-medium">
                Đăng tin
              </button>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainMenu;
