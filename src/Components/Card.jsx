import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Card({ item, onClick }) {
  console.log("🚀 ~ Card ~ item:", item)
  const navigate = useNavigate();

  
  const handleClickCard = () => {
    navigate(`/lands/${item._id}`, { state: { item } });
    
    if (onClick) {
      onClick(item.images[0]);
    }
  };

  const local = item.address.split(",");

  // Function to format price with dots
  const formatPrice = (price) => {
    if (price === null || price === undefined) {
      return "N/A"; // Or some placeholder
    }
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div 
      onClick={handleClickCard}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-200 hover:-translate-y-1 relative"
    >
      <div className="relative w-full h-[200px] flex gap-1">
        <img 
          src={item.images[0]} 
          alt={item.address}
          className="flex-[2] h-full object-cover" 
        />
        <div className="flex-1 flex flex-col gap-1">
          <img 
            src={item.images[1]} 
            alt={item.address}
            className="h-[calc(50%-2px)] w-full object-cover" 
          />
          <img 
            src={item.images[2]} 
            alt={item.address}
            className="h-[calc(50%-2px)] w-full object-cover" 
          />
        </div>
      </div>

      <div className="p-4">
        <h1 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{item.address}</h1>
        <p className="text-xl font-bold text-red-600 mb-3">{formatPrice(item.price)} VNĐ</p>
        
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <span className="material-symbols-outlined">location_on</span>
          <p className="text-sm">
            {local[local.length - 2]}, {local[local.length - 1]}
          </p>
        </div>

        <div className="flex gap-4 text-gray-500 text-sm pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined">meeting_room</span>
            <p>{item.room} phòng ngủ</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined">wc</span>
            <p>{item.toilet} phòng tắm</p>
          </div>
        </div>
      </div>

      {/* Favorite Button - Positioned at bottom-right */}
      <button 
        className="absolute bottom-4 right-4 px-4 py-2 rounded-[10px] bg-white shadow-lg hover:bg-gray-50 transition-all z-10 group border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="material-symbols-outlined text-2xl text-gray-400 group-hover:text-red-500">
          favorite
        </span>
      </button>
    </div>
  );
}

export default Card;
