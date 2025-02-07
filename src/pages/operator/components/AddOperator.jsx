import { Button, Modal } from "@mui/material";
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";

function AddOperator({ refetch, setIsOpen, isOpen }) {
  const { register, handleSubmit, reset, formState } = useForm();

  const onSubmit = async (formData) => {
    try {
      const result = await axios.post("/operator", {
        email: formData.email,
        name: formData.name,
        password: formData.password,
      });

      if (result.data.success) {
        refetch();
        reset();
        setIsOpen(false);
      }
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
          <label className="block mb-2">Shirkat nomi*</label>
          <input
            type="text"
            placeholder="Shirkat nomi"
            {...register("name")}
            required={true}
            className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2">Email*</label>
          <input
            type="email"
            placeholder="email"
            {...register("email")}
            required={true}
            min={1}
            className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2">Password*</label>
          <input
            type="text"
            placeholder="password"
            {...register("password")}
            required={true}
            className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
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

export default AddOperator;
