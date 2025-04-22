import { Button, Modal } from "@mui/material";
import React, { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import Visibility from "../../../assets/visibility.svg";
import VisibilityOff from "../../../assets/visibilityOff.svg";

function EditEntrance({ showEntrance, setShowEntrance, refetch }) {
  if (!showEntrance.isOpen) return null;
  const [loading, setLoading] = React.useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = async (formData) => {
    setLoading(true);
    await axios.put(`/entrance/${showEntrance.data.id}`, {
      ...formData,
      first_apartment_number: +formData.first_apartment_number,
      last_apartment_number: +formData.last_apartment_number,
    });
    refetch();
    reset();
    setShowEntrance({ isOpen: false });
    setLoading(false);
  };

  return (
    <Modal
      hideBackdrop={false}
      open={showEntrance.isOpen}
      onClose={() => setShowEntrance({ isOpen: false })}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form
        className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 w-96 p-10 rounded-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="block mb-2">Podyezd nomi</label>
          <input
            type="text"
            placeholder="padyez nomi"
            {...register("name")}
            required={true}
            className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            defaultValue={showEntrance.data.name}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Kvartira raqami</label>
            <input
              type="number"
              placeholder="dan"
              {...register("first_apartment_number")}
              required={true}
              min={1}
              className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              defaultValue={showEntrance.data.first_apartment_number}
            />
          </div>
          <div>
            <label className="block mb-2 opacity-0">*</label>
            <input
              type="number"
              placeholder="gacha"
              {...register("last_apartment_number")}
              required={true}
              min={1}
              className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              defaultValue={showEntrance.data.last_apartment_number}
            />
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <Button
            variant="outlined"
            onClick={() => setShowEntrance({ isOpen: false })}
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
            sx={{
              borderRadius: "4px",
            }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default EditEntrance;
