import React from "react";
import { Button, Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { Commet } from "react-loading-indicators";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ListOperatorBuilding from "./ListBuilding";

function OperatorDetail() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const operatorIdFromParams = queryParams.get("operatorId");

  const { data, isLoading } = useQuery(
    "operator-detail",
    () =>
      axios.get(`/operator/${operatorIdFromParams}`).then((res) => res.data),
    {
      staleTime: 0,
    }
  );
  const {
    data: operatorBuilding,
    isLoading: isLoadingOperator,
    refetch,
  } = useQuery(
    ["operator-building", operatorIdFromParams],
    () =>
      axios
        .get(`/building?filters[operator_id]=${operatorIdFromParams}`)
        .then((res) => res.data),
    {
      enabled: !!operatorIdFromParams,
    }
  );

  if (isLoading || isLoadingOperator)
    return (
      <div className="flex items-center justify-center h-2/3">
        <Commet color="#00BDD6FF" size="medium" text="" textColor="" />
      </div>
    );

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        <h2 className="mb-2">Operator Detail</h2>

        <p className="font-normal">
          <strong className="text-gray-700">Kamera IP manzili:</strong>
          {data.data?.name}
        </p>
        <p className="font-normal">
          <strong className="text-gray-700">email:</strong>
          {data.data?.email}
        </p>
        <Box sx={{ marginTop: 3, display: "flex", gap: 5 }}>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => {
              navigate(`/operator`);
            }}
          >
            <ArrowBackIcon fontSize="medium" />
            Back
          </Button>
          {/* <Button
            variant="contained"
            color="primary"
            onClick={() => setIsOpen(true)}
          >
            Uy biriktirish
          </Button> */}
        </Box>
        <ListOperatorBuilding data={operatorBuilding.data} refetch={refetch} />
      </div>
    </div>
  );
}
export default OperatorDetail;
