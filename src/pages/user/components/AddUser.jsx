import { Button, Modal } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { loadState } from "../../../Utils/storage";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "react-query";
import Select from "react-select";
import { toast } from "react-toastify";

function AddUser({ refetch, setIsOpen, isOpen }) {
  const { register, handleSubmit, reset, control, setValue, formState } =
    useForm();
  const [entrance, setEntrance] = useState([]);
  const [apartments, setApartment] = useState([]);

  const token = loadState("token");
  const { user } = jwtDecode(token);

  const onSubmit = async (formData) => {
    try {
      const result = await axios.post("/user", {
        phone: formData.phone,
        email: formData.email,
        fullname: formData.fullname,
      });
      if (result.data.success) {
        const resultUserApartment = await axios.post("/user-apartment", {
          user_id: result.data.data.id,
          apartment_id: formData.apartment_id.value,
        });

        refetch();
        reset();
        setIsOpen(false);
      }
    } catch (error) {
      if (error.response.data?.statusCode === 400) {
        toast.error(error.response.data.message);
      }
    }
  };

  const { data: buildingData, isLoading } = useQuery("building", () =>
    axios
      .get(`/building`)
      .then((res) => res.data)
      .catch((e) => console.log(e))
  );

  const fetchEntrance = async (id) => {
    try {
      const { data: findEntrance } = await axios.get(`/building/${id}`);
      setEntrance(findEntrance.data.entrances || []);
      setApartment([]); // Entrance o'zgarganida apartmentsni tozalash
      setValue("entrance_id", ""); // Entrance ni reset qilish
      setValue("apartment_id", ""); // Apartment ni reset qilish
    } catch (error) {
      console.error("Error fetching Building:", error);
    }
  };

  const fetchApartment = async (id) => {
    try {
      const { data: findEntrance } = await axios.get(`/entrance/${id}`);
      setApartment(findEntrance.data.apartments || []);
      setValue("apartment_id", ""); // Apartmentni reset qilish
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">To'liq ism sharifi*</label>
            <input
              type="text"
              placeholder="Ism Familya"
              {...register("fullname")}
              required={true}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-2">Tel raqami*</label>
            <input
              type="text"
              placeholder="901234567"
              {...register("phone")}
              required={true}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>
        <div>
          <label className="block mb-2">Email*</label>
          <input
            type="email"
            placeholder="email"
            {...register("email")}
            required={true}
            min={1}
            className="border p-2 rounded w-full"
          />
        </div>
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

export default AddUser;
