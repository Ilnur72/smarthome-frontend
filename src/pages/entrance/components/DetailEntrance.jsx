import React from "react";
import {
  Button,
  Paper,
  Typography,
  Box,
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { Commet } from "react-loading-indicators";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ListApartment from "./ListApartment";
import AttachmentUser from "./AttachmentUserModal";
import { Plus } from "lucide-react";
import AddIntercom from "../../intercom/components/AddIntercom";
import EditIntercom from "../../intercom/components/EditIntercom";

function EntranceDetail() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const entranceIdFromParams = queryParams.get("entranceId");
  const buildingIdFromParams = queryParams.get("buildingId");

  const [showIntercom, setShowIntercom] = React.useState({ isOpen: false });
  const [isOpen, setIsOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [intercomToDelete, setIntercomToDelete] = React.useState(null);

  const { data, error, isLoading, refetch } = useQuery(
    "entrance-detail",
    () =>
      axios.get(`/entrance/${entranceIdFromParams}`).then((res) => res.data),
    { keepPreviousData: true, refetchOnWindowFocus: false }
  );
  console.log(data);

  const handleDeleteClick = (intercomId) => {
    setIntercomToDelete(intercomId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const result = await axios.delete(`/intercom/${intercomToDelete}`);
      console.log(result.data);
      
      setDeleteModalOpen(false);
      refetch();
    } catch (error) {
      console.error("Error deleting intercom:", error);
    }
  };

  async function showData(id) {
    const { data } = await axios.get(`/intercom/${id}`);

    setShowIntercom({ isOpen: true, data: data.data });
  }

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-2/3">
        <Commet color="#00BDD6FF" size="medium" text="" textColor="" />
      </div>
    );

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        <div className=" bg-white rounded-lg shadow-sm border-b border-gray-200 p-3">
          <div className="flex items-start justify-between bg-white rounded-lg p-3">
            <div className="bg-white rounded-lg  p-3">
              <h2 className="mb-2">Podyezd va domofon ma'lumotlari</h2>
              <p className="font-normal">
                <strong className="text-gray-700">Kamera IP manzili:</strong>
                {data.data?.name}
              </p>
              <p className="font-normal">
                <strong className="text-gray-700">Xonadon raqami:</strong>
                {data.data.first_apartment_number +
                  "-" +
                  data.data.last_apartment_number}
              </p>
              {data.data.intercom ? (
                <>
                  <p className="font-normal">
                    <strong className="text-gray-700">Intercom model:</strong>
                    {data.data.intercom.model}
                  </p>
                  <p className="font-normal">
                    <strong className="text-gray-700">SIP manzili:</strong>
                    {data.data.intercom.sip}
                  </p>
                  <p className="font-normal">
                    <strong className="text-gray-700">Stream manzili:</strong>
                    {data.data.intercom.stream_link}
                  </p>
                  <p className="font-normal">
                    <strong className="text-gray-700">
                      Domofon IP manzili:
                    </strong>
                    {data.data.intercom.device_ip}
                  </p>
                  <p className="font-normal">
                    <strong className="text-gray-700">Domofon login:</strong>
                    {data.data.intercom.device_login}
                  </p>
                  <p className="font-normal">
                    <strong className="text-gray-700">Domofon parol:</strong>
                    {data.data.intercom.device_password}
                  </p>
                </>
              ) : null}
            </div>

            <button
              onClick={() => {
                setIsOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Domofon qo'shish
            </button>
          </div>
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              justifyContent: "space-between",
              padding: 2,
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(-1)}
              >
                <ArrowBackIcon fontSize="medium" />
                Back
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => showData(data.data.intercom.id)}
                disabled={!data.data.intercom}
              >
                Edit intercom
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                color="error"
                onClick={() =>
                  data.data.intercom && handleDeleteClick(data.data.intercom.id)
                }
                disabled={!data.data.intercom}
              >
                Delete intercom
              </Button>
            </Box>
          </Box>
        </div>
        <Dialog
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        >
          <DialogTitle>Domofonni o'chirish</DialogTitle>
          <DialogContent>
            <Typography>
              Haqiqatan ham bu domofonni o'chirmoqchimisiz? Bu amaliyot qaytarib
              bo'lmaydi.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteModalOpen(false)} color="primary">
              Bekor qilish
            </Button>
            <Button onClick={confirmDelete} color="error" variant="contained">
              O'chirish
            </Button>
          </DialogActions>
        </Dialog>

        <AddIntercom
          entranceId={entranceIdFromParams}
          isOpen={isOpen}
          refetch={refetch}
          setIsOpen={setIsOpen}
        />
        <EditIntercom
          refetch={refetch}
          setShowIntercom={setShowIntercom}
          showIntercom={showIntercom}
        />
        <ListApartment data={data.data} refetch={refetch} />
      </div>
    </div>
  );
}
export default EntranceDetail;
