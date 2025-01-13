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
            className="border p-2 rounded w-full"
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
              className="border p-2 rounded w-full"
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
              className="border p-2 rounded w-full"
              defaultValue={showEntrance.data.last_apartment_number}
            />
          </div>
        </div>

        <div>
          <label className="block mb-2">Domofon IP</label>
          <input
            type="string"
            placeholder="IP address"
            {...register("intercom_ip")}
            required={true}
            min={1}
            className="border p-2 rounded w-full"
            defaultValue={showEntrance.data.intercom_ip}
          />
        </div>

        <div>
          <label className="block mb-2">Login</label>
          <input
            type="string"
            placeholder="Login"
            {...register("intercom_login")}
            required={true}
            min={1}
            className="border p-2 rounded w-full"
            defaultValue={showEntrance.data.intercom_login}
          />
        </div>
        <div>
          <label className="block mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="*****"
              {...register("intercom_password")}
              required={true}
              min={1}
              className="border p-2 rounded w-full"
              defaultValue={showEntrance.data.intercom_password}
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
            onClick={() => setShowEntrance({ isOpen: false })}
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

export default EditEntrance;
