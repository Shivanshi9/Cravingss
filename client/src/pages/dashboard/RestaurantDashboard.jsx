import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

import RestaurantSidebar from "../../components/restaurantDashboard/RestaurantSidebar.jsx";
import RestaurantOverview from "../../components/restaurantDashboard/RestaurantOverview.jsx";
import RestaurantSetting from "../../components/restaurantDashboard/RestaurantSetting.jsx";
import RestaurantOrders from "../../components/restaurantDashboard/RestaurantOrders.jsx";

const RestaurantDashboard = () => {
  const { isLogin, user } = useAuth();

  const navigate = useNavigate();

  const active = useLocation().state?.activeTab;

  const [activeTab, setActiveTab] = React.useState(active || "overview");

  // Later we'll replace this with restaurant role authentication
  if (!isLogin) {
    return (
      <div className="h-[91vh] bg-[url('/foodTable.webp')] bg-cover bg-center">
        <div className="h-full backdrop-blur-lg flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-white">
            Access Denied. Please Login First.
          </h1>

          <button
            onClick={() => navigate("/login")}
            className="mt-5 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            Go To Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[91vh] flex gap-2 p-2">
      {/* Sidebar */}

      <div className="w-[18%] bg-white rounded-xl shadow-md p-4">
        <RestaurantSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          user={user}
        />
      </div>

      {/* Main Content */}

      <div className="flex-1 bg-white rounded-xl shadow-md p-5 overflow-y-auto">
        {activeTab === "overview" && <RestaurantOverview />}

        {activeTab === "orders" && <RestaurantOrders />}

        {activeTab === "settings" && <RestaurantSetting />}
      </div>
    </div>
  );
};

export default RestaurantDashboard;
