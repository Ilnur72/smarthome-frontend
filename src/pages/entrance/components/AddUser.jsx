import { Button, Modal } from "@mui/material";
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { useQueryClient } from "react-query";

function AddUser({
  setIsOpen,
  isOpen,
  apartmentIdFromParams,
  AttachmentUserIsOpen,
}) {
  const { register, handleSubmit, reset, formState } = useForm();
  const queryClient = useQueryClient();
  const onSubmit = async (formData) => {
    try {
      const result = await axios.post("/user", {
        phone: formData.phone,
        fullname: formData.fullname,
      });
      await axios.post("/user-apartment", {
        user_id: result.data?.data?.id,
        apartment_id: apartmentIdFromParams,
      });
      if (result.data.success) {
        queryClient.invalidateQueries("entrance-detail");
        reset();
        setIsOpen(false);
        AttachmentUserIsOpen(false);
      }
    } catch (error) {
      
      if (error.response?.status === 401) navigate("/login");
      if (error.response?.data.statusCode === 400) {
        console.log(error.response.data.message);
        toast.error(
          typeof error.response.data.message == "object"
            ? error.response.data.message[0]
            : error.response.data.message
        );
      }
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
              className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2">Tel raqami*</label>
            <input
              type="text"
              placeholder="901234567"
              {...register("phone", {
                required: "Telefon raqami majburiy",
                minLength: {
                  value: 9,
                  message: "Telefon raqami 9 ta raqamdan iborat bo'lishi kerak",
                },
                maxLength: {
                  value: 9,
                  message: "Telefon raqami 9 ta raqamdan iborat bo'lishi kerak",
                },
              })}
              className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {formState.errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors.phone.message}
              </p>
            )}
          </div>
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
              color: "#514EF3",
              borderColor: "#514EF3",
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
              background: "#514EF3",
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
