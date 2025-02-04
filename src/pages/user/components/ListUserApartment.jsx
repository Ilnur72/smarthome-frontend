import React, { useState } from "react";
import iconDelete from "../../../assets/ActionIcon/delete.svg";
import axios from "axios";
import { Trash2 } from "lucide-react";

function ListUserApartment({ data, refetch }) {
  const [loadingId, setLoadingId] = useState(null);

  const handleDelete = async (id) => {
    try {
      setLoadingId(id);
      await axios.delete(`/user-apartment/${id}`);
      refetch();
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="overflow-x-auto border rounded-lg">
      <div className="flex justify-between items-center p-4">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                Bino raqami
              </th>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                Podyezd raqami
              </th>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                Uy raqami raqami
              </th>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.data?.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-center">
                  {item.apartment?.entrance?.buildings?.name}
                </td>
                <td className="px-6 py-4 text-center">
                  {item.apartment.entrance.name}
                </td>
                <td className="px-6 py-4 text-center">
                  {item.apartment.number}
                </td>

                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListUserApartment;
