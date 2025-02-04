import axios from "axios";
import { Edit2, Eye, Trash2 } from "lucide-react";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Button } from "@mui/material";
import { loadState } from "../../Utils/storage";
import AddEntrance from "./components/AddEntrance";
import EditEntrance from "./components/EditEntrance";

function EntranceList({ buildingId }) {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [isOpen, setIsOpen] = React.useState(false);
  const [attachemntCount, setAttachemntCount] = React.useState(0);
  const token = loadState("token");
  const { user } = jwtDecode(token);
  const [showEntrance, setShowEntrance] = React.useState({ isOpen: false });

  const { data, refetch, isLoading } = useQuery("entrance", () =>
    axios
      .get(
        `/entrance?filters[building_id]=${buildingId}&sort[by]=created_at&sort[order]=DESC`
      )
      .then((res) => res.data)
  );

  React.useEffect(() => {
    if (data?.data?.entrance) {
      const count = data.data.entrance.reduce((acc, entrance) => {
        return acc + entrance.apartments.reduce((acc, item) => {
          return acc + (item.userApartments?.length || 0);
        }, 0);
      }, 0);
      setAttachemntCount(count);
    }
  }, [data]);

  async function showData(id) {
    const { data } = await axios.get(`/entrance/${id}`);
    setShowEntrance({ isOpen: true, data: data.data });
  }

  if (isLoading) return <div>Loading...</div>;

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
      <EditEntrance
        showEntrance={showEntrance}
        setShowEntrance={setShowEntrance}
        refetch={refetch}
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
              Biriktirilgan
            </th>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
              Biriktirilmagan
            </th>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data?.data?.entrance?.map((entrance) => {
            const attachedCount = entrance.apartments.reduce((acc, item) => {
              return acc + (item.userApartments?.length || 0);
            }, 0);

            const totalApartments = entrance.apartments.length;
            const unassignedCount = totalApartments - attachedCount;

            return (
              <tr key={entrance.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-center">{entrance.name}</td>
                <td className="px-6 py-4 text-center">
                  {entrance.first_apartment_number + "-" + entrance.last_apartment_number}
                </td>
                <td className="px-6 py-4 text-center">{entrance.intercom_ip}</td>
                <td className="px-6 py-4 text-center">{attachedCount}</td>
                <td className="px-6 py-4 text-center">{unassignedCount}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        navigate(`entrance/detail?entranceId=${entrance.id}&buildingId=${buildingId}`);
                      }}
                      className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    {user.role === "SYSTEM_ADMIN" ? (
                      <button
                        onClick={() => {
                          showData(entrance.id);
                        }}
                        className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-gray-500" />
                      </button>
                    ) : null}
                    {user.role === "SYSTEM_ADMIN" ? (
                      <button
                        onClick={async () => {
                          await axios.delete(`/entrance/${entrance.id}`);
                          refetch();
                        }}
                        className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-gray-500" />
                      </button>
                    ) : null}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default EntranceList;
