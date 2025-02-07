import { Button, Modal } from "@mui/material";
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

function EditOperator({ showOperator, setShowOperator, refetch }) {
  if (!showOperator.isOpen) return null;
  const [isChange, setIsChange] = React.useState(false);
  const { register, handleSubmit, reset, formState } = useForm();

  const onSubmit = async (formData) => {
    await axios.put(`/operator/${showOperator.data.id}`, formData);
    reset();
    refetch();
    setShowOperator({ isOpen: false });
  };

  const handleChangePassword = () => {
    setIsChange(!isChange);
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
            className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
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
            className="border p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
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
        <div className="justify-between mt-4 grid grid-cols-1 gap-3">
          {isChange ? (
            <div className="flex items-center gap-2 transition-transform duration-300 ease-in-out transform translate-x-0">
              <Button
                variant="outlined"
                onClick={handleChangePassword}
                type="button"
                sx={{
                  borderRadius: "4px",
                }}
              >
                Back
              </Button>
              <input
                type="password"
                placeholder="New Password"
                {...register("password")}
                className="border h-full px-2 rounded w-full focus:outline-none focus:border-blue-500"
              />
            </div>
          ) : (
            <Button
              onClick={handleChangePassword}
              type="button"
              variant="contained"
              disabled={formState.isSubmitting}
              color="secondary"
              sx={{
                color: "#fff",
                borderRadius: "4px",
              }}
              className="transition-transform duration-300 ease-in-out transform"
            >
              {formState.isSubmitting ? "Loading..." : "Change Password"}
            </Button>
          )}
          {/* <div></div> */}
          <Button
            type="submit"
            variant="contained"
            sx={{
              borderRadius: "4px",
            }}
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? "Loading..." : "Submit"}
          </Button>
          <Button
            variant="outlined"
            onClick={() => setShowOperator({ isOpen: false })}
            type="button"
            sx={{
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

export default EditOperator;
