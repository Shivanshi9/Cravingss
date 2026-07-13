import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../config/api.config";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { setUser, setIsLogin, setRole } = useAuth();

  const [user, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await api.post("/auth/login", user);

    toast.success(res.data.message);

    sessionStorage.setItem("UserData", JSON.stringify(res.data.data));

    setUser(res.data.data);
    setIsLogin(true);

    navigate("/user/dashboard");

    try {
      const res = await api.post("/auth/login", user);

      toast.success(res.data.message);

      sessionStorage.setItem("UserData", JSON.stringify(res.data.data));

      setUser(res.data.data);
      setIsLogin(true);

      setRole(res.data.data.userType);

      res.data.data.userType === "restaurant" &&
        navigate("/restaurant-dashboard");

      res.data.data.userType === "rider" && navigate("/rider-dashboard");

      res.data.data.userType === "admin" && navigate("/admin-dashboard");

      res.data.data.userType === "customer" && navigate("/customer-dashboard");
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-orange-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
