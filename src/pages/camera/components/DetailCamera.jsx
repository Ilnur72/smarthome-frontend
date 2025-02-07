import React from "react";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { Commet } from "react-loading-indicators";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ListEntrance from "./ListEntrance";

function CameraDetail() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const cameraIdFromParams = queryParams.get("cameraId");
  const buildingIdFromParams = queryParams.get("buildingId");

  const { data, error, isLoading, refetch } = useQuery(
    "camera-detail",
    () =>
      axios
        .get(`/camera/${cameraIdFromParams}`)
        .then((res) => res.data)
        .catch((e) => {
          if (e.response?.status === 401) navigate("/login");
        })
    // {
    //   cacheTime: 0,
    //   staleTime: 0,
    // }
  );
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-2/3">
        <Commet color="#00BDD6FF" size="medium" text="" textColor="" />
      </div>
    );

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        <div className="bg-white rounded-lg shadow-sm border-b border-gray-200 p-3">
          <h2 className="mb-2">Camera Detail</h2>
          <p className="font-normal">
            <strong className="text-gray-700">Kamera IP manzili:</strong>
            {data.data.ip_address}
          </p>
          <p className="font-normal">
            <strong className="text-gray-700">Login:</strong>
            {data.data.login}
          </p>
          <p className="font-normal">
            <strong className="text-gray-700">Password:</strong>{" "}
            {data.data.password}
          </p>
          <Box sx={{ marginTop: 3, display: "flex", gap: 5 }}>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => navigate(-1)}
            >
              <ArrowBackIcon fontSize="medium" />
              Back
            </Button>
          </Box>
        </div>
        <ListEntrance data={data.data} />
      </div>
    </div>
  );
}
export default CameraDetail;
