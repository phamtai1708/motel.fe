import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import MainMenu from '../MainMenu';
import Footer from '../Footer';

const FavoriteList = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isLoggedIn) {
        setLoading(false);
        return;
      }

      try {
        const response = await authService.getFavorites();
        setFavorites(response);
        setLoading(false);
        
        // Nếu không có phòng yêu thích, chuyển hướng về trang home sau 2 giây
        if (response.length === 0) {
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      } catch (error) {
        setError('Không thể tải danh sách yêu thích. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [isLoggedIn, navigate]);

  const handleRemoveFavorite = async (roomId) => {
    try {
      await authService.removeFavorite(roomId);
      setFavorites(favorites.filter(room => room._id !== roomId));
    } catch (error) {
      setError('Không thể xóa khỏi danh sách yêu thích. Vui lòng thử lại sau.');
    }
  };

  const renderPropertyCard = (property) => (
    <div
      key={property._id}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-48">
        <img
          src={property.images[0] || 'https://via.placeholder.com/300x200'}
          alt={property.address}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => handleRemoveFavorite(property._id)}
          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-red-100 transition-colors"
        >
          <svg
            className="w-6 h-6 text-red-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {property.address}
        </h3>
        <div className="flex items-center text-gray-600 mb-2">
          <span className="mr-4">
            <svg
              className="w-5 h-5 inline-block mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {property.price.toLocaleString('vi-VN')} VNĐ/tháng
          </span>
          <span>
            <svg
              className="w-5 h-5 inline-block mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            {property.bedroom} phòng ngủ
          </span>
        </div>
        <Link
          to={`/room/${property._id}`}
          className="block w-full text-center bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div>
        <MainMenu />
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <MainMenu />
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <MainMenu />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Danh sách yêu thích</h1>
          </div>

          {!isLoggedIn ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Bạn cần đăng nhập để xem danh sách yêu thích.</p>
              <button
                onClick={() => navigate('/login')}
                className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition-colors"
              >
                Đăng nhập
              </button>
            </div>
          ) : favorites.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Bạn chưa ưa thích căn nhà, căn phòng nào.</p>
              <p className="text-gray-500 mt-2">Đang chuyển về trang chủ...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {favorites.map(room => renderPropertyCard(room))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FavoriteList; 