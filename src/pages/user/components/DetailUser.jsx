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

  const { data, error, isLoading, refetch } = useQuery("user-detail", () =>
    axios.get(`/user/${userIdFromParams}`).then((res) => res.data)
  );
  const { data: userApartment, isLoading: isLoadingUser } = useQuery(
    "user-apartments",
    () =>
      axios
        .get(`/user-apartment?filters[user_id]=${userIdFromParams}`)
        .then((res) => res.data)
  );
  console.log(userApartment);

  if (isLoading || isLoadingUser)
    return (
      <div className="flex items-center justify-center h-2/3">
        <Commet color="#00BDD6FF" size="medium" text="" textColor="" />
      </div>
    );

  return (
    <div>
      <AttachmentHomeModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        refetch={refetch}
        userIdFromParams={userIdFromParams}
      />
      <Paper elevation={3} sx={{ padding: 3, margin: 2 }}>
        <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
          User Detail
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          <strong>Fullname:</strong>
          {data.data.fullname}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          <strong>email:</strong> {data.data.email}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          <strong>Phone:</strong> {data.data.phone}
        </Typography>
        {userApartment.data.total ? (
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            <strong>Uy raqami:</strong>{" "}
            {userApartment.data.data[0]?.apartment.number}
          </Typography>
        ) : null}
        <Box sx={{ marginTop: 3, display: "flex", gap: 5 }}>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => navigate(`/user`)}
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
      </Paper>
      <ListUserApartment data={userApartment.data} />
    </div>
  );
}
export default UserDetail;
