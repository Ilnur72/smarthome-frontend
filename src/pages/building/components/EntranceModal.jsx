import { Button, Modal } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../store/slices/modalSlice";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";

function EntranceModal({ refetch, buildingId, setIsOpen, isOpen }) {
  // const { isOpen, isClose } = useSelector((state) => state.modal);
  const { register, handleSubmit, reset, formState } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (formData) => {
    formData.building_id = buildingId;
    const result = await axios.post("/entrance", {
      ...formData,
      first_apartment_number: +formData.first_apartment_number,
      last_apartment_number: +formData.last_apartment_number,
    });
    refetch();
    reset();
    setIsOpen(false);
  };

  return (
    <Modal
      hideBackdrop={false}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <div className="w-96 bg-white translate-y-1/2 mx-auto p-10"> */}
      {/* <h1>modal</h1> */}
      <form
        className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 w-96 p-10 rounded-xl "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="block mb-2">Podyezd nomi*</label>
          <input
            type="text"
            placeholder="padyez nomi"
            {...register("name")}
            required={true}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Kvartira raqami*</label>
            <input
              type="number"
              placeholder="dan"
              {...register("first_apartment_number")}
              required={true}
              min={1}
              className="border p-2 rounded w-full"
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
              className="border p-2 rounded w-full"
            />
          </div>
        </div>
        <div>
          <label className="block mb-2">Domofon IP*</label>
          <input
            type="string"
            placeholder="IP address"
            {...register("intercom_ip")}
            required={true}
            min={1}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-2">Login*</label>
          <input
            type="string"
            placeholder="Login"
            {...register("intercom_login")}
            required={true}
            min={1}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-2">Password*</label>
          <input
            type="password"
            placeholder="*****"
            {...register("intercom_password")}
            required={true}
            min={1}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="flex justify-between mt-4">
          <Button
            variant="outlined"
            onClick={() => setIsOpen(false)}
            type="button"
            // className="bg-slate-400 text-white px-4 py-2 rounded"
            sx={{
              // paddingY: "16px",
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
              // paddingY: "16px",
              borderRadius: "4px",
            }}
          >
            {formState.isSubmitting ? "Loading..." : "submit"}
          </Button>
        </div>
      </form>
      {/* </div> */}
    </Modal>
  );
}

export default EntranceModal;
