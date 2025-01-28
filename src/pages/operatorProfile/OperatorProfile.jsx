import React from "react";
import { Button, Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { Commet } from "react-loading-indicators";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { loadState } from "../../Utils/storage";
import { jwtDecode } from "jwt-decode";
import EditOperatorProfile from "./components/EditOprator";
// import AttachmentHomeModal from "./AttachmentHome";

function OperatorProfile() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const token = loadState("token");
  const { user } = jwtDecode(token);

  const { data, isLoading, refetch } = useQuery(
    "operator-profile",
    () => axios.get(`/operator/${user.id}`).then((res) => res.data),
    {
      staleTime: 0,
    }
  );

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-2/3">
        <Commet color="#00BDD6FF" size="medium" text="" textColor="" />
      </div>
    );

  return (
    <div>
      <EditOperatorProfile
        operator={data.data}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        refetch={refetch}
      />
      <Paper elevation={3} sx={{ padding: 3, margin: 2 }}>
        <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
          Operator Detail
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          <strong>Shirkat nomi:</strong>
          {data.data.name}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          <strong>email:</strong> {data.data.email}
        </Typography>

        <Box sx={{ marginTop: 3, display: "flex", gap: 5 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsOpen(true)}
          >
            Tahrirlash
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
export default OperatorProfile;
