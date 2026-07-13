import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import api from "../config/api.config";

const Header = () => {
  const navigate = useNavigate();

  const { user, setUser, isLogin, setIsLogin, setRole } = useAuth();

  const handleNavigate = () => {
    //console.log("Handle Navigate", role);

    if (role === "restaurant") {
      navigate("/restaurant-dashboard");
    } else if (role === "rider") {
      navigate("/rider-dashboard");
    } else if (role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/customer-dashboard");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("UserData");
    setUser(null);
    setIsLogin(false);

    toast.success("Logged Out Successfully");

    navigate("/login");
  };

  return (
    <header className="bg-orange-800 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-boldre text-white">Cravings</h1>

        <nav className="flex items-center gap-6">
          <Link to="/" className="text-white hover:text-orange-100 transition">
            Home
          </Link>

          <Link
            to="/about"
            className="text-white hover:text-orange-100 transition"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="text-white hover:text-orange-100 transition"
          >
            Contact Us
          </Link>

          {!isLogin ? (
            <>
              <Link
                to="/login"
                className="text-white hover:text-orange-100 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-white text-orange-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/user/dashboard" className="flex flex-col items-center">
                <img
                  src={
                    user?.photo ||
                    `https://placehold.co/40x40?text=${user?.FullName?.charAt(0) || "U"}`
                  }
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover cursor-pointer"
                />

                <span className="text-white text-sm mt-1 max-w-24 truncate">
                  {user?.FullName}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
              >
                
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
    
    
  );
};

export default Header;
