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

  return (
    <header className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h2 className="text-xl font-bold">{location.pathname === "/building" ? "Uylar": "Podyezdlar"}</h2>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            className={`border p-2 rounded ${shouldHidePage && "opacity-0"}`}
          />
          {location.pathname === "/building" ? (
            <button
              onClick={() => navigate("building/add-home")}
              className={`bg-primary-500 text-white px-4 py-2 rounded ml-2  ${
                shouldHidePage && "opacity-0"
              } `}
            >
              + Uy qo'shish
            </button>
          ) : location.pathname === "/building/entrance" ? (
            <button
              onClick={() => dispatch(openModal())}
              className={`bg-primary-500 text-white px-4 py-2 rounded ml-2  ${
                shouldHidePage && "opacity-0"
              } `}
            >
              + Podyezd qo'shish
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default Header;
