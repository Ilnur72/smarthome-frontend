import axios from "axios";
import { Check } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { Commet } from "react-loading-indicators";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Modal } from "@mui/material";

function EditCamera({ refetch, buildingId, setShowCamera, showCamera }) {
  const { register, handleSubmit, reset, formState } = useForm();
  const navigate = useNavigate();

  let camera;
  if (showCamera.data) camera = showCamera.data;

  const [selectedEntrance, setSelectedEntrance] = React.useState(
    camera.entrance_ids || []
  );

  const { data, error, isLoading } = useQuery("entrance", () =>
    axios
      .get(`/entrance?filters[building_id]=${buildingId}`)
      .then((res) => res.data)
  );

  const handleEntranceToggle = (entrance) => {
    setSelectedEntrance((prev) =>
      prev.includes(entrance)
        ? prev.filter((item) => item !== entrance)
        : [...prev, entrance]
    );
  };

  const onSubmit = async (data) => {
    const result = await axios.put(`/camera/${camera.id}`, {
      ...data,
      entrance_ids: selectedEntrance,
    });
    if (result.data.success) {
      setSelectedEntrance([]);
      reset();
      setShowCamera({ isOpen: false });
      refetch();
    }
  };

  if (isLoading) return;

  return (
    <Modal
      hideBackdrop={false}
      open={showCamera.isOpen}
      onClose={() => setShowCamera({ isOpen: false })}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form
        className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 w-96 p-10 rounded-xl "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Camera IP*
            </label>
            <input
              type="text"
              {...register("ip_address", { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="IP"
              defaultValue={camera.ip_address}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Camera login*
            </label>
            <input
              type="text"
              {...register("login", { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Login"
              defaultValue={camera.login}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Camera password*
          </label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Password"
            defaultValue={camera.password}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Podyezdlar
          </label>
          <div
            className="grid grid-cols-3 gap-4 p-8"
            style={{
              gridTemplateColumns: `repeat(auto-fit, minmax(100px, 1fr))`,
            }}
          >
            {data.data?.entrance.map((entrance, index) => (
              <div key={index} className="flex items-center justify-center">
                <label className="group relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={selectedEntrance.includes(entrance.id)}
                    onChange={() => handleEntranceToggle(entrance.id)}
                  />
                  <div className="flex items-center gap-2">
                    <div
                      className={`relative flex h-12 items-center rounded-lg border border-gray-300 bg-white px-4 shadow-sm transition-all hover:bg-gray-50`}
                    >
                      <span className="text-sm font-medium text-gray-700">
                        {entrance.name}
                      </span>
                    </div>
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full border-black border-2 transition-all ${
                        selectedEntrance.includes(entrance.id)
                          ? "border-black bg-black "
                          : "text-gray-600"
                      }`}
                    >
                      <Check
                        className={`h-4 w-4  transition-opacity ${
                          selectedEntrance.includes(entrance.id)
                            ? "text-white"
                            : "text-black"
                        }`}
                      />
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <Button
            variant="outlined"
            onClick={() => setShowCamera({ isOpen: false })}
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

export default EditCamera;
