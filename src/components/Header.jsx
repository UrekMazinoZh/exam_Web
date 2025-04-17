import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="fixed top-0 left-0 w-full p-4 shadow-lg z-50 bg-gradient-to-r from-indigo-800 via-indigo-900 to-indigo-950">
      <div className="flex justify-center space-x-8">
        <Link
          to="/"
          className="text-white text-lg hover:text-gray-300"
        >
          Головна
        </Link>
        <Link
          to="/horizontal"
          className="text-white text-lg hover:text-gray-300"
        >
          Горизонтальний світлофор
        </Link>
        <Link
          to="/vertical"
          className="text-white text-lg hover:text-gray-300"
        >
          Вертикальний світлофор
        </Link>
      </div>
    </nav>
  );
};

export default Header;
