import React from "react";
import { Button, Paper, Typography, Box, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { Commet } from "react-loading-indicators";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ListApartment from "./ListApartment";
import AttachmentUser from "./AttachmentUserModal";

function EntranceDetail() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const entranceIdFromParams = queryParams.get("entranceId");
  const buildingIdFromParams = queryParams.get("buildingId");

  const [isOpen, setIsOpen] = React.useState(false);

  const { data, error, isLoading, refetch } = useQuery(
    "entrance-detail",
    () =>
      axios.get(`/entrance/${entranceIdFromParams}`).then((res) => res.data),
    { keepPreviousData: true, refetchOnWindowFocus: false }
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
          <h2 className="mb-2">Entrance Detail</h2>
          <p className="font-normal">
            <strong className="text-gray-700">Kamera IP manzili:</strong>
            {data.data?.name}
          </p>
          <p className="font-normal">
            <strong className="text-gray-700">Xonadon raqami:</strong>
            {data.data.first_apartment_number +
              "-" +
              data.data.last_apartment_number}
          </p>
          <p className="font-normal">
            <strong className="text-gray-700">Domofon login:</strong>
            {data.data.intercom_login}
          </p>
          <p className="font-normal">
            <strong className="text-gray-700">Domofon IP manzili:</strong>
            {data.data.intercom_ip}
          </p>
          <p className="font-normal">
            <strong className="text-gray-700">Domofon parol:</strong>
            {data.data.intercom_password}
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
          {/* <div className="px-4">
        <ButtonGroup variant="outlined" aria-label="Loading button group">
        <Button variant="contained">Uylar ro'yhati</Button>
        <Button variant="outlined">Kameralar</Button>
        
        </ButtonGroup>
        </div> */}
        </div>
        <ListApartment data={data.data} refetch={refetch} />
      </div>
    </div>
  );
}
export default EntranceDetail;
