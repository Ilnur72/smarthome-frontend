import { Button, Modal } from "@mui/material";
import React, { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import Visibility from "../../../assets/visibility.svg";
import VisibilityOff from "../../../assets/visibilityOff.svg";

function EditIntercom({ showIntercom, setShowIntercom, refetch }) {
  if (!showIntercom.isOpen) return null;
  const [loading, setLoading] = React.useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = async (formData) => {
    setLoading(true);
    await axios.put(`/intercom/${showIntercom.data.id}`, formData);
    refetch();
    reset();
    setShowIntercom({ isOpen: false });
    setLoading(false);
  };

  return (
    <Modal
      hideBackdrop={false}
      open={showIntercom.isOpen}
      onClose={() => setShowIntercom({ isOpen: false })}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form
        className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 w-96 p-10 rounded-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="block mb-2">Model nomi</label>
          <input
            type="text"
            placeholder="padyez nomi"
            {...register("model")}
            required={true}
            className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            defaultValue={showIntercom.data.model}
          />
        </div>

        <div>
          <label className="block mb-2">SIP manzili</label>
          <input
            type="string"
            placeholder="IP address"
            {...register("sip")}
            required={true}
            min={1}
            className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            defaultValue={showIntercom.data.sip}
          />
        </div>

        <div>
          <label className="block mb-2">Stream IP manzili</label>
          <input
            type="string"
            placeholder="IP address"
            {...register("stream_ip")}
            required={true}
            min={1}
            className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            defaultValue={showIntercom.data.stream_link}
          />
        </div>

        <div>
          <label className="block mb-2">Status*</label>
          <select
            {...register("status")}
            required={true}
            className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            defaultValue={showIntercom.data.status}
          >
            <option defaultChecked value={"active"}>
              ACTIVE
            </option>
            <option value={"inactive"}>INACTIVE</option>
            <option value={"maintenance"}>MAINTENANCE</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Domofon IP</label>
          <input
            type="string"
            placeholder="IP address"
            {...register("device_ip")}
            required={true}
            min={1}
            className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            defaultValue={showIntercom.data.device_ip}
          />
        </div>

        <div>
          <label className="block mb-2">Login</label>
          <input
            type="string"
            placeholder="Login"
            {...register("device_login")}
            required={true}
            min={1}
            className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            defaultValue={showIntercom.data.device_login}
          />
        </div>
        <div>
          <label className="block mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="*****"
              {...register("device_password")}
              required={true}
              min={1}
              className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              defaultValue={showIntercom.data.device_password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <img
                width={20}
                src={showPassword ? VisibilityOff : Visibility}
                alt=""
              />
            </button>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <Button
            variant="outlined"
            onClick={() => setShowIntercom({ isOpen: false })}
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

export default EditIntercom;
