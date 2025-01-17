import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const MainLayout = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (
  //     !token &&
  //     !location.pathname.includes("login") &&
  //     !location.pathname.includes("register")
  //   ) {
  //     navigate("/login");
  //     window.location.reload();
  //   }
  // }, [location.pathname, token]);
  const url = ["/login"];

  const shouldHidePage = url.includes(location.pathname);

  return (
    <div className="flex flex-col h-screen">
      <main className="flex flex-1 relative">
        {location.pathname === "/login" ? null : <Sidebar />}

        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
