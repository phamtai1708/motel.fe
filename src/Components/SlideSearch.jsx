import { useState } from 'react';
import { Link } from 'react-router-dom';

function SlideSearch() {
  const [activeTab, setActiveTab] = useState('nha-dat');

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80"
          alt="Real Estate Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Content */}
      <div className="relative max-w-[1200px] mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl mt-10 md:text-5xl font-bold text-white mb-4">
            Tìm kiếm bất động sản
          </h1>
          <p className="text-xl text-white/90">
            Hàng ngàn tin đăng bất động sản mới mỗi ngày
          </p>
        </div>

        {/* Search Tabs */}
        <div className="bg-white rounded-lg shadow-xl p-4">
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setActiveTab('nha-dat')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'nha-dat'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Nhà nguyên căn
            </button>
            <button
              onClick={() => setActiveTab('phong-tro')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'phong-tro'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Phòng trọ
            </button>
            <button
              onClick={() => setActiveTab('can-ho')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'can-ho'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Thợ
            </button>
          </div>

          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Nhập từ khóa tìm kiếm"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="relative">
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Chọn loại bất động sản</option>
                <option value="nha-rieng">Nhà riêng</option>
                <option value="biet-thu">Biệt thự</option>
                <option value="nha-mat-pho">Mặt bằng kinh doanh</option>
                <option value="nha-mat-pho">Căn hộ dịch vụ</option>
                <option value="dat-nen">Phòng trọ</option>
                <option value="dat-nen">Chung cư mini</option>
              </select>
            </div>
            <div className="relative">
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Chọn khu vực</option>
                <option value="ha-noi">Hà Nội</option>
                <option value="ho-chi-minh">Hồ Chí Minh</option>
                <option value="da-nang">Đà Nẵng</option>
                <option value="hai-phong">Hải Phòng</option>
                <option value="can-tho">Cần Thơ</option>
                <option value="hue">Huế</option>
                <option value="nha-trang">Nha Trang</option>
                <option value="vung-tau">Vũng Tàu</option>
                <option value="binh-duong">Bình Dương</option>

              </select>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Tìm kiếm
            </button>
          </div>

          {/* Popular Searches */}
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="text-sm text-gray-500">Tìm kiếm phổ biến:</span>
            <Link to="/search?q=nha-rieng" className="text-sm text-blue-600 hover:text-blue-700">
              Nhà riêng
            </Link>
            <Link to="/search?q=can-ho" className="text-sm text-blue-600 hover:text-blue-700">
              Căn hộ
            </Link>
            <Link to="/search?q=dat-nen" className="text-sm text-blue-600 hover:text-blue-700">
              Đất nền
            </Link>
            <Link to="/search?q=biet-thu" className="text-sm text-blue-600 hover:text-blue-700">
              Biệt thự
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlideSearch;
