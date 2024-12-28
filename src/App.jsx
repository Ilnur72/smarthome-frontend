import { Route, Routes } from "react-router-dom";
import Building from "./pages/building/Building";
import MainLayout from "./layout/MainLayout";
import AddHome from "./pages/building/components/AddHome";
import Entrance from "./pages/entrance/Entrance";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom/dist";
import { loadState } from "./Utils/storage";
import { jwtToken } from "./store/slices/staffSlice";
import React from "react";
import { jwtDecode } from "jwt-decode";
import BuildingDetail from "./pages/building/components/DetailBuilding";
import AddEntrance from "./pages/building/components/AddEntrance";
import Login from "./pages/Login/Login";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = loadState("token");
  const user = token && jwtDecode(token);
  React.useEffect(() => {
    if (!token) return navigate("/login");
    dispatch(jwtToken(user?.user));
  }, [token]);
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/" element={<Navigate to="/building" />} />
        <Route path="/building" element={<Building />} />
        <Route path="/building/add-home" element={<AddHome />} />
        <Route path="/building/entrance" element={<AddEntrance />} />
        <Route path="/building/detail" element={<BuildingDetail />} />
        <Route path="/entrance" element={<Entrance />} />
      </Route>
    </Routes>
  );
}

export default App;
