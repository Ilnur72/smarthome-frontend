import React from "react";
import {
  Button,
  Checkbox,
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
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddUser from "../../user/components/AddUser";
import { useQuery, useQueryClient } from "react-query";
import { Commet } from "react-loading-indicators";
import axios from "axios";
import { loadState } from "../../../Utils/storage";
import { jwtDecode } from "jwt-decode";

function AttachmentUser() {
  const queryParams = new URLSearchParams(location.search);
  const queryClient = useQueryClient();
  const apartmentIdFromParams = queryParams.get("apartmentId");

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [row, setRow] = React.useState(10);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);
  const [search, setSearch] = React.useState("");

  // const token = loadState("token");
  // const { user } = jwtDecode(token);

  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery(
    ["user", search, page, row],

    () =>
      axios
        .get(
          `/user?page[offset]=${page}&page[limit]=${row}&sort[by]=created_at&sort[order]=DESC&search=${search}`
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

  async function handleSave() {
    setIsSubmitting(true);
    const result = await axios.post("/user-apartment", {
      user_id: selectedId,
      apartment_id: apartmentIdFromParams,
    });
    if (result.data.success) {
      queryClient.invalidateQueries("entrance-detail");
      navigate(-1);
    }
    setIsSubmitting(false);
  }

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
        <h2 className="text-xl font-bold">Foydalanuvchilar</h2>
        <div className="flex items-center">
          <TextField
            size="small"
            placeholder="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className={`bg-primary-500 text-white px-4 py-2 rounded ml-2`}
          >
            Yangi user qo'shish
          </button>
        </div>
      </div>
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
            {search && data?.data?.data?.length > 0 ? (
              data?.data.data?.map((item, index) => (
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
                    <Checkbox
                      checked={selectedId === item.id}
                      onChange={() =>
                        setSelectedId((prevSelectedId) =>
                          prevSelectedId === item.id ? null : item.id
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  sx={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#092C4C",
                    paddingY: 1,
                  }}
                  align="center"
                >
                  {search
                    ? "Foydalanuvchilar topilmadi"
                    : "Qidiruv uchun so‘z kiriting"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        align="center"
        className="flex justify-between items-center py-2 px-4"
      >
        <Button
          variant="contained"
          color="inherit"
          onClick={() => navigate(-1)}
        >
          back
        </Button>
        <div className="flex">
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
        <Button
          variant="contained"
          color="primary"
          disabled={selectedId ? false : true}
          onClick={() => handleSave()}
        >
          {isSubmitting ? "Loading..." : "submit"}
        </Button>
      </div>
    </div>
  );
}

export default AttachmentUser;
