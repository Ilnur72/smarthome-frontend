import React, { useState } from "react";
import { Eye, Edit2, Trash2, Search, Plus } from "lucide-react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Commet } from "react-loading-indicators";
import { loadState } from "../../Utils/storage";
import { jwtDecode } from "jwt-decode";
import { Pagination } from "../../components/Pagination";
import EditBuilding from "./components/EditBuilding";
import AddBuilding from "./components/AddBuilding";

function Building() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sortBy, setSortBy] = useState("#");
  const [isOpen, setIsOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();
  const [showBuilding, setShowBuilding] = useState({ isOpen: false });
  const queryClient = useQueryClient();

  const token = loadState("token");
  const { user } = jwtDecode(token);

  async function showData(id) {
    const { data: operatorData } = await axios.get(`/operator`);
    const { data } = await axios.get(`/building/${id}`);
    data.data.operator_name = await operatorData.data.data.find(
      (item) => item.id === data.data.operator_id
    )?.name;
    setShowBuilding({
      isOpen: true,
      data: data.data,
      operatorData: operatorData.data,
    });
  }

  // Fetch building data from the API
  const { data, isLoading, refetch } = useQuery(
    "building",
    () =>
      axios
        .get(
          `/building?page[offset]=${currentPage}&page[limit]=${itemsPerPage}&sort[by]=created_at&sort[order]=DESC${
            user.role === "OPERATOR" ? "&filters[operator_id]=" + user.id : ""
          }`
        )
        .then((res) => res.data)
        .catch((e) => {
          if (e.response?.status === 401) navigate("/login");
        }),
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  React.useEffect(() => {
    refetch();
    if (data?.data.buildings.length === 0 && currentPage !== 1)
      setCurrentPage(currentPage - 1);
  }, [currentPage, itemsPerPage, refetch]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-2/3">
        <Commet color="#00BDD6FF" size="medium" text="" textColor="" />
      </div>
    );

  const filteredBuildings = data?.data.buildings.filter((building) => {
    const matchesSearch =
      building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      building.address.street.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

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
                <select
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="#">Sort by (#)</option>
                  <option value="name">Name</option>
                  <option value="age">Age</option>
                  <option value="country">Country</option>
                </select>
                <button
                  onClick={() => {
                    setIsOpen(true);
                    // setShowBuilding({ isOpen: true });
                    // navigate("add-home");
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Add Building
                </button>
                {/* <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-5 h-5 text-gray-600" />
                </button> */}
              </div>
            </div>
          </div>
          <EditBuilding
            showBuilding={showBuilding}
            setShowBuilding={setShowBuilding}
            refetch={refetch}
          />
          <AddBuilding isOpen={isOpen} setIsOpen={setIsOpen} />
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                    Building Name
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                    Region
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                    District
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                    Floors
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                    Apartments
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                    Address
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBuildings?.map((building) => (
                  <tr key={building.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-center">{building.name}</td>
                    <td className="px-6 py-3 text-center">
                      {building.address.region}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {building.address.district}
                    </td>
                    <td className="px-6 py-3 text-center">{building.floor}</td>
                    <td className="px-6 py-3 text-center">
                      {building.apartments_count}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {building.address.street}
                    </td>
                    <td className="px-6 py-3 text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => {
                            queryClient.invalidateQueries("building-detail");

                            navigate(
                              `/building/detail?buildingId=${building.id}`
                            );
                          }}
                          className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4 text-gray-500" />
                        </button>
                        {user.role === "SYSTEM_ADMIN" ? (
                          <button
                            onClick={() => {
                              showData(building.id);
                            }}
                            className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4 text-gray-500" />
                          </button>
                        ) : null}
                        {user.role === "SYSTEM_ADMIN" ? (
                          <button
                            onClick={async () => {
                              await axios.delete(`/building/${building.id}`);
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
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Component */}
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

export default Building;
