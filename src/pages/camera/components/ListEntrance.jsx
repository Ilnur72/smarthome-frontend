import React from "react";

function ListEntrance({ data }) {
  console.log(data);
  
  return (
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
            Bino raqami
          </th>
          <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
            Bino manzili
          </th>
          <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
            Podyezd nomi
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data?.entrance_list?.map((item) => (
          <tr key={item.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 text-center">{data.buildings.name}</td>
            <td className="px-6 py-4 text-center">{data.buildings.address}</td>
            <td className="px-6 py-4 text-center">{item.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListEntrance;
