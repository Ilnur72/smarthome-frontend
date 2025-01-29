import React from "react";
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
import iconDelete from "../../assets/ActionIcon/delete.svg";
import iconEdit from "../../assets/ActionIcon/edit.svg";
import iconView from "../../assets/ActionIcon/view.svg";
import { Commet } from "react-loading-indicators";
import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import { loadState } from "../../Utils/storage";
import { jwtDecode } from "jwt-decode";
// import EditUser from "./components/EditUser";

function User() {
  const [page, setPage] = React.useState(1);
  const [row, setRow] = React.useState(10);
  const navigate = useNavigate();
  const [showUser, setShowUser] = React.useState({ isOpen: false });
  const [isOpen, setIsOpen] = React.useState(false);

  const token = loadState("token");
  const { user } = jwtDecode(token);

  async function showData(id) {
    const { data } = await axios.get(`/user/${id}`);

    setShowUser({ isOpen: true, data: data.data });
  }

  const { data, isLoading, refetch } = useQuery(
    "user",

    () =>
      axios
        .get(
          `/user?page[offset]=${page}&page[limit]=${row}&sort[by]=created_at&sort[order]=DESC${
            user.role === "OPERATOR" ? "&filters[staff_id]=" + user.id : ""
          }`
        )
        .then((res) => res.data)
        .catch((e) => console.log(e)),
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  React.useEffect(() => {
    refetch();
    if (data?.data.data.length === 0 && page !== 1) setPage(page - 1);
  }, [page, row, refetch]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-2/3">
        <Commet color="#00BDD6FF" size="medium" text="" textColor="" />
      </div>
    );
  return (
    <div>
      <div className="bg-white shadow p-4 mx-auto flex justify-between items-center">
        <h2 className="text-xl font-bold">Users</h2>
        <div className="flex items-center">
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className={`bg-primary-500 text-white px-4 py-2 rounded ml-2`}
          >
            Foydalanuvchi qo'shish
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 pl-4">
        <strong className="font-bold text-base text-primary">
          Total: {data?.data.total}
        </strong>
        <div className="flex items-center pb-2"></div>
      </div>

      <EditUser
        showUser={showUser}
        setShowUser={setShowUser}
        refetch={refetch}
      />
      <AddUser refetch={refetch} setIsOpen={setIsOpen} isOpen={isOpen} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, padding: 5 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                To'liq ism
              </TableCell>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                Tel raqami
              </TableCell>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.data?.map((item, index) => (
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
                  {item.fullname}
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
                  {item.phone}
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
                      navigate(`/user/detail?userId=${item.id}`);
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
                      await axios.delete(`/user/${item.id}`);
                      refetch();
                    }}
                    aria-label="delete"
                    size="medium"
                  >
                    <img src={iconDelete} alt="" />
                  </IconButton>
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

export default User;
