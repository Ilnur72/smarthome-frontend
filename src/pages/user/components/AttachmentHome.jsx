import React from "react";
import { Modal, Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useQuery } from "react-query";
import axios from "axios";
import { loadState } from "../../../Utils/storage";
import { jwtDecode } from "jwt-decode";

function AttachmentHomeModal({ isOpen, setIsOpen, refetch, userIdFromParams }) {
  const { register, handleSubmit, reset, control, setValue, formState } =
    useForm();

  const token = loadState("token");
  const { user } = jwtDecode(token);

  const [entrance, setEntrance] = React.useState([]);
  const [apartments, setApartment] = React.useState([]);

  const { data: buildingData, isLoading } = useQuery("building", () =>
    axios
      .get(`/building?sort[by]=name&sort[order]=ASC`)
      .then((res) => res.data)
      .catch((e) => console.log(e))
  );

  const onSubmit = async (formData) => {
    try {
      await axios.post("/user-apartment", {
        user_id: userIdFromParams,
        apartment_id: formData.apartment_id.value,
      });
      refetch();
      reset();
      setIsOpen(false);
    } catch (error) {
      if (error.response?.data.statusCode === 400) {
        toast.error(
          typeof error.response.data.message == "object"
            ? error.response.data.message[0]
            : error.response.data.message
        );
      }
    }
  };

  const fetchEntrance = async (id) => {
    try {
      const { data: findEntrance } = await axios.get(`/building/${id}`);
      setEntrance(findEntrance.data.entrances || []);
      setApartment([]);
      setValue("entrance_id", "");
      setValue("apartment_id", "");
    } catch (error) {
      console.error("Error fetching Building:", error);
    }
  };

  const fetchApartment = async (id) => {
    try {
      const { data: findEntrance } = await axios.get(`/entrance/${id}`);
      setApartment(findEntrance.data.apartments || []);
      setValue("apartment_id", "");
    } catch (error) {
      console.error("Error fetching entrance:", error);
    }
  };
  return (
    <Modal
      hideBackdrop={false}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form
        className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 w-96 p-10 rounded-xl "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="block mb-2">Binoni tanlang*</label>
          <Controller
            name="building_id"
            control={control} // control props
            render={({ field }) => (
              <Select
                {...field} // controller field
                options={
                  isLoading ||
                  buildingData.data?.buildings?.map((item) => {
                    return { value: item.id, label: item.name };
                  })
                } // building options
                onChange={(e) => {
                  field.onChange(e); // onChange uchun field ni ishlatish
                  fetchEntrance(e.value); // Building tanlanganda Entrance ma'lumotlarini olib kelish
                }}
                placeholder="Building tanlang"
                isSearchable // Qidiruv imkoniyati
              />
            )}
          />
        </div>
        <div>
          <label className="block mb-2">Podyezni tanlang*</label>
          <Controller
            name="entrance_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={entrance?.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                onChange={(e) => {
                  field.onChange(e);
                  fetchApartment(e.value); // Entrance tanlanganda Apartmentsni olib kelish
                }}
                placeholder="Podyezni tanlang"
                isSearchable
              />
            )}
          />
        </div>
        <div>
          <label className="block mb-2">Xonadonni tanlang*</label>
          <Controller
            name="apartment_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={apartments?.map((item) => ({
                  value: item.id,
                  label: item.number,
                }))}
                onChange={field.onChange}
                placeholder="Xonadonni tanlang"
                isSearchable
              />
            )}
          />
        </div>

        <div className="flex justify-between mt-4">
          <Button
            variant="outlined"
            onClick={() => {
              setIsOpen(false);
              reset();
            }}
            type="button"
            sx={{
              color: "#00BDD6FF",
              borderColor: "#00BDD6FF",
              borderRadius: "4px",
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={formState.isSubmitting}
            sx={{
              background: "#00BDD6FF",
              color: "#fff",
              borderRadius: "4px",
            }}
          >
            {formState.isSubmitting ? "Loading..." : "submit"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default AttachmentHomeModal;
