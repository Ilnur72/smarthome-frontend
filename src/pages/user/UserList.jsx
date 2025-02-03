import React, { useState } from "react";
import { Commet } from "react-loading-indicators";
import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import { loadState } from "../../Utils/storage";
import { jwtDecode } from "jwt-decode";
import { Button } from "@mui/material";
import { Edit2, Eye, Plus, Search, Trash2 } from "lucide-react";
import { Pagination } from "../../components/Pagination";

function UserList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("#");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // const [page, setCurrentPage] = React.useState(1);
  // const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const navigate = useNavigate();
  const [showUser, setShowUser] = React.useState({ isOpen: false });
  const [isOpen, setIsOpen] = React.useState(false);
  console.log(currentPage, itemsPerPage);

  const token = loadState("token");
  const { user } = jwtDecode(token);
console.log(user.role);

  async function showData(id) {
    const { data } = await axios.get(`/user/${id}`);

    setShowUser({ isOpen: true, data: data.data });
  }

  const { data, isLoading, refetch } = useQuery(
    ["user", searchTerm, currentPage, itemsPerPage],
    () =>
      axios
        .get(
          `/user?page[offset]=${currentPage}&page[limit]=${itemsPerPage}&sort[by]=created_at&sort[order]=DESC&search=${searchTerm}&${
            user.role === "OPERATOR" ? "&filters[staff_id]=" + user.id : ""
          }`
        )
        .then((res) => res.data)
        .catch((e) => console.log(e)),
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
console.log(data);

  React.useEffect(() => {
    refetch();
    if (data?.data.data.length === 0 && currentPage !== 1)
      setCurrentPage(currentPage - 1);
  }, [currentPage, itemsPerPage, refetch]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-2/3">
        <Commet color="#00BDD6FF" size="medium" text="" textColor="" />
      </div>
    );
  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search buildings..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-[300px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4">
                {/* <select
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option>All Status</option>
                  <option>Verified</option>
                  <option>Rejected</option>
                  <option>Pending</option>
                </select> */}
                {/* <select
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="#">Sort by (#)</option>
                  <option value="name">Name</option>
                  <option value="age">Age</option>
                  <option value="country">Country</option>
                </select> */}
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  <Plus className="w-5 h-5" />
                  Add Building
                </button>
                {/* <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-5 h-5 text-gray-600" />
                </button> */}
              </div>
            </div>
          </div>
          <div className="overflow-x-auto ">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                    To'liq ism
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                    Xonadon raqami
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                    Bino raqami
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                    Tel raqami
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data?.data?.data?.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-center">{item.fullname}</td>
                    <td className="px-6 py-3 text-center">
                      {item.userApartments?.length
                        ? item.userApartments[0]?.apartment?.number
                        : "Xonadon hali mavjud emas"}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {item.userApartments?.length
                        ? item.userApartments[0]?.apartment?.entrance.buildings
                            .name
                        : "Xonadon hali mavjud emas"}
                    </td>
                    <td className="px-6 py-3 text-center">{item.phone}</td>
                    <td className="px-6 py-3 text-center">
                      <div className="flex justify-center gap-3">
                        <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye
                            onClick={() => {
                              navigate(
                                `/user/detail?userId=${user.id}`
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
          <Pagination
            totalItems={data.data?.total}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>
      </div>
    </div>
  );
}

export default UserList;
