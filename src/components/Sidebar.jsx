// src/components/Sidebar.jsx

import React from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOutIcon, Users, Building2, User } from "lucide-react";
import { loadState } from "../Utils/storage";
import { jwtDecode } from "jwt-decode";

function Sidebar() {
  const navigate = useNavigate();
  const token = loadState("token");
  if (!token) return navigate("/login");

  const { user } = jwtDecode(token);

  let links = [
    { img: ApartmentIcon, link: "Binolar", url: `/building` },
    { img: Users, link: "Foydalanuvchilar", url: "/user" },
    // user.role ==='SYSTEM_ADMIN' ? { img: Building2, link: "Shirkat", url: `/operator` } : {},
    // user.role ==='SYSTEM_ADMIN' ? { img: Building2, link: "Shirkat", url: `/operator` } : {},
  ];
  if (user.role === "SYSTEM_ADMIN")
    links.push({ img: Building2, link: "Shirkat", url: `/operator` });
  else links.unshift({ img: User, link: "Porfile", url: `/operator/profile` });
  // else links.push({img})
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    navigate("/login");
  };
  return (
    <div>
      <div className="w-56"></div>
      <div
        style={{ height: "100vh" }}
        className="bg-white w-56 p-4 border-r-2 md:block fixed"
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
                  className={`flex items-center p-2 hover:bg-gray-200 rounded ${
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
            className="flex items-center p-2 hover:bg-gray-200 rounded cursor-pointer"
            onClick={handleLogout}
          >
            <LogOutIcon />
            <span className="ml-2 text-primary">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
