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
import React from "react";
import iconDelete from "../../../assets/ActionIcon/delete.svg";
import axios from "axios";
import AttachmentUser from "./AttachmentUserModal";

function ListApartment({ data, refetch }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [apartmentId, setApartmentId] = React.useState("");

  return (
    <div>
      <AttachmentUser
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        apartmentId={apartmentId}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, padding: 5 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                Uy raqami
              </TableCell>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                Foydalanuvchi
              </TableCell>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                Telefon raqami
              </TableCell>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              >
                ACTION
              </TableCell>
              <TableCell
                sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
                align="center"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.apartments?.map((item, index) => (
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
                  {item.number}
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
                  {item.userApartments.length
                    ? item.userApartments[0].user.fullname
                    : ""}
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
                  {item.userApartments.length
                    ? item.userApartments[0].user.phone
                    : ""}
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
                  {item.userApartments.length ? (
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
                        await axios.delete(
                          `/user-apartment/${
                            item.userApartments.length
                              ? item.userApartments[0].id
                              : ""
                          }`
                        );
                        refetch();
                      }}
                      aria-label="delete"
                      size="medium"
                    >
                      <img src={iconDelete} alt="" />
                    </IconButton>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setIsOpen(true);
                        setApartmentId(item.id);
                      }}
                    >
                      Userni uyga biriktirish
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ListApartment;
