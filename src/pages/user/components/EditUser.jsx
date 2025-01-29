import { Button, Modal } from "@mui/material";
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

function EditUser({ showUser, setShowUser, refetch }) {
  if (!showUser.isOpen) return null;
  const [loading, setLoading] = React.useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (formData) => {
    setLoading(true);
    await axios.put(`/user/${showUser.data.id}`, formData);
    refetch();
    reset();
    setShowUser({ isOpen: false });
    setLoading(false);
  };

  return (
    <Modal
      hideBackdrop={false}
      open={showUser.isOpen}
      onClose={() => setShowUser({ isOpen: false })}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form
        className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 w-96 p-10 rounded-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="block mb-2">To'liq is-sharif</label>
          <input
            type="text"
            placeholder="padyez nomi"
            {...register("fullname")}
            required={true}
            className="border p-2 rounded w-full"
            defaultValue={showUser.data.fullname}
          />
        </div>

        <div>
          <label className="block mb-2">Tel raqam</label>
          <input
            type="string"
            {...register("phone")}
            required={true}
            min={1}
            className="border p-2 rounded w-full"
            defaultValue={showUser.data.phone}
          />
        </div>

        <div className="flex justify-between mt-4">
          <Button
            variant="outlined"
            onClick={() => setShowUser({ isOpen: false })}
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
            sx={{
              background: "#00BDD6FF",
              color: "#fff",
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

export default EditUser;
