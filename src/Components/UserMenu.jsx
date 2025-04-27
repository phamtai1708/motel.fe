import { useState } from 'react';
import { Link } from 'react-router-dom';

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          {user?.avatar ? (
            <img src={user.avatar} alt="avatar" className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-gray-500">{user?.name?.charAt(0) || 'U'}</span>
          )}
        </div>
        <span className="text-sm font-medium hidden md:block">{user?.name || 'User'}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
          <Link
            to="/thong-tin-tai-khoan"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Thông tin tài khoản
          </Link>
          <Link
            to="/danh-sach-yeu-thich"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Danh sách yêu thích
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu; 