import React, { useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

function ListOperatorBuilding({ data, refetch }) {
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
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
              Bino raqami
            </th>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
              Viloyat
            </th>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
              Tuman
            </th>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
              Qavatlar soni
            </th>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
              Padezlar soni
            </th>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
              Xonadonlar soni
            </th>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
              Uy manzili
            </th>
            <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data?.buildings?.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-center"> {item.name}</td>
              <td className="px-6 py-4 text-center"> {item.address.region}</td>
              <td className="px-6 py-4 text-center">{item.address.district}</td>
              <td className="px-6 py-4 text-center"> {item.floor}</td>
              <td className="px-6 py-4 text-center"> {item.entrance_count}</td>
              <td className="px-6 py-4 text-center">{item.apartments_count}</td>
              <td className="px-6 py-4 text-center"> {item.address.street}</td>

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
  );
}

export default ListOperatorBuilding;
