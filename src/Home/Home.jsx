import MainMenu from "../Components/MainMenu";
import Footer from "../Components/Footer";
import SlideSearch from "../Components/SlideSearch";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../Components/Card.jsx";

function Home() {
  const cssMenu =
    "relative inline-flex items-center gap-2 text-gray-600 font-medium hover:text-blue-600 transition duration-300 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-600 hover:after:w-full after:transition-all after:duration-300";

  const [lands, setLands] = useState([]);

  useEffect(() => {
    const fetchLands = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/lands/allLand"
        );
        const newData = response.data.data.slice(0, 8);
        setLands(newData);
      } catch (error) {
        console.error("Error fetching lands:", error);
      }
    };

    fetchLands();
  }, []);
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
      <MainMenu></MainMenu>
      <SlideSearch></SlideSearch>
      
      {/* Nhà nguyên căn section */}
      <div className="w-[80rem] m-auto py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-[2rem] font-lexend font-bold bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text">
              Nhà nguyên căn
            </h1>
            <p className="text-gray-500 mt-2">Khám phá những căn nhà phù hợp với bạn</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-12 h-12 rounded-full bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 border border-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-5 m-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
                />
              </svg>
            </button>
            <button className="w-12 h-12 rounded-full bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 border border-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-5 m-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
                />
              </svg>
            </button>
            <button className={cssMenu}>
              Xem tất cả
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {lands.map((item) => (
            <Card item={item} key={item.landId} />
          ))}
        </div>
      </div>

      {/* Phòng trọ section */}
      <div className="w-[80rem] m-auto py-12 bg-gradient-to-b from-transparent to-gray-50">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-[2rem] font-lexend font-bold bg-gradient-to-r from-orange-600 to-pink-600 text-transparent bg-clip-text">
              Phòng trọ
            </h1>
            <p className="text-gray-500 mt-2">Tìm kiếm phòng trọ phù hợp với bạn</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-12 h-12 rounded-full bg-gray-50 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 border border-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-5 m-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
                />
              </svg>
            </button>
            <button className="w-12 h-12 rounded-full bg-gray-50 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 border border-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-5 m-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
                />
              </svg>
            </button>
            <button className={`${cssMenu} hover:text-orange-600 after:bg-orange-600`}>
              Xem tất cả
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {rooms.map((item) => (
            <Card item={item} key={item.roomId} />
          ))}
        </div>
      </div>

      {/* Thợ section */}
      <div className="w-[80rem] m-auto py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-[2rem] font-lexend font-bold bg-gradient-to-r from-green-600 to-teal-600 text-transparent bg-clip-text">
              Thợ
            </h1>
            <p className="text-gray-500 mt-2">Đội ngũ thợ chuyên nghiệp, tận tâm</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-12 h-12 rounded-full bg-gray-50 hover:bg-green-50 hover:text-green-600 transition-all duration-300 border border-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-5 m-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
                />
              </svg>
            </button>
            <button className="w-12 h-12 rounded-full bg-gray-50 hover:bg-green-50 hover:text-green-600 transition-all duration-300 border border-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-5 m-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
                />
              </svg>
            </button>
            <button className={`${cssMenu} hover:text-green-600 after:bg-green-600`}>
              Xem tất cả
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Service Introduction Section */}
      <div className="w-full bg-gray-50/50 py-16">
        <div className="w-[80rem] m-auto">
          <div className="grid grid-cols-4 gap-8">
            {/* Bất động sản bán */}
            <div className="group">
              <div className="bg-white p-6 rounded-2xl shadow-lg shadow-gray-100/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="w-16 h-16 rounded-xl bg-red-50 flex items-center justify-center mb-6 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Bất động sản bán</h3>
                <p className="text-gray-500 leading-relaxed">
                  Bạn có thể tìm thấy ngôi nhà mơ ước hoặc cơ hội đầu tư hấp dẫn thông qua lượng tin rao lớn, uy tín về các loại hình bất động sản bán tại Việt Nam.
                </p>
              </div>
            </div>

            {/* Bất động sản cho thuê */}
            <div className="group">
              <div className="bg-white p-6 rounded-2xl shadow-lg shadow-gray-100/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center mb-6 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Bất động sản cho thuê</h3>
                <p className="text-gray-500 leading-relaxed">
                  Cập nhật thường xuyên và đầy đủ các loại hình bất động sản cho thuê như: thuê phòng trọ, nhà riêng, văn phòng.
                </p>
              </div>
            </div>

            {/* Đánh giá dự án */}
            <div className="group">
              <div className="bg-white p-6 rounded-2xl shadow-lg shadow-gray-100/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="w-16 h-16 rounded-xl bg-violet-50 flex items-center justify-center mb-6 text-violet-500 group-hover:bg-violet-500 group-hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Đánh giá dự án</h3>
                <p className="text-gray-500 leading-relaxed">
                  Các video đánh giá tổng quan dự án cung cấp góc nhìn khách quan của các chuyên gia về những dự án nổi bật.
                </p>
              </div>
            </div>

            {/* Wiki BĐS */}
            <div className="group">
              <div className="bg-white p-6 rounded-2xl shadow-lg shadow-gray-100/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="w-16 h-16 rounded-xl bg-orange-50 flex items-center justify-center mb-6 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Wiki BĐS</h3>
                <p className="text-gray-500 leading-relaxed">
                  Người dẫn đường tin cậy cung cấp kiến thức, kinh nghiệm về mua bán, cho thuê bất động sản một cách đầy đủ.
                </p>
              </div>
            </div>
          </div>

          
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}

export default Home;
