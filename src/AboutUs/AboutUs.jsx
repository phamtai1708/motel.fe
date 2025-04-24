import MainMenu from "../Components/MainMenu";
import Footer from "../Components/Footer";
import banner from "../Data/banner.PNG";

function AboutPage() {
  return (
    <>
      <MainMenu />

      <div className="flex flex-col lg:flex-row w-[80rem] mx-auto py-10 px-4 gap-10">
        <div className="flex-1 space-y-6 text-gray-700 text-[1rem] leading-7">
          <h1 className="text-3xl font-bold text-blue-600">Giới thiệu về Phongtro84vh</h1>
          <p>
            <strong>Phongtro84vh</strong> là nền tảng trực tuyến chuyên cung cấp dịch vụ <strong>giới thiệu, đăng tin và quản lý bất động sản</strong> trên toàn quốc. 
            Chúng tôi kết nối người cho thuê, mua bán bất động sản với người có nhu cầu thuê và tìm kiếm một cách nhanh chóng, hiệu quả và minh bạch.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">💼 Dịch vụ của chúng tôi</h2>

          <div>
            <h3 className="text-xl font-medium mt-4">🏠 Đăng tin bất động sản cho thuê & mua bán</h3>
            <ul className="list-disc list-inside ml-4">
              <li>Nhà nguyên căn</li>
              <li>Biệt thự</li>
              <li>Mặt bằng kinh doanh</li>
              <li>Phòng trọ, nhà trọ</li>
              <li>Căn hộ dịch vụ</li>
              <li>Bất động sản thương mại</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium mt-4">🛠️ Quản lý hệ thống phòng trọ / căn hộ dịch vụ</h3>
            <ul className="list-disc list-inside ml-4">
              <li>Quản lý số lượng phòng, tình trạng thuê</li>
              <li>Quản lý tiền cọc, hợp đồng, thanh toán</li>
              <li>Thống kê doanh thu và tình hình hoạt động</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium mt-4">👷‍♂️ Kết nối dịch vụ thợ uy tín</h3>
            <ul className="list-disc list-inside ml-4">
              <li>Thợ điện, nước</li>
              <li>Thợ xây, sắt thép</li>
              <li>Lắp đặt nội thất, vệ sinh máy lạnh...</li>
              <li>Hồ sơ thợ minh bạch, đánh giá rõ ràng</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium mt-4">🧑‍💼 Hỗ trợ thương hiệu cá nhân & doanh nghiệp</h3>
            <ul className="list-disc list-inside ml-4">
              <li>Giúp chủ nhà hoặc đơn vị quản lý xây dựng thương hiệu uy tín</li>
              <li>Tạo trang giới thiệu cá nhân/doanh nghiệp chuyên nghiệp</li>
              <li>Tăng mức độ tiếp cận đến người thuê qua hệ thống SEO & hiển thị trên toàn trang</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mt-6">🎯 Sứ mệnh của chúng tôi</h2>
            <p>
              <strong>Phongtro84vh</strong> mong muốn trở thành <strong>nền tảng số hàng đầu</strong> trong việc kết nối, quản lý và vận hành bất động sản cho thuê, 
              đồng thời hỗ trợ toàn diện cho người dùng từ tìm phòng, thuê phòng đến vận hành và sửa chữa.
            </p>
          </div>
        </div>

        {/* Banner bên phải */}
        <div className="w-[200px] flex-shrink-0 sticky top-28">
          <img src={banner} alt="Quảng cáo" className="w-full rounded-lg shadow" />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AboutPage;