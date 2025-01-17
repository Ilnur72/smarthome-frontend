// src/components/Sidebar.jsx

import React from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";
import FaxIcon from "@mui/icons-material/Fax";
import CameraIcon from "@mui/icons-material/PhotoCameraFront";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { LogOutIcon } from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  let links = [
    { img: ApartmentIcon, link: "Building", url: `/building` },
    // { img: FaxIcon, link: "Intercom", url: "/intercom" },
    // { img: CameraIcon, link: "Camera", url: `/camera` },
    // { img: Logout, l ink: "Logout", url: `/login` },
  ];
  const handleLogout = () => {
    // Tokenni localStorage yoki sessionStorage'dan o'chirish
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    // Foydalanuvchini login sahifasiga yo'naltirish
    navigate("/login");
  };
  return (
    <div>
      <div className="w-64"></div>
      <div
        style={{ height: "100vh" }}
        className="bg-white w-64 p-4 border-r-2 md:block fixed"
      >
        <h1
          onClick={() => navigate("/building")}
          className="text-lg font-bold text-blue-600"
        >
         <button> Project Name</button>
        </h1>
        <p className="text-gray-500">Category</p>
        <ul className="mt-4 flex flex-col gap-4">
          {links.map((item, index) => (
            <NavLink key={index} to={item.url}>
              {({ isActive }) => (
                <li
                  className={`flex items-center p-2 hover:bg-gray-100 rounded ${
                    isActive && "bg-primary-150"
                  }`}
                >
                  {<item.img className={`${isActive && "text-primary-500"}`} />}
                  <span className="ml-2 text-primary">{item.link}</span>
                </li>
              )}
            </NavLink>
          ))}
          <li
            className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
            onClick={handleLogout}
          >
            <LogOutIcon className="text-gray-500" />
            <span className="ml-2 text-primary">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
