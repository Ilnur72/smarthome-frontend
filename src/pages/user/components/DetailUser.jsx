import React from "react";
import { Button, Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { Commet } from "react-loading-indicators";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AttachmentHomeModal from "./AttachmentHome";
import ListUserApartment from "./ListUserApartment";

function UserDetail() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const userIdFromParams = queryParams.get("userId");

  const [isOpen, setIsOpen] = React.useState(false);

  const { data, isLoading } = useQuery(
    "user-detail",
    () => axios.get(`/user/${userIdFromParams}`).then((res) => res.data),
    {
      staleTime: 0,
    }
  );
  const {
    data: userApartment,
    isLoading: isLoadingUser,
    refetch,
  } = useQuery(
    ["user-apartments", userIdFromParams],
    () =>
      axios
        .get(`/user-apartment?filters[user_id]=${userIdFromParams}`)
        .then((res) => res.data),
    {
      enabled: !!userIdFromParams,
    }
  );

  if (isLoading || isLoadingUser)
    return (
      <div className="flex items-center justify-center h-2/3">
        <Commet color="#00BDD6FF" size="medium" text="" textColor="" />
      </div>
    );

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        <div className="bg-white rounded-lg shadow-sm border-b border-gray-200 p-3">
          <AttachmentHomeModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            refetch={refetch}
            userIdFromParams={userIdFromParams}
          />
          <h2 className="mb-2">User Detail</h2>
          <p className="font-normal">
            <strong className="text-gray-700">Fullname:</strong>
            {data.data.fullname}
          </p>
          <p className="font-normal">
            <strong className="text-gray-700">Phone:</strong>
            {data.data.phone}
          </p>

          <Box sx={{ marginTop: 3, display: "flex", gap: 5 }}>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => {
                navigate(-1);
              }}
            >
              <ArrowBackIcon fontSize="medium" />
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsOpen(true)}
            >
              Uy biriktirish
            </Button>
          </Box>
        </div>
        <ListUserApartment data={userApartment.data} refetch={refetch} />
      </div>
    </div>
  );
}
export default UserDetail;
