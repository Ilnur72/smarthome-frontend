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

function ListEntrance({ data }) {
  return (
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
          </TableRow>
        </TableHead>
        <TableBody>
          {data.entrance_list?.map((item, index) => (
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListEntrance;
