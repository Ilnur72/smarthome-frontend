import React from "react";
import { Button, Paper, Typography, Box, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { Commet } from "react-loading-indicators";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ListApartment from "./ListApartment";

function EntranceDetail() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const entranceIdFromParams = queryParams.get("entranceId");
  const buildingIdFromParams = queryParams.get("buildingId");

  const { data, error, isLoading, refetch } = useQuery(
    "entrance-detail",
    () =>
      axios.get(`/entrance/${entranceIdFromParams}`).then((res) => res.data),
    { keepPreviousData: true, refetchOnWindowFocus: false }
  );
  console.log(data);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-2/3">
        <Commet color="#00BDD6FF" size="medium" text="" textColor="" />
      </div>
    );

  return (
    <div>
      <Paper elevation={3} sx={{ padding: 3, margin: 2 }}>
        <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
          Entrance Detail
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          <strong>Kamera IP manzili:</strong> {data.data.name}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          <strong>uy raqamlari:</strong>{" "}
          {data.data.first_apartment_number +
            "-" +
            data.data.last_apartment_number}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          <strong>Domofon login:</strong> {data.data.intercom_login}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          <strong>Domofon IP manzili:</strong> {data.data.intercom_ip}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          <strong>Domofon parol:</strong> {data.data.intercom_password}
        </Typography>
        <Box sx={{ marginTop: 3, display: "flex", gap: 5 }}>
          <Button
            variant="contained"
            color="inherit"
            onClick={() =>
              navigate(`/building/entrance?buildingId=${buildingIdFromParams}`)
            }
          >
            <ArrowBackIcon fontSize="medium" />
            Back
          </Button>
        </Box>
      </Paper>
      {/* <div className="px-4">
        <ButtonGroup variant="outlined" aria-label="Loading button group">
          <Button variant="contained">Uylar ro'yhati</Button>
          <Button variant="outlined">Kameralar</Button>
        
        </ButtonGroup>
      </div> */}
      <ListApartment data={data.data} refetch={refetch} />
    </div>
  );
}
export default EntranceDetail;
