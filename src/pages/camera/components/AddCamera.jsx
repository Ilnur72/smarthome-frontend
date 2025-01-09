import axios from "axios";
import { Check } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { Commet } from "react-loading-indicators";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function NewIntercom() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [selectedEntrance, setSelectedEntrance] = React.useState([]);
  const queryParams = new URLSearchParams(location.search);

  const buildingIdFromParams = queryParams.get("buildingId");

  const { data, error, isLoading, refetch } = useQuery("entrance", () =>
    axios
      .get(`/entrance?filters[building_id]=${buildingIdFromParams}`)
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
    const result = await axios.post("/camera", {
      ...data,
      entrance_ids: selectedEntrance,
      building_id: buildingIdFromParams,
    });
    if (result.data.success) {
      setSelectedEntrance([]);
      reset();
    }
  };
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-2/3">
        <Commet color="#00BDD6FF" size="medium" text="" textColor="" />
      </div>
    );
  return (
    <div className="p-6 bg-white rounded-lg">
      <button
        type="button"
        onClick={() =>
          navigate(`/building/detail?buildingId=${buildingIdFromParams}`)
        }
        className="bg-inherit px-2 py-2 rounded mr-2 text-3xl"
      >
        <ArrowBackIcon fontSize="medium" />
      </button>
      <form className="w-1/2 mx-auto pt-10" onSubmit={handleSubmit(onSubmit)}>
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
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Podyezdlar
          </label>
          <div className="grid grid-cols-3 gap-2 p-8">
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
                      className={`flex h-6 w-6 items-center justify-center rounded-full border-black border-2 bg-white transition-all ${
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
        <button
          type="submit"
          className="mt-4 bg-primary-500 text-white px-4 py-2 rounded"
        >
          Saqlash
        </button>
      </form>
    </div>
  );
}

export default NewIntercom;
