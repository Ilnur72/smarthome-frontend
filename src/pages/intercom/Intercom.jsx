import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
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
import iconDelete from "../../assets/ActionIcon/delete.svg";
import iconEdit from "../../assets/ActionIcon/edit.svg";
import iconView from "../../assets/ActionIcon/view.svg";
import AddIntercom from "./components/AddIntercom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIntercom from "./components/EditIntercom";
import { loadState } from "../../Utils/storage";
import { jwtDecode } from "jwt-decode";

function Intercom() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const queryParams = new URLSearchParams(location.search);
  const buildingIdFromParams = queryParams.get("buildingId");

  const token = loadState("token");
  const { user } = jwtDecode(token);

  const [showIntercom, setShowIntercom] = React.useState({ isOpen: false });

  async function showData(id) {
    const { data } = await axios.get(`/intercom/${id}`);

    setShowIntercom({ isOpen: true, data: data.data });
  }

  const { data, error, isLoading, refetch } = useQuery("intercom", () =>
    axios
      .get(
        `/intercom?filters[building_id]=${buildingIdFromParams}&sort[by]=created_at&sort[order]=DESC`
      )
      .then((res) => res.data)
      .catch((e) => {
        if (e.response?.status === 401) navigate("/login");
      })
  );
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-2/3">
        <Commet color="#00BDD6FF" size="medium" text="" textColor="" />
      </div>
    );

  return (
    <div>
      <div className="bg-white shadow p-4 mx-auto flex justify-between items-center">
        <h2 className="text-xl font-bold">Podyezlar</h2>
        <div className="flex items-center">
          {user.role === "SYSTEM_ADMIN" ? (
            <button
              onClick={() => {
                setIsOpen(true);
              }}
              className={`bg-primary-500 text-white px-4 py-2 rounded ml-2`}
            >
              Podyez qo'shish
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
        <div className="flex items-center pb-2"></div>
      </div>
      <AddIntercom
        refetch={refetch}
        buildingId={buildingIdFromParams}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        lastApartmentNumber={
          data.data?.intercom ? data.data.intercom[0]?.last_apartment_number : 1
        }
      />
      <EditIntercom
        showIntercom={showIntercom}
        setShowIntercom={setShowIntercom}
        refetch={refetch}
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
            {data.data.intercom?.map((item, index) => (
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
                        `detail?intercomId=${item.id}&buildingId=${buildingIdFromParams}`
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
                        await axios.delete(`/intercom/${item.id}`);
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
    </div>
  );
}

export default Intercom;
