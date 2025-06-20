import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineSearch,
  HiOutlineShoppingCart,
  HiOutlineLogout,
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
} from "react-icons/hi";
import { supabase } from "../lib/supabase";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <header className="bg-gray-900 text-white border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-sm">
        <h1 className="text-2xl font-bold tracking-wide">RevCommerce</h1>

        <nav className="hidden md:flex space-x-6 font-medium">
          <Link to="#" className="hover:text-blue-400">
            Categories
          </Link>
          <Link to="#" className="hover:text-blue-400">
            Sale
          </Link>
          <Link to="#" className="hover:text-blue-400">
            Clearance
          </Link>
          <Link to="#" className="hover:text-blue-400">
            New stock
          </Link>
          <Link to="#" className="hover:text-blue-400">
            Trending
          </Link>
        </nav>

        <div className="flex gap-4 text-gray-400 items-center">
          <Link to="#" className="hover:text-white">
            Help
          </Link>
          <Link to="#" className="hover:text-white">
            Orders & Returns
          </Link>
          <span className="hidden sm:inline text-white">Hi, Rehyann</span>

          <button title="Search" className="hover:text-white">
            <HiOutlineSearch className="h-5 w-5" />
          </button>
          <button title="Cart" className="hover:text-white">
            <HiOutlineShoppingCart className="h-5 w-5" />
          </button>

          <button
            title="Logout"
            onClick={handleLogout}
            className="hover:text-red-500"
          >
            <HiOutlineLogout className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="bg-gray-800 text-gray-300 text-center text-sm py-2 border-t border-gray-700">
        <p className="flex justify-center items-center gap-2">
          <HiOutlineArrowLeft />
          Get 10% off on business sign up
          <HiOutlineArrowRight />
        </p>
      </div>
    </header>
  );
};

export default Navbar;
