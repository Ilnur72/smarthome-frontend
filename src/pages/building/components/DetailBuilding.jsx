import React from "react";
import { Button, Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { Commet } from "react-loading-indicators";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function BuildingDetail() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const buildingIdFromParams = queryParams.get("buildingId");

  const { data, error, isLoading, refetch } = useQuery(
    "building-detail",
    () => axios.get(`/building/${buildingIdFromParams}`).then((res) => res.data)
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
  const address = data?.data.address;
  return (
    <Paper elevation={3} sx={{ padding: 3, margin: 2 }}>
      <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
        Building Detail
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        <strong>Shirkat nomi:</strong>
        {data.data?.operator?.name}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        <strong>Uy manzili:</strong>
        {`${address?.region}, ${address?.district}, ${address?.street}`}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        <strong>Qavatlar soni:</strong> {data.data.floor}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        <strong>Xonadonlar soni:</strong> {data.data.apartments_count}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        <strong>Podyezdlar soni:</strong> {data.data.entrance_count}
      </Typography>
      <Box sx={{ marginTop: 3, display: "flex", gap: 5 }}>
        {/* <button
          type="button"
          onClick={() => navigate("/building")}
          className="bg-inherit px-2 py-2 rounded mr-2 text-3xl"
        >
        </button> */}
        <Button
          variant="contained"
          color="inherit"
          onClick={() => navigate(`/building`)}
        >
          <ArrowBackIcon fontSize="medium" />
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            navigate(`/building/entrance?buildingId=${data.data.id}`)
          }
        >
          Entrance
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            navigate(`/building/camera?buildingId=${data.data.id}`)
          }
        >
          Camera
        </Button>
      </Box>
    </Paper>
  );
}
export default BuildingDetail;
