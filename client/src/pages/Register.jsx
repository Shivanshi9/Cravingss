import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api.config";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    FullName: "",
    email: "",
    phone: "",
    DOB: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const inputClass =
    "w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500";

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const userData = {
      FullName: formData.FullName,
      email: formData.email.toLowerCase(),
      phone: formData.phone,
      DOB: formData.DOB,
      gender: formData.gender,
      password: formData.password,
    };

    console.log("User Registered:");
    console.log(JSON.stringify(userData, null, 2));

    try {
      const res = await api.post("/auth/register", userData);

      toast.success(res.data.message);

      setFormData({
        FullName: "",
        email: "",
        phone: "",
        DOB: "",
        gender: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 py-10 px-4">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-xl p-8">

        <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="FullName"
            placeholder="Full Name"
            value={formData.FullName}
            onChange={handleChange}
            className={inputClass}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className={inputClass}
            required
          />

          <input
            type="date"
            name="DOB"
            value={formData.DOB}
            onChange={handleChange}
            className={inputClass}
            required
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={inputClass}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={inputClass}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={inputClass}
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Register
          </button>

        </form>

        <div className="mt-6 text-center text-sm">
          <p>
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-orange-500 font-semibold hover:underline"
            >
              Login Here
            </button>
          </p>

          <p className="mt-2">
            Having Trouble?{" "}
            <button
              onClick={() => navigate("/contact")}
              className="text-orange-500 font-semibold hover:underline"
            >
              Contact Us
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;