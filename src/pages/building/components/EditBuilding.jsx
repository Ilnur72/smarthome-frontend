import { Button, Modal } from "@mui/material";
import React, { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Leaflet marker setup
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function EditBuilding({ showBuilding, setShowBuilding, refetch }) {
  if (!showBuilding.isOpen) return null;
  const [districts, setDistricts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [position, setPosition] = React.useState([
    showBuilding.data?.location?.lat || 41.2995, // Default to Tashkent if no location
    showBuilding.data?.location?.lng || 69.2401,
  ]);
  const { register, handleSubmit, reset } = useForm();

  const { data, error, isLoading } = useQuery("region", () =>
    axios.get("/region").then((res) => res.data)
  );

  useEffect(() => {
    if (showBuilding.data?.address?.regionId) {
      fetchDistricts(showBuilding.data.address.regionId);
    }
  }, [showBuilding.data?.address?.regionId]);

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
        // Update the location in the form
        reset({ ...reset(), location: `${lat}, ${lng}` });
      },
    });
    return null;
  };

  const onSubmit = async (formData) => {
    setLoading(true);
    await axios.put(`/building/${showBuilding.data.id}`, {
      ...formData,
      apartments_count: +formData.apartments_count,
      floor: +formData.floor,
      entrance_count: +formData.entrance_count,
      district_id: formData.district_id || showBuilding.data.address.districtId,
      location: { lat: position[0], lng: position[1] }, // Update location
    });
    refetch();
    reset();
    setShowBuilding({ isOpen: false });
    setLoading(false);
  };

  return (
    <Modal
      hideBackdrop={false}
      open={showBuilding.isOpen}
      onClose={() => setShowBuilding({ isOpen: false })}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form
        className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 w-96 p-10 rounded-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Viloyat</label>
            <select
              {...register("region_id")}
              required
              onChange={(e) => fetchDistricts(e.target.value)}
              className="border p-2 rounded w-full"
              defaultValue={showBuilding.data.address.regionId || ""}
              defaultChecked={showBuilding.data.address.regionId}
            >
              <option value="" disabled>
                {showBuilding.data.address.region || "Viloyatni tanlang"}
              </option>
              {data?.data?.region.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">Tuman</label>
            <select
              {...register("district_id")}
              required
              className="border p-2 rounded w-full"
              defaultValue={showBuilding.data.address.districtId || ""}
              defaultChecked={showBuilding.data.address.districtId}
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

          <div>
            <label className="block mb-2">Manzil</label>
            <input
              type="text"
              placeholder="Muqimiy123"
              {...register("address")}
              defaultValue={showBuilding.data.address.street}
              required
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block mb-2">Qavatlar soni</label>
            <input
              type="number"
              placeholder="4"
              {...register("floor")}
              required
              max={20}
              min={2}
              defaultValue={showBuilding.data.floor}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block mb-2">Podyezdlar soni</label>
            <input
              type="number"
              placeholder="20"
              {...register("entrance_count")}
              required
              min={1}
              defaultValue={showBuilding.data.entrance_count}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block mb-2">Xonadonlar soni</label>
            <input
              type="number"
              placeholder="100"
              {...register("apartments_count")}
              required
              min={1}
              defaultValue={showBuilding.data.apartments_count}
              className="border p-2 rounded w-full"
            />
          </div>

        </div>
          <div>
            <label className="block mb-2">Location</label>
            <div style={{ height: "200px", width: "100%" }}>
              <MapContainer
                center={position}
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
              </MapContainer>
            </div>
          </div>
        <div className="flex justify-between mt-4">
          <Button
            variant="outlined"
            onClick={() => setShowBuilding({ isOpen: false })}
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

export default EditBuilding;
