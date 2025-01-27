import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Commet } from "react-loading-indicators";
import { useQuery } from "react-query";
import axios from "axios";
import iconDelete from "../../assets/ActionIcon/delete.svg";
import iconEdit from "../../assets/ActionIcon/edit.svg";
import iconView from "../../assets/ActionIcon/view.svg";
import React from "react";
import AddCamera from "./components/AddCamera";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import EditCamera from "./components/EditCamera";
import { loadState } from "../../Utils/storage";
import { jwtDecode } from "jwt-decode";

function Camera() {
  const [page, setPage] = React.useState(1);
  const [row, setRow] = React.useState(10);
  const [showCamera, setShowCamera] = React.useState({ isOpen: false });
  const [isOpen, setIsOpen] = React.useState(false);

  const navigate = useNavigate();

  const token = loadState("token");
  const { user } = jwtDecode(token);

  const queryParams = new URLSearchParams(location.search);
  const buildingIdFromParams = queryParams.get("buildingId");

  const { data, isLoading, refetch } = useQuery("camera", () =>
    axios
      .get(
        `/camera?filters[building_id]=${buildingIdFromParams}&page[offset]=${page}&page[limit]=${row}`
      )
      .then((res) => res.data)
  );

  async function showData(id) {
    const { data } = await axios.get(`/camera/${id}`);

    setShowCamera({ isOpen: true, data: data.data });
  }

  React.useEffect(() => {
    refetch();
    if (data?.data?.data.length === 0 && page !== 1) setPage(page - 1);
  }, [page, row, refetch]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-2/3">
        <Commet color="#00BDD6FF" size="medium" text="" textColor="" />
      </div>
    );
  return (
    <div className="">
      <div className="bg-white shadow p-4 mx-auto flex justify-between items-center">
        <h2 className="text-xl font-bold">Kameralar</h2>
        <div className="flex items-center">
          {user.role === "SYSTEM_ADMIN" ? (
            <button
              onClick={() => {
                setIsOpen(true);
              }}
              className={`bg-primary-500 text-white px-4 py-2 rounded ml-2`}
            >
              Kamera qo'shish
            </button>
          ) : null}
        </div>
      </div>
      <button
        type="button"
        onClick={() =>
          navigate(`/building/detail?buildingId=${buildingIdFromParams}`)
        }
        className="bg-inherit px-2 py-2 rounded mr-2 text-3xl"
      >
        <ArrowBackIcon fontSize="medium" />
      </button>
      <div className="flex items-center justify-between pt-4 pl-4">
        <strong className="font-bold text-base text-primary">
          Total: {data?.data.total}
        </strong>
        <div className="flex items-center pb-2">
          {/* <Sort
          filterAndSort={filterAndSort}
          setFilterAndSort={setFilterAndSort}
        /> */}
        </div>
      </div>
      {isOpen ? (
        <AddCamera
          refetch={refetch}
          buildingId={buildingIdFromParams}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          showCamera={showCamera}
        />
      ) : null}
      {showCamera.isOpen ? (
        <EditCamera
          refetch={refetch}
          buildingId={buildingIdFromParams}
          setShowCamera={setShowCamera}
          showCamera={showCamera}
        />
      ) : null}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, padding: 5 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                Login
              </TableCell>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                Password
              </TableCell>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                IP address
              </TableCell>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.data.map((item, index) => (
              <TableRow
                key={item.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#092C4C",
                    paddingY: 0.8,
                  }}
                  align="center"
                >
                  {item.login}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#092C4C",
                    paddingY: 0.8,
                  }}
                  align="center"
                >
                  {item.password}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#092C4C",
                    paddingY: 0.8,
                  }}
                  align="center"
                >
                  {item.ip_address}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#092C4C",
                    paddingY: 0.8,
                  }}
                  align="center"
                >
                  <IconButton
                    onClick={() => {
                      navigate(
                        `/building/camera/detail?cameraId=${item.id}&&buildingId=${buildingIdFromParams}`
                      );
                    }}
                    aria-label="view"
                    size="medium"
                    sx={{
                      width: "35px",
                      height: "35px",
                      border: "1px solid #EAEEF4",
                      "&:hover": {
                        backgroundColor: "#00BDD6FF",
                        "& > img": {
                          filter: "brightness(2000%)",
                        },
                      },
                    }}
                  >
                    <img src={iconView} alt="" />
                  </IconButton>
                  {user.role === "SYSTEM_ADMIN" ? (
                    <IconButton
                      onClick={() => {
                        showData(item.id);
                      }}
                      aria-label="edit"
                      size="medium"
                      sx={{
                        mx: 1,
                        width: "35px",
                        height: "35px",
                        border: "1px solid #EAEEF4",
                        "&:hover": {
                          backgroundColor: "#00BDD6FF",
                          "& > img": {
                            filter: "brightness(2000%)",
                          },
                        },
                      }}
                    >
                      <img src={iconEdit} alt="" />
                    </IconButton>
                  ) : null}
                  {user.role === "SYSTEM_ADMIN" ? (
                    <IconButton
                      sx={{
                        width: "35px",
                        height: "35px",
                        border: "1px solid #EAEEF4",
                        "&:hover": {
                          backgroundColor: "#00BDD6FF",
                          "& > img": {
                            filter: "brightness(2000%)",
                          },
                        },
                      }}
                      onClick={async () => {
                        await axios.delete(`/camera/${item.id}`);
                        refetch();
                      }}
                      aria-label="delete"
                      size="medium"
                    >
                      <img src={iconDelete} alt="" />
                    </IconButton>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div align="center" className="flex justify-center items-center py-2">
        <Stack spacing={2}>
          <Pagination
            onChange={(_, page) => setPage(page)}
            count={data?.data && Math.ceil(data.data?.total / row)}
            variant="outlined"
            shape="rounded"
            page={page}
          />
        </Stack>
        <FormControl sx={{ width: "80px" }}>
          <InputLabel size="small" id="demo-simple-select-label">
            Row
          </InputLabel>
          <Select
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={row}
            label="Row"
            onChange={(e) => setRow(e.target.value)}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default Camera;
