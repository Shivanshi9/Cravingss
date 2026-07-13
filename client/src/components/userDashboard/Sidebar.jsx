import React from "react";

const Sidebar = ({ active, setActive }) => {
  return (
    <div className="h-full bg-orange-100 p-5">
      <h2 className="text-2xl font-bold text-orange-700 mb-8">Dashboard</h2>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => setActive("Orders")}
          className={`w-full text-left px-4 py-3 rounded-lg transition ${
            active === "Orders"
              ? "bg-orange-500 text-white"
              : "bg-white hover:bg-orange-200"
          }`}
        >
          Orders
        </button>

        <button
          onClick={() => setActive("Overview")}
          className={`w-full text-left px-4 py-3 rounded-lg transition ${
            active === "Overview"
              ? "bg-orange-500 text-white"
              : "bg-white hover:bg-orange-200"
          }`}
        >
          Overview
        </button>

        <button
          onClick={() => setActive("Wishlist")}
          className={`w-full text-left px-4 py-3 rounded-lg transition ${
            active === "Wishlist"
              ? "bg-orange-500 text-white"
              : "bg-white hover:bg-orange-200"
          }`}
        >
          Wishlist
        </button>

        <button
          onClick={() => setActive("Settings")}
          className={`w-full text-left px-4 py-3 rounded-lg transition ${
            active === "Settings"
              ? "bg-orange-500 text-white"
              : "bg-white hover:bg-orange-200"
          }`}
        >
          Settings
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
