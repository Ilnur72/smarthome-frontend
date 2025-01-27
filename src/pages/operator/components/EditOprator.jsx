import { Button, Modal } from "@mui/material";
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

function EditOperator({ showOperator, setShowOperator, refetch }) {
  if (!showOperator.isOpen) return null;
  const [loading, setLoading] = React.useState(false);
  const { register, handleSubmit, reset } = useForm();
  console.log(showOperator);
  
  const onSubmit = async (formData) => {
    setLoading(true);
    await axios.put(`/operator/${showOperator.data.id}`, formData);
    reset();
    refetch();
    setLoading(false);
    setShowOperator({ isOpen: false });
  };

  return (
    <Modal
      hideBackdrop={false}
      open={showOperator.isOpen}
      onClose={() => setShowOperator({ isOpen: false })}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form
        className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 w-96 p-10 rounded-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="block mb-2">Shirkat nomi*</label>
          <input
            type="text"
            placeholder="Shirkat nomi"
            {...register("name")}
            required={true}
            className="border p-2 rounded w-full"
            defaultValue={showOperator.data.name}
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
            className="border p-2 rounded w-full"
            defaultValue={showOperator.data.email}

          />
        </div>
        {/* <div>
          <label className="block mb-2">Password*</label>
          <input
            type="text"
            placeholder="password"
            {...register("password")}
            required={true}
            className="border p-2 rounded w-full"
            defaultValue={showOperator.data.password}

          />
        </div> */}
        <div className="flex justify-between mt-4">
          <Button
            variant="outlined"
            onClick={() => setShowOperator({ isOpen: false })}
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

export default EditOperator;
