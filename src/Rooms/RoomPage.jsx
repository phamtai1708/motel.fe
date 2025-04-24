import MainMenu from "../Components/MainMenu";
import Footer from "../Components/Footer";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Card from "../Components/Card.jsx";
import banner from "../Data/banner.PNG"; // Assuming this is the vertical banner

// Functional Filter Dropdown Component
const FilterDropdown = ({ label, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(label); // State to show selected option
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelectedLabel(option); // Update button label
    setIsOpen(false); // Close dropdown after selection
    // Add logic here to actually filter results based on the selected option
    console.log("Selected:", option);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}> 
      <button 
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 whitespace-nowrap"
      >
        {selectedLabel} {/* Display selected option or default label */}
        <span className={`material-symbols-outlined text-sm ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-56 mt-1 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg right-0 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <ul className="py-1 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <li key={option}>
                <button
                  onClick={() => handleSelect(option)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const vietnameseProvinces = [
  "Toàn quốc", "Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "An Giang", "Bà Rịa - Vũng Tàu", 
  "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", 
  "Bình Phước", "Bình Thuận", "Cà Mau", "Cần Thơ", "Cao Bằng", "Đắk Lắk", "Đắk Nông", 
  "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Tĩnh", 
  "Hải Dương", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", 
  "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An", 
  "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", 
  "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", 
  "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", 
  "Vĩnh Phúc", "Yên Bái"
];

// Verified Toggle Component
const VerifiedToggle = () => {
  const [isVerifiedOnly, setIsVerifiedOnly] = useState(false);

  const handleToggle = () => {
    setIsVerifiedOnly(!isVerifiedOnly);
    // Add logic here to filter based on verified status
    console.log("Verified Only Toggled:", !isVerifiedOnly);
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center px-3 py-1.5 rounded-md border border-gray-300 cursor-pointer transition-colors duration-200 ease-in-out ${isVerifiedOnly ? 'bg-green-50 border-green-200' : 'bg-white hover:bg-gray-50'}`}
      role="switch"
      aria-checked={isVerifiedOnly}
    >
      <span className={`material-symbols-outlined mr-2 transition-colors ${isVerifiedOnly ? 'text-green-600' : 'text-gray-400'}`}>
        verified_user
      </span>
      <span className={`text-sm font-medium mr-3 transition-colors ${isVerifiedOnly ? 'text-green-700' : 'text-gray-600'}`}>
        Tin xác thực
      </span>
      {/* Toggle Switch Track */}
      <div className={`relative h-5 rounded-full w-9 transition-colors duration-200 ease-in-out ${isVerifiedOnly ? 'bg-green-500' : 'bg-gray-300'}`}>
        {/* Toggle Switch Circle */}
        <span 
          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ease-in-out ${isVerifiedOnly ? 'left-4.5' : 'left-0.5'}`}
        />
      </div>
    </button>
  );
};

function RoomPage() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
      const fetchRooms = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/v1/rooms"
          );
          const newData = response.data.data.slice(0, 8);
          setRooms(newData);
        } catch (error) {
          console.error("Error fetching rooms:", error);
        }
      };
  
      fetchRooms();
    }, []);

  return (
    <>
      <MainMenu />
      <div className="w-[80rem] m-auto pt-28 pb-12"> {/* Added top padding */}
        {/* Search Bar - Keeping the previous style */}
        <div className="mb-6">
          <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg shadow-inner">
            <div className="flex items-center flex-grow bg-white rounded-md px-4 py-2 border border-gray-200">
              <span className="material-symbols-outlined text-gray-400 mr-3">
                search
              </span>
              <input
                type="text"
                placeholder="Tìm kiếm theo địa chỉ, quận, thành phố..."
                className="flex-grow outline-none placeholder-gray-400 text-gray-700"
              />
              {/* Province Dropdown */}
              <div className="border-l border-gray-200 pl-3 ml-3">
                <FilterDropdown 
                  label="Hà Nội" // Default label
                  options={vietnameseProvinces} 
                />
              </div>
            </div>
            <button className="bg-red-500 text-white font-medium px-6 py-2 rounded-md hover:bg-red-600 transition-colors">
              Tìm kiếm
            </button>
            <button className="bg-teal-500 text-white font-medium px-6 py-2 rounded-md flex items-center gap-2 hover:bg-teal-600 transition-colors">
              <span className="material-symbols-outlined">map</span>
              Xem bản đồ
            </button>
          </div>
        </div>

        {/* Main Content Area with Sidebar */}
        <div className="flex gap-6">
          {/* Left Column (Filters, Banner, Cards) */}
          <div className="w-[calc(100%-280px)] flex flex-col gap-6">
            {/* Top Filter Bar */} 
            <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
              <FilterDropdown label="Loại nhà đất" options={["Nhà riêng", "Biệt thự", "Căn hộ", "Văn phòng", "Nhà mặt phố", "Đất nền", "Đất nông nghiệp"]} />
              <FilterDropdown label="Mức giá" options={["Dưới 3 triệu", "3-5 triệu", "5-7 triệu", "7-10 triệu", "10-15 triệu","15-20 triệu","20-25 triệu","25-30 triệu","Trên 30 triệu"]} />
              <FilterDropdown label="Diện tích" options={["Dưới 20 m²", "20-30 m²", "30-50 m²", "50-70 m²", "Trên 70 m²"]} />
              <VerifiedToggle />
              {/* Add more filters/toggles as needed */}
              <button className="ml-auto text-sm text-gray-600 hover:text-red-500">Xóa lọc</button>
            </div>

            {/* Title and Info */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h1 className="text-xl font-semibold text-gray-800 mb-2">Cho thuê căn hộ chung cư trên toàn quốc</h1>
              <p className="text-sm text-gray-500">Tìm thấy {rooms.length} kết quả</p>
              {/* Add sorting options if needed */}
            </div>

            <div className="flex gap-6 items-start">
               {/* Left Vertical Banner - Sticky */}
               <div className="w-[160px] flex-shrink-0 sticky top-28">
                 <img src={banner} alt="Quảng cáo" className="w-full rounded-lg shadow" />
               </div>

               {/* Property Listing */} 
               <div className="flex-grow flex flex-col gap-6">
                 {rooms.map((item) => (
                   <Card item={item} key={item.landId} />
                 ))}
                 <button>Hiển thị thêm</button>
               </div>
            </div>
            {/* Pagination would go here */}
          </div>

          {/* Right Sidebar (Filters) */}
          <div className="w-[280px] flex-shrink-0">
            <div className="sticky top-28 flex flex-col gap-6">
              {/* Filter Section Placeholder */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                <h3 className="font-semibold mb-3 border-b pb-2 text-gray-700">Lọc theo khoảng giá</h3>
                {/* Price filter options */}
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Dưới 3 triệu</li>
                  <li>3-5 triệu</li>
                  <li>5-7 triệu</li>
                  <li>7-10 triệu</li>
                  <li>10-15 triệu</li>
                  <li>15-20 triệu</li>
                  <li>20-25 triệu</li>
                  <li>25-30 triệu</li>
                  <li>Trên 30 triệu</li>
                </ul>
              </div>

              {/* Filter Section Placeholder */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                <h3 className="font-semibold mb-3 border-b pb-2 text-gray-700">Lọc theo diện tích</h3>
                {/* Area filter options */}
                 <ul className="space-y-2 text-sm text-gray-600">
                  <li>Dưới 20 m²</li>
                  <li>20-30 m²</li>
                  <li>30-50 m²</li>
                  <li>50-70 m²</li>
                  <li>Trên 70 m²</li>
                </ul>
              </div>

              {/* Filter Section Placeholder */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                <h3 className="font-semibold mb-3 border-b pb-2 text-gray-700">Lọc theo số phòng ngủ</h3>
                {/* Room filter options */}
                 <ul className="space-y-2 text-sm text-gray-600">
                  <li>1 phòng ngủ</li>
                  <li>2 phòng ngủ</li>
                  <li>3 phòng ngủ</li>
                  <li>4 phòng ngủ</li>
                  <li>5 phòng ngủ</li>
                  <li>6 phòng ngủ</li>
                  <li>Nhiều hơn 6 phòng ngủ</li>
               
                  {/* ... more options */}
                </ul>
              </div>
              <div>

              </div>
               {/* Add more filter sections as needed */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RoomPage;
