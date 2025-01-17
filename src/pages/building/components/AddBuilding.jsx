import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAxios } from "../../../hooks/useAxios";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Commet } from "react-loading-indicators";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";
import { useDispatch } from "react-redux";
import { setBuildingId } from "../../../store/slices/buildingSlice";
import { useQuery, useQueryClient } from "react-query";
import { saveState } from "../../../Utils/storage";
import { toast } from "react-toastify";
// import { LocationPicker } from "./Map";
// Leaflet uchun marker tuzatish
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Toshkent markazi
const center = {
  lat: 41.2995,
  lng: 69.2401,
};

function AddBuilding() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, setValue, formState, setError } = useForm();
  const [districts, setDistricts] = useState([]);
  const [position, setPosition] = useState([center.lat, center.lng]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, error, isLoading } = useQuery("region", () =>
    axios.get("/region").then((res) => res.data)
  );

  const fetchDistricts = async (id) => {
    try {
      const { data: findRegion } = await axios.get(`/region/${id}`);
      setDistricts(findRegion.data.district || []);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const MapClick = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        setValue("location", `${lat}, ${lng}`);
      },
    });
    return null;
  };

  const onSubmit = async (formData) => {
    if (+formData.apartments_count <= +formData.entrance_count) {
      setError("apartments_count", {
        type: "manual",
        message: "Xonadonlar soni noto'gri",
      });
      return;
    }
    delete formData.region_id;
    const result = await axios.post("/building", {
      ...formData,
      floor: +formData.floor,
      apartments_count: +formData.apartments_count,
      entrance_count: +formData.entrance_count,
      location: { lat: position[0], lng: position[1] },
    });
    if (result.data.success) {
      dispatch(setBuildingId(result.data.data.id));
      queryClient.invalidateQueries("building");
      navigate(`/building/entrance?buildingId=${result.data.data.id}`);
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-2/3">
        <Commet color="#00BDD6FF" size="medium" text="" textColor="" />
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <button
        type="button"
        onClick={() => navigate("/building")}
        className="bg-inherit px-2 py-2 rounded mr-2 text-3xl"
      >
        <ArrowBackIcon fontSize="medium" />
      </button>

      <form className="w-1/2 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          {/* Viloyat tanlash */}
          <div>
            <label className="block mb-2">Viloyat*</label>
            <select
              {...register("region_id")}
              required={true}
              onChange={(e) => fetchDistricts(e.target.value)}
              className="border p-2 rounded w-full"
              defaultValue=""
            >
              <option value="" disabled>
                Viloyatni tanlang
              </option>
              {data.data?.region?.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">Tuman*</label>
            <select
              {...register("district_id")}
              required={true}
              className="border p-2 rounded w-full"
              defaultValue=""
            >
              <option value="" disabled>
                Tumanni tanlang
              </option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          {/* Manzil */}
          <div>
            <label className="block mb-2">Manzil*</label>
            <input
              type="text"
              placeholder="Amir Temur shox ko'chasi 14a"
              {...register("address")}
              required={true}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-2">Bino nomi*</label>
            <input
              type="text"
              placeholder="14a"
              {...register("name")}
              required={true}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block mb-2">Qavatlar soni*</label>
            <input
              type="number"
              placeholder="5"
              {...register("floor")}
              required={true}
              max={20}
              min={2}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block mb-2">Podyezdlar soni*</label>
            <input
              type="number"
              placeholder="4"
              {...register("entrance_count")}
              required={true}
              min={1}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block mb-2">Xonadonlar soni*</label>
            <input
              type="number"
              placeholder="100"
              {...register("apartments_count")}
              required={true}
              min={1}
              className={`border p-2 rounded w-full ${
                formState.errors.apartments_count ? "border-red-500" : ""
              }`}
            />
            {formState.errors.apartments_count && (
              <p className="text-red-500 text-sm mt-1">
                {formState.errors.apartments_count.message}
              </p>
            )}
          </div>

          <div className="col-span-2">
            <label className="block mb-2">Location*</label>
            <div style={{ height: "350px", width: "100%" }}>
              <input type="" />
              <MapContainer
                center={[41.2995, 69.2401]}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <MapClick />
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                  <Popup>
                    Tanlangan joy: {position[0]}, {position[1]}
                  </Popup>
                </Marker>
              </MapContainer>{" "}
              *
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="bg-primary-500 text-white px-4 py-2 rounded"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? "Loading..." : "Submit"}
            {formState.isSubmitting ? null : (
              <KeyboardTabIcon fontSize="medium" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBuilding;
