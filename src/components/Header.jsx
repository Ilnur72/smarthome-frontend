import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { openModal } from "../store/slices/modalSlice";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const url = ["/building/add-home"];
  const shouldHidePage = url.includes(location.pathname);

  const buttonConfig = {
    "/building": {
      label: "+ Uy qo'shish",
      onClick: () => navigate("building/add-home"),
      header: "Uylar",
    },
    "/building/entrance": {
      label: "+ Podyezd qo'shish",
      onClick: () => dispatch(openModal()),
      header: "Podyezdlar",
    },
    "/building/add-camera": {
      label: "+ Camera qo'shish",
      onClick: () => dispatch(openModal()),
      header: "Kamera qo'shish",
    },
  };

  const currentButton = buttonConfig[location.pathname];

  return (
    <header className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h2 className="text-xl font-bold">
          {currentButton && currentButton.header}
        </h2>
        <div className="flex items-center">
          {currentButton && (
            <button
              onClick={currentButton.onClick}
              className={`bg-primary-500 text-white px-4 py-2 rounded ml-2 ${
                shouldHidePage && "hidden"
              }`}
            >
              {currentButton.label}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
