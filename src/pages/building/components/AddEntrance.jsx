import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Commet } from "react-loading-indicators";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import axios from "axios";
import iconDelete from "../../../assets/ActionIcon/delete.svg";
import iconEdit from "../../../assets/ActionIcon/edit.svg";
import iconView from "../../../assets/ActionIcon/view.svg";
import EntranceModal from "./EntranceModal";

function AddEntrance() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const buildingIdFromParams = queryParams.get("buildingId"); // URL dan building ID ni olish

  const { register, handleSubmit, reset } = useForm();
  const { data, error, isLoading, refetch } = useQuery("entrance", () =>
    axios
      .get(`/entrance?filters[building_id]=${buildingIdFromParams}`)
      .then((res) => res.data)
  );
  console.log(data);

  // useEffect(() => {
  //   if (data) {
  //     setEntrance(data.data); // Olingan ma'lumotlarni saqlash
  //   }
  // }, [data]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-2/3">
        <Commet color="#00BDD6FF" size="medium" text="" textColor="" />
      </div>
    );
  return (
    <div className="">
      <div className="flex items-center justify-between pt-4 pl-4">
        <strong className="font-bold text-base text-primary">
          Total: {data.data.total}
        </strong>
        <div className="flex items-center pb-2">
          {/* <Sort
          filterAndSort={filterAndSort}
          setFilterAndSort={setFilterAndSort}
        /> */}
        </div>
      </div>
      <EntranceModal
        register={register}
        handleSubmit={handleSubmit}
        reset={reset}
        refetch={refetch}
        buildingId={buildingIdFromParams}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, padding: 5 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                Podyezd nomi
              </TableCell>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                Kvartira raqami
              </TableCell>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                Domofon IP
              </TableCell>
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
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.entrance?.map((item, index) => (
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
                  {item.name}
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
                  {item.first_apartment_number +
                    "-" +
                    item.last_apartment_number}
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
                  {item.intercom_ip}
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
                  {item.intercom_login}
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
                  {item.intercom_password}
                </TableCell>
                {/* <TableCell
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#092C4C",
                    paddingY: 0.8,
                  }}
                  align="center"
                >
                  {item.apartments_count}
                </TableCell> */}
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
                    // onClick={() => {
                    //   navigate(`/users/${item.id}`);
                    // }}
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
                    // onClick={() => {
                    //   showData(item.id);
                    // }}
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
                      await axios.delete(`/entrance/${item.id}`);
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
    </div>
  );
}

export default AddEntrance;
