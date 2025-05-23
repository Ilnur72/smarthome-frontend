import { Route, Routes } from "react-router-dom";
import Building from "./pages/building/Building";
import MainLayout from "./layout/MainLayout";
import AddBuilding from "./pages/building/components/AddBuilding";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom/dist";
import { loadState } from "./Utils/storage";
import { jwtToken } from "./store/slices/staffSlice";
import React from "react";
import { jwtDecode } from "jwt-decode";
import BuildingDetail from "./pages/building/components/DetailBuilding";
import Entrance from "./pages/entrance/Entrance";
import Login from "./pages/Login/Login";
import Camera from "./pages/camera/Camera";
import CameraDetail from "./pages/camera/components/DetailCamera";
import EntranceDetail from "./pages/entrance/components/DetailEntrance";
import UserDetail from "./pages/user/components/DetailUser";
import Operator from "./pages/operator/Operator";
import OperatorDetail from "./pages/operator/components/DetailOperator";
import AttachmentUser from "./pages/entrance/components/AttachmentUser";
import OperatorProfile from "./pages/operatorProfile/OperatorProfile";
import User from "./pages/user/User";

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
        <Route path="/building/add-home" element={<AddBuilding />} />
        <Route path="/building/entrance" element={<Entrance />} />
        <Route path="/building/detail/entrance/detail" element={<EntranceDetail />} />
        <Route
          path="/building/entrance/detail/attachment-user"
          element={<AttachmentUser />}
        />
        <Route path="/building/camera" element={<Camera />} />
        <Route path="/building/camera/detail" element={<CameraDetail />} />
        <Route path="/building/detail" element={<BuildingDetail />} />
        <Route path="/user" element={<User />} />
        <Route path="/user/detail" element={<UserDetail />} />
        <Route path="/operator/profile" element={<OperatorProfile />} />
        {user?.user?.role === "SYSTEM_ADMIN" ? (
          <>
            <Route path="/operator" element={<Operator />} />
            <Route path="/operator/detail" element={<OperatorDetail />} />
          </>
        ) : null}
      </Route>
    </Routes>
  );
}

export default App;
