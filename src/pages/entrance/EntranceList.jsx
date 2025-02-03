import axios from "axios";
import { Edit2, Eye, Trash2 } from "lucide-react";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Button } from "@mui/material";
import { loadState } from "../../Utils/storage";
import AddEntrance from "./components/AddEntrance";

function EntranceList({ buildingId }) {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const entranceIdFromParams = queryParams.get("entranceId");
  const [isOpen, setIsOpen] = React.useState(false);

  const token = loadState("token");
  const { user } = jwtDecode(token);

  const { data, refetch, isLoading } = useQuery("entrance", () =>
    axios
      .get(
        `/entrance?filters[Building_id]=${buildingId}&sort[by]=created_at&sort[order]=DESC`
      )
      .then((res) => res.data)
  );
  console.log(data);
  if (isLoading) return;

  return (
    <div className="overflow-x-auto border rounded-lg">
      <AddEntrance
        refetch={refetch}
        buildingId={buildingId}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        lastApartmentNumber={
          data.data?.entrance ? data.data.entrance[0]?.last_apartment_number : 1
        }
      />
      <div className="flex justify-between items-center p-4">
        <h2 className="text-medium font-bold text-gray-700">
          Podyezdlar ro'yhati
        </h2>
        {user.role === "SYSTEM_ADMIN" ? (
          <Button
            variant="contained"
            onClick={() => {
              setIsOpen(true);
            }}
            className={`bg-primary-500 text-white px-4 py-2 rounded ml-2`}
          >
            Podyezd qo'shish
          </Button>
        ) : null}
      </div>
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
              Podyezd nomi
            </th>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
              Kvartira raqami
            </th>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
              Domofon IP
            </th>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
              Login
            </th>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
              Password
            </th>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data?.data?.entrance?.map((entrance) => (
            <tr key={entrance.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-center">{entrance.name}</td>
              <td className="px-6 py-4 text-center">
                {entrance.first_apartment_number +
                  "-" +
                  entrance.last_apartment_number}
              </td>
              <td className="px-6 py-4 text-center">{entrance.intercom_ip}</td>
              <td className="px-6 py-4 text-center">
                {entrance.intercom_login}
              </td>
              <td className="px-6 py-4 text-center">
                {entrance.intercom_password}
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex justify-center gap-3">
                  <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                    <Eye
                      onClick={() => {
                        navigate(
                          `entrance/detail?entranceId=${entrance.id}&buildingId=${buildingId}`
                        );
                      }}
                      className="w-4 h-4 text-gray-500"
                    />
                  </button>
                  {user.role === "SYSTEM_ADMIN" ? (
                    <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4 text-gray-500" />
                    </button>
                  ) : null}
                  {user.role === "SYSTEM_ADMIN" ? (
                    <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-gray-500" />
                    </button>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EntranceList;
