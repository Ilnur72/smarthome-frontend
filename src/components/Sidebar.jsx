// src/components/Sidebar.jsx

import React from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import FaxIcon from "@mui/icons-material/Fax";
import CameraIcon from "@mui/icons-material/PhotoCameraFront";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";

function Sidebar() {
  let links = [
    { img: ApartmentIcon, link: "Building", url: `/building` },
    { img: MeetingRoomIcon, link: "Entrance", url: "/entrance" },
    { img: FaxIcon, link: "Intercom", url: "/intercom" },
    { img: CameraIcon, link: "Camera", url: `/camera` },
    { img: MenuIcon, link: "Menu", url: `/menu` },
  ];

  return (
    <div
      style={{ height: "100vh" }}
      className="bg-white w-64 p-4 border-r-2 md:block"
    >
      <h1 className="text-lg font-bold text-blue-600">Project Name</h1>
      <p className="text-gray-500">Category</p>
      <ul className="mt-4">
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
      </ul>
    </div>
  );
}

export default Sidebar;
