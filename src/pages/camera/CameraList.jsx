import axios from "axios";
import { Edit2, Eye, Trash2 } from "lucide-react";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { loadState } from "../../Utils/storage";
import { jwtDecode } from "jwt-decode";
import { Button } from "@mui/material";
import AddCamera from "./components/AddCamera";
import EditCamera from "./components/EditCamera";

function CameraList({ buildingId }) {
  const navigate = useNavigate();

  const [showCamera, setShowCamera] = React.useState({ isOpen: false });
  const [isOpen, setIsOpen] = React.useState(false);

  const token = loadState("token");
  const { user } = jwtDecode(token);

  const { data, isLoading, refetch } = useQuery("camera", () =>
    axios
      .get(`/camera?filters[building_id]=${buildingId}`)
      .then((res) => res.data)
      .catch((e) => {
        console.log(e.response);
        if (e.response?.status === 401) navigate("/login");
      })
  );

  async function showData(id) {
    const { data } = await axios.get(`/camera/${id}`);

    setShowCamera({ isOpen: true, data: data.data });
  }
  console.log(data);
  return (
    <div className="overflow-x-auto border rounded-lg">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-medium font-bold text-gray-700">
          Kameralar ro'yhati
        </h2>
        {user.role === "SYSTEM_ADMIN" ? (
          <Button
            variant="contained"
            onClick={() => {
              setIsOpen(true);
            }}
            className={`bg-primary-500 text-white px-4 py-2 rounded ml-2`}
          >
            Kamera qo'shish
          </Button>
        ) : null}
      </div>
      {isOpen ? (
        <AddCamera
          refetch={refetch}
          buildingId={buildingId}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          showCamera={showCamera}
        />
      ) : null}
      {showCamera.isOpen ? (
        <EditCamera
          refetch={refetch}
          buildingId={buildingId}
          setShowCamera={setShowCamera}
          showCamera={showCamera}
        />
      ) : null}
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
              IP address
            </th>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
              Password
            </th>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
              Login
            </th>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data?.data?.data?.map((camera) => (
            <tr key={camera.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-center">{camera.ip_address}</td>
              <td className="px-6 py-4 text-center">{camera.login}</td>
              <td className="px-6 py-4 text-center">{camera.password}</td>
              <td className="px-6 py-4 text-center">
                <div className="flex justify-center gap-3">
                  <button className="p-1 hover:bg-gray-200 rounded-lg transition-colors">
                    <Eye
                      onClick={() => {
                        navigate(
                          `/building/camera/detail?cameraId=${camera.id}&&buildingId=${buildingId}`
                        );
                      }}
                      className="w-4 h-4 text-gray-500"
                    />
                  </button>
                  {user.role === "SYSTEM_ADMIN" ? (
                    <button
                      onClick={() => {
                        showData(camera.id);
                      }}
                      className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-gray-500" />
                    </button>
                  ) : null}
                  {user.role === "SYSTEM_ADMIN" ? (
                    <button
                      onClick={async () => {
                        await axios.delete(`/camera/${camera.id}`);
                        refetch();
                      }}
                      className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-gray-500" />
                    </button>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CameraList;
