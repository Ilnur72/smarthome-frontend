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

function ListOperatorBuilding({ data, refetch }) {
  const [loadingId, setLoadingId] = useState(null);
  console.log(data);
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
              sx={{
                fontSize: 16,
                fontWeight: 800,
                color: "#092C4C",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              align="left"
            >
              Bino raqami
            </TableCell>
            <TableCell
              sx={{
                fontSize: 16,
                fontWeight: 800,
                color: "#092C4C",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              align="center"
            >
              Viloyat
            </TableCell>
            <TableCell
              sx={{
                fontSize: 16,
                fontWeight: 800,
                color: "#092C4C",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              align="center"
            >
              Tuman
            </TableCell>
            <TableCell
              sx={{
                fontSize: 16,
                fontWeight: 800,
                color: "#092C4C",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              align="center"
            >
              Qavatlar soni
            </TableCell>
            <TableCell
              sx={{
                fontSize: 16,
                fontWeight: 800,
                color: "#092C4C",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              align="center"
            >
              Padezlar soni
            </TableCell>
            <TableCell
              sx={{
                fontSize: 16,
                fontWeight: 800,
                color: "#092C4C",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              align="center"
            >
              Xonadonlar soni
            </TableCell>
            <TableCell
              sx={{
                fontSize: 16,
                fontWeight: 800,
                color: "#092C4C",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              align="center"
            >
              Uy manzili
            </TableCell>
            <TableCell
              sx={{
                fontSize: 16,
                fontWeight: 800,
                color: "#092C4C",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              align="center"
            >
              action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.buildings?.map((item) => (
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
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: 150,
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
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: 170,
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
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: 170,
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
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: 170,
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
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: 170,
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
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: 170,
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
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: 170,
                }}
                align="center"
              >
                {item.address.street}
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

export default ListOperatorBuilding;
