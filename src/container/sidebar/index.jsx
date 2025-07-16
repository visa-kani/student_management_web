import React, { useState, useEffect } from "react";
import routes from "../../constants/routes";
import { NavLink, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Sidebar = (props) => {
  const { setIsOpen } = props
  const location = useLocation();
  const [userDetails, setUserDetails] = useState({});
  console.log(location.pathname);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("loggedUser"));
    setUserDetails(userData);
  }, []);

    const filteredRoutes = routes.filter((item) => {
    if (userDetails?.role !== "admin" && (item.name === "Faculty Details" || item.name === "Activity Logs")) {
      return false;
    }
    return true;
  });

  return <div className=" w-full h-[100%] flex flex-col justify-between">
    <div className="self-start text-2xl font-bold text-[#047bba] capitalize">
      Hi {userDetails?.first_name}!
    </div>
    <div className="self-start text-left">
      {filteredRoutes.map((item) => (
        <NavLink
          to={item?.route}>
          <ul key={item.name} className={`mb-5 font-medium ${location.pathname === item?.route ? "text-[#047bba] font-semibold" : ""} hover:text-[#047bba] hover:font-semibold`}>{item.name}</ul>
        </NavLink>
      ))}
    </div>
    <div className="h-[100px]"></div>
    <div onClick={() => setIsOpen(true)} className="cursor-pointer self-end flex justify-center items-center text-[#ff2828] font-medium"><FiLogOut className="mr-2 text-[#ff2828] text-lg" /> Logout</div>


  </div>;
};

export default Sidebar;
