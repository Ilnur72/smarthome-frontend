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
import { useAxios } from "../../hooks/useAxios";
import { Commet, OrbitProgress } from "react-loading-indicators";
import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

function Building() {
  const [page, setPage] = React.useState(1);
  const [row, setRow] = React.useState(10);
  const [loadingDelete, setLoadingDelete] = React.useState(false);
  const navigate = useNavigate();

  // const { data, loading, refetch } = useAxios({
  //   method: "get",
  //   url: "/building",
  // });

  const { data, error, isLoading, refetch } = useQuery(
    "building",
    () => axios.get("/building").then((res) => res.data),
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  console.log(isLoading);
  console.log(data);
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-2/3">
        <Commet color="#00BDD6FF" size="medium" text="" textColor="" />
      </div>
    );
  return (
    <div>
      {/* <CreateForm refetch={refetch} />
    <UpdateForm
      showUser={showUser}
      setShowUser={setShowUser}
      refetch={refetch}
    /> */}
      <div className="flex items-center justify-between pt-4 pl-4">
        <strong className="font-bold text-base text-primary">
          Total: {data?.total}
        </strong>
        <div className="flex items-center pb-2">
          {/* <Sort
          filterAndSort={filterAndSort}
          setFilterAndSort={setFilterAndSort}
        /> */}
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, padding: 5 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="left"
              >
                Shirkat nomi
              </TableCell>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                Viloyat
              </TableCell>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                Tuman
              </TableCell>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                Qavatlar soni
              </TableCell>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                Padezlar soni
              </TableCell>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                Xonadonlar soni
              </TableCell>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                Uy manzili
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
            {data?.data.buildings?.map((item, index) => (
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
                  align="left"
                >
                  {item.operator_name}
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
                  {item.address.region}
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
                  {item.address.district}
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
                  {item.floor}
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
                  {item.entrance_count}
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
                  {item.apartments_count}
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
                  {item.address.region}
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
                      navigate(`/building/detail?buildingId=${item.id}`);
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
                      // navigate(`/building/entrance?buildingId=${item.id}`);
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
                      await axios.delete(`/building/${item.id}`);
                      refetch();
                    }}
                    aria-label="delete"
                    size="medium"
                  >
                    {/* {loadingDelete ? (
                    //   <OrbitProgress
                    //     color="#32cd32"
                    //     size="medium"
                    //     text=""
                    //     textColor=""
                    //   />
                    // ) : ( */}
                    <img src={iconDelete} alt="" />
                    {/* )} */}
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
            count={data?.pageInfo && Math.ceil(data.pageInfo?.total / row)}
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

export default Building;
