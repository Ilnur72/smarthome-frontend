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
import React, { useState } from "react";
import iconDelete from "../../../assets/ActionIcon/delete.svg";
import axios from "axios";

function ListUserApartment({ data, refetch }) {
  const [loadingId, setLoadingId] = useState(null);

  const handleDelete = async (id) => {
    try {
      setLoadingId(id);
      await axios.delete(`/user-apartment/${id}`);
      refetch();
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, padding: 5 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
              align="center"
            >
              Bino raqami
            </TableCell>
            <TableCell
              sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
              align="center"
            >
              Podyezd raqami
            </TableCell>
            <TableCell
              sx={{ fontSize: 16, fontWeight: 800, color: "#092C4C" }}
              align="center"
            >
              Uy raqami raqami
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
          {data.data?.map((item) => (
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
                {item.apartment?.entrance?.buildings?.name}
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
                {item.apartment.entrance.name}
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
                {item.apartment.number}
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
                  onClick={() => handleDelete(item.id)}
                  aria-label="delete"
                  size="medium"
                  disabled={loadingId === item.id}
                >
                  <img src={iconDelete} alt="" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListUserApartment;
