import MainMenu from "../Components/MainMenu";
import Footer from "../Components/Footer";
import Breadcrumb from "../Components/Breadcrumb";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../Components/Card";
import { landService } from "../services/landService";
// Removed CSS import since we're using Tailwind

function LandInfo() {
  const { landId } = useParams();
  const [landData, setLandData] = useState(null);
  const [landUserId, setLandUserId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const breadcrumbItems = [
    { label: "Phongtro84vh", link: "/" },
    { label: "Nhà nguyên căn", link: "/lands" },
    { label: "Hà Nội", link: "/lands?city=hanoi" },
    { label: "Hoàng Mai", link: "/lands?district=hoangmai" },
    { label: landData?.address || "" },
  ];

  useEffect(() => {
    const fetchLandInfo = async () => {
      try {
        setLoading(true);
        const data = await landService.getLandById(landId);
        setLandData(data);
        
      } catch (err) {
        setError("Không thể lấy dữ liệu phòng trọ.");
        console.error("Error fetching land info:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLandInfo();
  }, [landId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Đang tải...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-red-600">
        {error}
      </div>
    );
  if (!landData)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-red-600">
        Không tìm thấy dữ liệu phòng trọ
      </div>
    );

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      <MainMenu />
      <Breadcrumb items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-grow lg:w-[calc(100%-320px)]">
            {/* Gallery Section */}
            <div className="mb-6">
              <div className="relative rounded-lg overflow-hidden h-[400px] bg-gray-100 flex items-center justify-center">
                <img
                  src={landData.images[currentImageIndex]}
                  alt={landData.address}
                  className="max-w-full max-h-full object-contain"
                />
                <div className="absolute bottom-3 left-3 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1}/{landData.images.length}
                </div>
                <button className="absolute top-3 right-3 bg-white rounded-full w-9 h-9 flex items-center justify-center shadow-md hover:bg-gray-50">
                  <span className="material-symbols-outlined">
                    favorite_border
                  </span>
                </button>
                <button className="absolute top-3 right-14 bg-white rounded-full w-9 h-9 flex items-center justify-center shadow-md hover:bg-gray-50">
                  <span className="material-symbols-outlined">share</span>
                </button>
                <button className="absolute top-3 right-[100px] bg-white rounded-full w-9 h-9 flex items-center justify-center shadow-md hover:bg-gray-50">
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
              </div>

              <div className="flex gap-2 overflow-x-auto mt-2 pb-2">
                {landData.images.map((image, idx) => (
                  <div
                    key={idx}
                    className={`w-20 h-14 rounded overflow-hidden cursor-pointer bg-gray-100 flex items-center justify-center ${
                      idx === currentImageIndex ? "ring-2 ring-green-500" : ""
                    }`}
                    onClick={() => handleThumbnailClick(idx)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${idx + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Land Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4">
                <h1 className="text-xl font-semibold text-gray-800 mb-2 leading-snug">
                  {landData.address}
                </h1>
                <div className="text-sm text-gray-600 mb-4">
                  <span className="author">{landData.userId}</span>
                </div>
              </div>

              <div className="flex items-center mb-6 gap-6">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-red-600">
                    {formatPrice(landData.price || 4800000)}
                  </span>
                  <span className="text-gray-600 ml-1">/tháng</span>
                </div>
                <div className="flex items-baseline border-l border-gray-300 pl-6">
                  <span className="text-lg font-bold text-gray-800">
                    {landData.area || 25}
                  </span>
                  <span className="text-gray-600 ml-1">m²</span>
                </div>
                <div className="flex items-baseline border-l border-gray-300 pl-6">
                  <span className="text-lg font-bold text-gray-800">
                    4
                  </span>
                  <span className="text-gray-600 ml-1">tầng</span>
                </div>
                <div className="flex items-baseline border-l border-gray-300 pl-6">
                  <span className="text-lg font-bold text-gray-800">
                    {landData.room}
                  </span>
                  <span className="text-gray-600 ml-1">phòng ngủ</span>
                </div>
              </div>

              <div className="flex items-start mb-6 gap-2">
                <span className="material-symbols-outlined text-gray-600">
                  location_on
                </span>
                <p className="text-gray-800 leading-relaxed text-sm">
                  {landData.address ||
                    "203, Đường Nguyễn Văn Nghi, Phường 12, Quận Gò Vấp, TP. Hồ Chí Minh"}
                </p>
              </div>

              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md">
                  <span className="material-symbols-outlined text-green-600">
                    home
                  </span>
                  <p className="text-sm">Gần mặt đường lớn</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600 mb-1">Diện tích</span>
                  <span className="text-base text-gray-800 font-medium">
                    {landData.area || 25} m²
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600 mb-1">
                    Tình trạng nội thất
                  </span>
                  <span className="text-base text-gray-800 font-medium">
                    Nội thất cao cấp
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600 mb-1">
                    Số tiền cọc
                  </span>
                  <span className="text-base text-gray-800 font-medium">
                    {formatPrice(landData.price || 4800000)} đồng
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Mô tả chi tiết
                </h2>
                <div
                  className={`${
                    showFullDescription ? "max-h-[1000px]" : "max-h-[200px]"
                  } overflow-hidden transition-all duration-300`}
                >
                  <p className="font-semibold text-red-600 mb-2">
                    🎉 Kỳ Hè 12 tháng: Giảm 50% tháng đầu, Free 100% tháng 12
                  </p>
                  <p className="font-semibold text-red-600 mb-2">
                    "PHONGTRO84VH FULL NỘI THẤT - GẦN SÀN GOÓC - GIÁ 
                    CHỈ {formatPrice(landData.price || 4800000)} /THÁNG! 🔥"
                  </p>
                  <p className="mb-2 leading-relaxed">
                    📍 {landData.address}
                  </p>
                  <p className="mb-2 leading-relaxed">
                    👨‍👩‍👧‍👦 Quản lý: {landData.userId} (hẹn xem sau 12:00)
                  </p>
                  <p className="mb-2 leading-relaxed">
                    🏠 Gần chợ (800m), siêu thị (1.2km) - Đủ mọi tiện ích thiết yếu
                  </p>
                </div>

                {!showFullDescription && (
                  <button
                    className="text-green-600 font-medium mt-3 hover:underline"
                    onClick={() => setShowFullDescription(true)}
                  >
                    Xem thêm
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-[320px] lg:sticky lg:top-6 lg:self-start">
            <div className="bg-white rounded-lg shadow-md p-5 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Lê Tuấn Anh"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-0.5">
                    Lê Tuấn Anh
                  </h3>
                  <p className="text-green-600 text-xs flex items-center">
                    Đã xác minh
                  </p>
                </div>
              </div>

              <div className="mb-4 text-xs text-gray-600 leading-relaxed">
                <p>Đúng giá! Tuyệt đẹp! • Chính chủ 77%</p>
                <p>📅 Sử dụng: 6 năm • Hiện vẫn đang nhận </p>
              </div>

              <div className="flex flex-col gap-3 mb-4">
                <button className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4 rounded-md font-medium hover:bg-green-700 transition-colors">
                  <span className="material-symbols-outlined">call</span>
                  087242 ***
                </button>
                <button className="flex items-center justify-center gap-2 bg-white text-gray-800 border border-gray-300 py-3 px-4 rounded-md font-medium hover:bg-gray-50 transition-colors">
                  <span className="material-symbols-outlined">chat</span>
                  Chat
                </button>
              </div>

              <div className="bg-gray-100 p-4 rounded-md flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Phòng này còn cho thuê không ạ?
                </p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
                  Gửi
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-5">
              <h3 className="font-semibold text-gray-800 mb-4">
                Xem trên bản đồ
              </h3>
              <div className="h-[200px] rounded overflow-hidden">
                <img
                  src="https://via.placeholder.com/400x200"
                  alt="Map"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default LandInfo;
