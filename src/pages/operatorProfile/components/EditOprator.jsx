import {
  Button,
  IconButton,
  InputAdornment,
  Modal,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Visibility from "../../../assets/visibility.svg";
import VisibilityOff from "../../../assets/visibilityOff.svg";

function EditOperatorProfile({ operator, isOpen, setIsOpen, refetch }) {
  if (!isOpen) return null;
  const [isChange, setIsChange] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const { register, handleSubmit, reset, formState } = useForm();

  const onSubmit = async (formData) => {
    if (!isChange) delete formData.password;
    await axios.put(`/operator/${operator.id}`, formData);
    reset();
    refetch();
    setIsOpen(false);
  };

  const handleChangePassword = () => {
    setIsChange(!isChange);
  };

  return (
    <Modal
      hideBackdrop={false}
      open={isOpen}
      onClose={() => setIsOpen({ isOpen: false })}
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
            defaultValue={operator.name}
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
            defaultValue={operator.email}
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
            defaultValue={operator.password}

          />
        </div> */}
        <div className="justify-between mt-4 grid grid-cols-1 gap-3">
          {isChange ? (
            <div className="flex items-center h-9 gap-2 transition-transform duration-300 ease-in-out transform translate-x-0">
              <Button
                variant="outlined"
                onClick={handleChangePassword}
                type="button"
                sx={{
                  color: "#00BDD6FF",
                  borderColor: "#00BDD6FF",
                  borderRadius: "4px",
                }}
              >
                Back
              </Button>
              <OutlinedInput
                {...register("password", { required: true })}
                sx={{
                  borderRadius: "4px",
                  height: "100%",
                  borderColor: "#00BDD6FF",
                  outline: "none",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e0e0e0",
                  },
                }}
                size="small"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      <img
                        width={20}
                        src={showPassword ? VisibilityOff : Visibility}
                      />
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="password"
              />
            </div>
          ) : (
            <Button
              onClick={handleChangePassword}
              type="button"
              variant="contained"
              color="secondary"
              sx={{
                color: "#fff",
                borderRadius: "4px",
              }}
              className="transition-transform duration-300 ease-in-out transform"
            >
              Change Password
            </Button>
          )}
          {/* <div></div> */}
          <Button
            type="submit"
            variant="contained"
            sx={{
              background: "#00BDD6FF",
              color: "#fff",
              borderRadius: "4px",
            }}
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? "Loading..." : "Submit"}
          </Button>
          <Button
            variant="outlined"
            onClick={() => setIsOpen({ isOpen: false })}
            type="button"
            sx={{
              color: "#00BDD6FF",
              borderColor: "#00BDD6FF",
              borderRadius: "4px",
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default EditOperatorProfile;
