import React from "react";
import { Commet } from "react-loading-indicators";
import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import AddOperator from "./components/AddOperator";
import EditOperator from "./components/EditOprator";
import OperatorDetail from "./components/DetailOperator";
import { Edit2, Eye, Search, Trash2 } from "lucide-react";
import { Pagination } from "../../components/Pagination";
import { Button } from "@mui/material";

function Operator() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const navigate = useNavigate();
  const [showOperator, setShowOperator] = React.useState({ isOpen: false });
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  async function showData(id) {
    const { data } = await axios.get(`/operator/${id}`);

    setShowOperator({ isOpen: true, data: data.data });
  }

  const { data, isLoading, refetch } = useQuery(
    "operator",
    () =>
      axios
        .get(`/operator`)
        .then((res) => res.data)
        .catch((e) => console.log(e)),
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

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
  console.log(data);
  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search operator..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-[300px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>{" "}
            <div className="flex items-center">
              <Button
                variant="contained"
                onClick={() => {
                  setIsOpen(true);
                }}
                className={`b text-white px-4 py-2 rounded ml-2`}
              >
                Shirkat qo'shish
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 pl-4">
            <strong className="font-bold text-base text-primary">
              Total: {data?.data.total}
            </strong>
            <div className="flex items-center pb-2"></div>
          </div>

          <EditOperator
            showOperator={showOperator}
            setShowOperator={setShowOperator}
            refetch={refetch}
          />
          <AddOperator
            refetch={refetch}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          />
          <div className="overflow-x-auto ">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                    Shirkat nomi
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                    email
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data?.data?.data?.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-center">{item.name}</td>
                    <td className="px-6 py-3 text-center">{item.email}</td>
                    <td className="px-6 py-3 text-center">
                      <div className="flex justify-center gap-3">
                        <button className="p-1 hover:bg-gray-200 rounded-lg transition-colors">
                          <Eye
                            onClick={() => {
                              navigate(
                                `/operator/detail?operatorId=${item.id}`
                              );
                            }}
                            className="w-4 h-4 text-gray-500"
                          />
                        </button>

                        <button
                          onClick={() => {
                            showData(item.id);
                          }}
                          className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4 text-gray-500" />
                        </button>

                        <button
                          onClick={async () => {
                            await axios.delete(`/operator/${item.id}`);
                            refetch();
                          }}
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

export default Operator;
