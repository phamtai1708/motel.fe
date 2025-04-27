import { Link } from "react-router-dom";

function Breadcrumb({ items }) {
  return (
    <div className="max-w-7xl py-2 px-4 mx-auto bg-transparent text-sm text-gray-600 mt-[5rem]">
      {items.map((item, index) => (
        <span key={index}>
          {index > 0 && <span className="mx-2">&gt;</span>}
          {item.link ? (
            <Link to={item.link} className="hover:text-green-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-800 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}

export default Breadcrumb; 