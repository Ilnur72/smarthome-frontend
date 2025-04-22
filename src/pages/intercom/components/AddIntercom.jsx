import { Button, Modal } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../store/slices/modalSlice";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function AddIntercom({ refetch, entranceId, setIsOpen, isOpen }) {
  // const { isOpen, isClose } = useSelector((state) => state.modal);
  const { register, handleSubmit, reset, formState } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (formData) => {
    try {
      formData.entrance_id = entranceId;
      const result = await axios.post("/intercom", formData);
      refetch();
      reset();
      setIsOpen(false);
    } catch (error) {
      toast.error(
        typeof error.response.data.message == "object"
          ? error.response.data.message[0]
          : error.response.data.message
      );
      console.log(error.response);
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
      {/* <div className="w-96 bg-white translate-y-1/2 mx-auto p-10"> */}
      {/* <h1>modal</h1> */}
      <form
        className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 w-96 p-10 rounded-xl "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="block mb-2">Model nomi*</label>
          <input
            type="text"
            placeholder="padyez nomi"
            {...register("model")}
            required={true}
            className="pl-2 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2">SIP manzili*</label>
          <input
            type="string"
            placeholder="sip"
            {...register("sip")}
            required={true}
            min={1}
            className="pl-2 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2">Stream IP manzili*</label>
          <input
            type="string"
            placeholder="stream ip"
            {...register("stream_link")}
            required={true}
            min={1}
            className="pl-2 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2">Status*</label>
          <select
            {...register("status")}
            required={true}
            className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            defaultValue=""
          >
            <option defaultChecked value={"active"}>
              ACTIVE
            </option>
            <option value={"inactive"}>INACTIVE</option>
            <option value={"maintenance"}>MAINTENANCE</option>
          </select>
        </div>
        {/* <div>
          <label className="block mb-2">Type*</label>
          <select
            {...register("status")}
            required={true}
            className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            defaultValue=""
          >
            <option defaultChecked value={"hikvision"}>
              HIKVISION
            </option>
          </select>
        </div> */}
        <div>
          <label className="block mb-2">Domofon IP*</label>
          <input
            type="string"
            placeholder="IP address"
            {...register("device_ip")}
            required={true}
            min={1}
            className="pl-2 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2">Login*</label>
          <input
            type="string"
            placeholder="Login"
            {...register("device_login")}
            required={true}
            min={1}
            className="pl-2 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2">Password*</label>
          <input
            type="password"
            placeholder="*****"
            {...register("device_password")}
            required={true}
            min={1}
            className="pl-2 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
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

export default AddIntercom;
