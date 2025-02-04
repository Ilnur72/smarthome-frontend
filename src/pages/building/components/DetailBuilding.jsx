import React from "react";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { Commet } from "react-loading-indicators";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EntranceList from "../../entrance/EntranceList";
import CameraList from "../../camera/CameraList";

function BuildingDetail() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const buildingIdFromParams = queryParams.get("buildingId");
  const [attachemntCount, setAttachemntCount] = React.useState({
    attachemntCount: 0,
    noAttachemntCount: 0,
  });

  const { data, error, isLoading, refetch } = useQuery(
    ["building-detail", buildingIdFromParams],
    () =>
      axios
        .get(`/building/${buildingIdFromParams}`)
        .then((res) => res.data)
        .catch((e) => {
          console.log(e.response);
          if (e.response?.status === 401) navigate("/login");
        }),
    {
      enabled: !!buildingIdFromParams,
    }
  );
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-2/3">
        <Commet color="#00BDD6FF" size="medium" text="" textColor="" />
      </div>
    );
  const address = data?.data.address;
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        <div className="bg-white rounded-lg shadow-sm border-b border-gray-200 p-3">
          <h2 className="mb-2">Building Detail</h2>
          <p className="font-normal">
            <strong className="text-gray-700">Shirkat nomi:</strong>
            {data.data?.operator?.name}
          </p>
          <p className="font-normal">
            <strong className="text-gray-700">Uy manzili:</strong>
            {`${address?.region}, ${address?.district}, ${address?.street}`}
          </p>
          <p className="font-normal">
            <strong className="text-gray-700">Qavatlar soni:</strong>{" "}
            {data.data.floor}
          </p>
          <p className="font-normal">
            <strong className="text-gray-700">Xonadonlar soni:</strong>{" "}
            {data.data.apartments_count}
          </p>
          <p className="font-normal">
            <strong className="text-gray-700">Podyezdlar soni:</strong>{" "}
            {data.data.entrance_count}
          </p>
          <Box sx={{ marginTop: 3, display: "flex", gap: 5 }}>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => navigate(`/building`)}
            >
              <ArrowBackIcon fontSize="medium" />
              Back
            </Button>
          </Box>
        </div>
        <EntranceList buildingId={buildingIdFromParams} />
        <CameraList buildingId={buildingIdFromParams} />
      </div>
    </div>
  );
}
export default BuildingDetail;
