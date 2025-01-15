import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

function ListApartment({ data }) {
  return (
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
              Status
            </TableCell>
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
          xs      align="center"
              >
                {item.status === "SOLD_OUT" ? "Sotuvda" : "Sotildi"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListApartment;
