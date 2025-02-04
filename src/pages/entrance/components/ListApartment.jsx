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
import { Trash2 } from "lucide-react";

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
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
              Uy raqami
            </th>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
              Foydalanuvchi
            </th>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
              Telefon raqami
            </th>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data?.apartments?.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-center">{item.number}</td>
              <td className="px-6 py-4 text-center">
                {" "}
                {item.userApartments.length
                  ? item.userApartments[0].user.fullname
                  : ""}
              </td>
              <td className="px-6 py-4 text-center">
                {item.userApartments.length
                  ? item.userApartments[0].user.phone
                  : ""}
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex justify-center gap-3">
                  {item.userApartments.length ? (
                    // <IconButton
                    //   sx={{
                    //     width: "35px",
                    //     height: "35px",
                    //     border: "1px solid #EAEEF4",
                    //     "&:hover": {
                    //       backgroundColor: "#00BDD6FF",
                    //       "& > img": {
                    //         filter: "brightness(2000%)",
                    //       },
                    //     },
                    //   }}
                    //   onClick={async () => {
                    //     await axios.delete(
                    //       `/user-apartment/${
                    //         item.userApartments.length
                    //           ? item.userApartments[0].id
                    //           : ""
                    //       }`
                    //     );
                    //     refetch();
                    //   }}
                    //   aria-label="delete"
                    //   size="medium"
                    // >
                    //   <img src={iconDelete} alt="" />
                    // </IconButton>
                    <button
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
                      className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-gray-500 " />
                    </button>
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
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <TableContainer component={Paper}>
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
      </TableContainer> */}
    </div>
  );
}

export default ListApartment;
