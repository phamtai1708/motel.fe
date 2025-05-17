import MainMenu from "../Components/MainMenu";
import Footer from "../Components/Footer";
import { useState, useEffect } from "react";
import { authService } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import AddLandPopup from "../Components/AddLandPopup";
import axios from "../services/axiosConfig";
import AddRoomPopup from "../Components/AddRoomPopup";

function Chudautu() {
  const [activeTab, setActiveTab] = useState("overview");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddLandPopupOpen, setIsAddLandPopupOpen] = useState(false);
  const navigate = useNavigate();
  const [landsList, setLandsList] = useState([]);
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [selectedLandId, setSelectedLandId] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);
  const [totalLands, setTotalLands] = useState(0);
  const [totalRooms, setTotalRooms] = useState(0);
  const [landStats, setLandStats] = useState({
    totalLands: 0,
    availableLands: 0,
    totalPrice: 0,
    availablePrice: 0
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    if (!user || !user.userId || !token) {
      setError("Bạn chưa đăng nhập. Đang chuyển về trang đăng nhập...");
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      setLoading(false);
      return;
    }
    const fetchUserData = async () => {
      try {
        const response = await authService.getUserData(user.userId);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    const fetchLands = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?.userId) {
        try {
          const response = await axios.get(`/lands/findLandOfUser/${user.userId}`);
          const landsData = response.data.data || [];
          setLandsList(landsData);
          setTotalLands(landsData.length);
          
          // Tính toán thống kê
          const stats = landsData.reduce((acc, land) => {
            const price = Number(land.price) || 0;
            acc.totalPrice += price;
            if (land.status === 'Còn trống') {
              acc.availableLands += 1;
              acc.availablePrice += price;
            }
            return acc;
          }, {
            totalLands: landsData.length,
            availableLands: 0,
            totalPrice: 0,
            availablePrice: 0
          });
          
          setLandStats(stats);
        } catch (err) {
          setLandsList([]);
          setTotalLands(0);
          setLandStats({
            totalLands: 0,
            availableLands: 0,
            totalPrice: 0,
            availablePrice: 0
          });
        }
      }
    };
    fetchLands();
  }, []);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(`/rooms/findRoomOfUser/${user.userId}`);
      const roomsData = Array.isArray(response.data) ? response.data : response.data.data || [];
      setRooms(roomsData);
      setTotalRooms(roomsData.length);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setRooms([]);
      setTotalRooms(0);
    }
  };

  const handleRoomSubmit = async () => {
    await fetchRooms();
  };

  const menuItems = [
    {
      key: "overview",
      label: "Tổng quan",
      icon: (
        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6m-6 0v6m0-6H7m6 0h6" /></svg>
      ),
    },
    {
      key: "lands",
      label: "Nhà trọ",
      icon: (
        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10l9-7 9 7v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8z" /></svg>
      ),
    },
    {
      key: "rooms",
      label: "Phòng trọ",
      icon: (
        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4 4 4-4m0 0V3m0 14H4" /></svg>
      ),
    },
    {
      key: "posts",
      label: "Bài đăng",
      icon: (
        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2 2 2h4a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>
      ),
    },
  ];

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="text-center py-12">
          <p className="text-blue-600">{error}</p>
        </div>
      );
    }
    switch (activeTab) {
      case "overview":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow flex items-center border border-gray-100">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10l9-7 9 7v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8z" /></svg>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Tổng số nhà trọ</div>
                <div className="text-2xl font-bold text-blue-500">{totalLands}</div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow flex items-center border border-gray-100">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4 4 4-4m0 0V3m0 14H4" /></svg>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Tổng số phòng trọ</div>
                <div className="text-2xl font-bold text-green-500">{totalRooms}</div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow flex items-center border border-gray-100">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2 2 2h4a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Tổng số bài đăng</div>
                <div className="text-2xl font-bold text-yellow-500">{userData?.posts?.length || 0}</div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow flex items-center border border-gray-100">
              <div className="bg-orange-100 p-3 rounded-full mr-4">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 0h-1v4h-1m-4 0h-1v-4h-1" /></svg>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Tổng số lượt xem</div>
                <div className="text-2xl font-bold text-orange-500">{userData?.totalViews || 0}</div>
              </div>
            </div>
          </div>
        );
      case "lands":
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Danh sách nhà trọ</h2>
              <button
                onClick={() => setIsAddLandPopupOpen(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Thêm nhà trọ mới
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 bg-white rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-sm">
                    <th className="px-3 py-2 border">STT</th>
                    <th className="px-3 py-2 border">LandId</th>
                    <th className="px-3 py-2 border">Địa chỉ</th>
                    <th className="px-3 py-2 border">Giá</th>
                    <th className="px-3 py-2 border">Tình trạng</th>
                    <th className="px-3 py-2 border"></th>
                  </tr>
                </thead>
                <tbody>
                  {landsList.length > 0 ? (
                    landsList.map((land, idx) => (
                      <>
                        <tr key={land._id} className="text-center text-sm border-t">
                          <td className="px-3 py-2 border">{idx + 1}</td>
                          <td className="px-3 py-2 border">{land._id}</td>
                          <td className="px-3 py-2 border text-left">{land.address}</td>
                          <td className="px-3 py-2 border">{Number(land.price).toLocaleString('vi-VN')} VNĐ</td>
                          <td className="px-3 py-2 border">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              land.status === 'Còn trống' 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {land.status || 'Còn trống'}
                            </span>
                          </td>
                          <td className="px-3 py-2 border">
                            <button 
                              onClick={() => setExpandedItem(expandedItem === land._id ? null : land._id)}
                              className="text-blue-500 hover:underline"
                            >
                              {expandedItem === land._id ? 'Ẩn chi tiết' : 'Xem chi tiết'}
                            </button>
                          </td>
                        </tr>
                        {expandedItem === land._id && (
                          <tr>
                            <td colSpan={6} className="px-4 py-4 bg-gray-50">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium text-gray-700 mb-2">Thông tin chi tiết</h4>
                                  <div className="space-y-2">
                                    <p><span className="font-medium">Địa chỉ:</span> {land.address}</p>
                                    <p><span className="font-medium">Giá:</span> {Number(land.price).toLocaleString('vi-VN')} VNĐ</p>
                                    <p><span className="font-medium">Số phòng:</span> {land.room || 0}</p>
                                    <p><span className="font-medium">Số nhà vệ sinh:</span> {land.toilet || 0}</p>
                                    <p><span className="font-medium">Số điều hòa:</span> {land.air || 0}</p>
                                    <p><span className="font-medium">Số giường:</span> {land.bed || 0}</p>
                                    <p><span className="font-medium">Số tủ quần áo:</span> {land.wardrobe || 0}</p>
                                    <p><span className="font-medium">Nước:</span> {land.water ? 'Có' : 'Không'}</p>
                                    <p><span className="font-medium">Chung chủ:</span> {land.chdv ? 'Có' : 'Không'}</p>
                                    <p><span className="font-medium">Mô tả:</span> {land.description || 'Chưa có mô tả'}</p>
                                    <p><span className="font-medium">Ngày tạo:</span> {new Date(land.createdAt).toLocaleDateString('vi-VN')}</p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-700 mb-2">Hình ảnh</h4>
                                  <div className="grid grid-cols-3 gap-2">
                                    {land.images?.map((image, index) => (
                                      <img 
                                        key={index}
                                        src={image}
                                        alt={`Hình ảnh ${index + 1}`}
                                        className="w-full h-24 object-cover rounded"
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-gray-500">Không có nhà trọ nào.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "rooms":
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Danh sách phòng trọ</h2>
              {landsList.length > 0 ? (
                <button
                  onClick={() => {
                    setSelectedLandId(landsList[0]._id);
                    setIsAddRoomOpen(true);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Thêm phòng trọ mới
                </button>
              ) : (
                <button
                  onClick={() => setIsAddLandPopupOpen(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Thêm nhà trọ mới
                </button>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 bg-white rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-sm">
                    <th className="px-3 py-2 border">STT</th>
                    <th className="px-3 py-2 border">RoomId</th>
                    <th className="px-3 py-2 border">Địa chỉ</th>
                    <th className="px-3 py-2 border">Giá</th>
                    <th className="px-3 py-2 border">Tình trạng</th>
                    <th className="px-3 py-2 border"></th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(rooms) && rooms.length > 0 ? (
                    rooms.map((room, idx) => (
                      <>
                        <tr key={room.roomId || room._id} className="text-center text-sm border-t">
                          <td className="px-3 py-2 border">{idx + 1}</td>
                          <td className="px-3 py-2 border">{room.roomId || room._id}</td>
                          <td className="px-3 py-2 border text-left">{room.address}</td>
                          <td className="px-3 py-2 border">{Number(room.price).toLocaleString('vi-VN')} VNĐ</td>
                          <td className="px-3 py-2 border">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              room.status === 'Còn trống' 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {room.status || 'Còn trống'}
                            </span>
                          </td>
                          <td className="px-3 py-2 border">
                            <button 
                              onClick={() => setExpandedItem(expandedItem === (room.roomId || room._id) ? null : (room.roomId || room._id))}
                              className="text-blue-500 hover:underline"
                            >
                              {expandedItem === (room.roomId || room._id) ? 'Ẩn chi tiết' : 'Xem chi tiết'}
                            </button>
                          </td>
                        </tr>
                        {expandedItem === (room.roomId || room._id) && (
                          <tr>
                            <td colSpan={6} className="px-4 py-4 bg-gray-50">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium text-gray-700 mb-2">Thông tin chi tiết</h4>
                                  <div className="space-y-2">
                                    <p><span className="font-medium">Mô tả:</span> {room.description || 'Chưa có mô tả'}</p>
                                    <p><span className="font-medium">VSKK:</span> {room.vskk ? 'Có' : 'Không'}</p>
                                    <p><span className="font-medium">VSC:</span> {room.vskk ? '-' : room.vsc || 0}</p>
                                    <p><span className="font-medium">Số giường:</span> {room.bed || 0}</p>
                                    <p><span className="font-medium">Số phòng ngủ:</span> {room.bedroom || 0}</p>
                                    <p><span className="font-medium">Tủ quần áo:</span> {room.wardrobe ? 'Có' : 'Không'}</p>
                                    <p><span className="font-medium">Điều hòa:</span> {room.air ? 'Có' : 'Không'}</p>
                                    <p><span className="font-medium">Nước:</span> {room.water ? 'Có' : 'Không'}</p>
                                    <p><span className="font-medium">Ngày tạo:</span> {new Date(room.createdAt).toLocaleDateString('vi-VN')}</p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-700 mb-2">Hình ảnh</h4>
                                  <div className="grid grid-cols-3 gap-2">
                                    {room.images?.map((image, index) => (
                                      <img 
                                        key={index}
                                        src={image}
                                        alt={`Hình ảnh ${index + 1}`}
                                        className="w-full h-24 object-cover rounded"
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-gray-500">
                        {landsList.length > 0 ? (
                          <>
                            <p className="mb-2">Không có phòng trọ nào.</p>
                            <button
                              onClick={() => {
                                setSelectedLandId(landsList[0]._id);
                                setIsAddRoomOpen(true);
                              }}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Thêm phòng trọ mới
                            </button>
                          </>
                        ) : (
                          <>
                            <p className="mb-2">Bạn cần tạo nhà trọ trước khi thêm phòng trọ.</p>
                            <button
                              onClick={() => setIsAddLandPopupOpen(true)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Thêm nhà trọ mới
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "posts":
        return (
          <div className="space-y-6">
            {userData?.posts?.length > 0 ? (
              userData.posts.map((post) => (
                <div key={post._id} className="bg-white p-6 rounded-2xl shadow flex justify-between items-center border border-gray-100">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                    <p className="text-gray-600 mt-2">{post.content}</p>
                  </div>
                  <Link
                    to={`/posts/${post._id}`}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">Bạn chưa có bài đăng nào.</p>
                <Link
                  to="/posts/create"
                  className="mt-4 inline-block text-yellow-500 hover:text-yellow-700"
                >
                  Tạo bài đăng mới
                </Link>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const handleAddLand = async (formData) => {
    try {
      // Here you would typically make an API call to save the new land
      console.log('Form data:', formData);
      // After successful save, you might want to refresh the user data
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await authService.getUserData(user.userId);
      setUserData(response.data);
    } catch (error) {
      console.error('Error adding new land:', error);
      throw error;
    }
  };

  return (
    <>
      <MainMenu />
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 fixed h-[calc(100vh-5rem)] mt-20 bg-white shadow-lg border-r border-gray-100 flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center px-6 py-8">
                <svg className="w-8 h-8 text-blue-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10l9-7 9 7v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8z" /></svg>
                <span className="text-xl font-bold text-gray-800 tracking-wide">Phongtro84vh</span>
              </div>
              <nav className="space-y-1 mt-2">
                {menuItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveTab(item.key)}
                    className={`w-full flex items-center text-left px-6 py-3 rounded-lg transition-colors duration-200 font-medium text-base focus:outline-none ${
                      activeTab === item.key
                        ? "bg-blue-50 text-blue-600 shadow"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
            <div className="flex justify-center pb-6">
              <button className="w-12 h-12 rounded-full bg-gray-100 text-blue-500 flex items-center justify-center shadow hover:bg-blue-50 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              </button>
            </div>
          </div>
          {/* Main Content */}
          <div className="mt-20 ml-64 flex-1 p-8">
            <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">
              {renderTabContent()}
            </div>
            
            {/* Thống kê chi tiết */}
            <div className="mt-8 bg-white p-6 rounded-2xl shadow border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Thống kê chi tiết nhà trọ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Tổng số nhà trọ:</span>
                    <span className="font-semibold text-blue-600">{landStats.totalLands}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Số nhà trọ còn trống:</span>
                    <span className="font-semibold text-green-600">{landStats.availableLands}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Tổng giá trị nhà trọ:</span>
                    <span className="font-semibold text-blue-600">{landStats.totalPrice.toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Tổng giá trị nhà trọ còn trống:</span>
                    <span className="font-semibold text-green-600">{landStats.availablePrice.toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="h-64 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">{Math.round((landStats.availableLands / landStats.totalLands) * 100 || 0)}%</div>
                      <div className="text-gray-600">Tỷ lệ nhà trọ còn trống</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <AddLandPopup
        isOpen={isAddLandPopupOpen}
        onClose={() => setIsAddLandPopupOpen(false)}
        onSubmit={handleAddLand}
      />
      <AddRoomPopup
        isOpen={isAddRoomOpen}
        onClose={() => setIsAddRoomOpen(false)}
        onSubmit={handleRoomSubmit}
        landId={selectedLandId}
      />
    </>
  );
}

export default Chudautu;
