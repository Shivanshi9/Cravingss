import React, { useEffect, useState } from "react";
import Sidebar from "../../components/userDashboard/Sidebar";
import Overview from "../../components/userDashboard/Overview";
import Orders from "../../components/userDashboard/Order";
import Settings from "../../components/userDashboard/Seetings";
import Wishlist from "../../components/userDashboard/Wishlist";

const UserDashboard = () => {
  const [active, setActive] = useState("Overview");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("UserData"));
    setUserData(data);
  }, []);

  return (
    <div className="flex h-[92vh]">

      <div className="w-1/6 border border-red-500">
        <Sidebar
          active={active}
          setActive={setActive}
          userData={userData}
        />
      </div>

      <div className="w-5/6 border border-green-500">
        {active === "Overview" && <Overview userData={userData} />}
        {active === "Orders" && <Orders />}
        {active === "Wishlist" && <Wishlist />}
        {active === "Settings" && <Settings userData={userData} />}
      </div>

    </div>
  );
};

export default UserDashboard;