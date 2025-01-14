import React from "react";
import { Button, Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { Commet } from "react-loading-indicators";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function CameraDetail() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const cameraIdFromParams = queryParams.get("cameraId");
  const buildingIdFromParams = queryParams.get("buildingId");
  console.log(buildingIdFromParams);

  const { data, error, isLoading, refetch } = useQuery(
    "camera-detail",
    () => axios.get(`/camera/${cameraIdFromParams}`).then((res) => res.data)
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
    <Paper elevation={3} sx={{ padding: 3, margin: 2 }}>
      <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
        Camera Detail
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        <strong>Kamera IP manzili:</strong> {data.data.ip_address}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        <strong>Login:</strong> {data.data.login}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        <strong>Password:</strong> {data.data.password}
      </Typography>
      <Box sx={{ marginTop: 3, display: "flex", gap: 5 }}>
        {/* <button
          type="button"
          onClick={() => navigate("/camera")}
          className="bg-inherit px-2 py-2 rounded mr-2 text-3xl"
        >
        </button> */}
        <Button
          variant="contained"
          color="inherit"
          onClick={() =>
            navigate(`/building/camera?buildingId=${buildingIdFromParams}`)
          }
        >
          <ArrowBackIcon fontSize="medium" />
          Back
        </Button>
      </Box>
    </Paper>
  );
}
export default CameraDetail;
