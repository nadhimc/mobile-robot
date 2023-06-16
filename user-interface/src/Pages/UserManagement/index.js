import { BiEdit, BiTrash } from "react-icons/bi";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import DashboardHeader from "../../Components/DashboardHeader";
import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import LoadingOverlay from "../../Components/LoadingOverlay";
import MyFetchFunction from "../../Helpers/MyFetchFunction";
import UserModal from "./UserModal";
import { useHistory } from "react-router-dom";

const UserManagement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editData, setEditData] = useState(null);
  let history = useHistory();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      let result = await MyFetchFunction("api/user");
      if (result) {
        setData(result);
        // console.log("GET DESTINATIONS", result);
      } else {
        history.replace("/dashboard");
      }
      setLoading(false);
    }
    if (history) {
      getData();
    }
  }, [history]);

  async function updateData() {
    setLoading(true);
    let result = await MyFetchFunction("api/user");
    if (result) {
      setData(result);
      // console.log("GET DESTINATIONS", result);
    }
    setLoading(false);
  }

  async function deleteUser(data) {
    let confirm = window.confirm(
      `Kamu yakin ingin menghapus ${data?.username || "user ini"}?`
    );
    if (confirm) {
      setLoading(true);
      let result = await MyFetchFunction(`api/user/${data?._id}`, "DELETE");
      if (result) {
        updateData();
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!addModal) {
      setEditData(null);
    }
  }, [addModal]);

  return (
    <div className="max-w-7xl mx-auto w-full py-10 px-5">
      <LoadingOverlay isOpen={loading} />
      <UserModal
        isOpen={addModal}
        onClose={() => setAddModal(false)}
        overlayClose={false}
        closeButton={true}
        options={{
          updateData: updateData,
          edit: editData ? true : false,
          data: editData || null,
        }}
      />
      <DashboardHeader />
      <div className="mt-5">
        <div>
          <p className="text-2xl font-bold text-center">Manajemen Pengguna</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setAddModal(true)}
            className="px-8 py-2 rounded-md shadow text-white bg-blue-500 mr-0 ml-auto block"
          >
            Tambah Pengguna
          </motion.button>
        </div>
        <div className="relative overflow-x-auto rounded-lg mt-5">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  username
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Manajemen Tujuan
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Scanner
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Manajemen Pengguna
                </th>
                <th scope="col" className="px-6 py-3 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((i, idx) => (
                <tr
                  key={idx}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th className="px-6 py-4 text-center">{i?.username}</th>
                  <td className="px-6 py-4 text-xl">
                    <div className="flex items-center justify-center">
                      {i?.tujuan ? (
                        <FaCheckCircle className="text-green-700" />
                      ) : (
                        <FaTimesCircle className="text-red-700" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xl">
                    <div className="flex items-center justify-center">
                      {i?.scanner ? (
                        <FaCheckCircle className="text-green-700" />
                      ) : (
                        <FaTimesCircle className="text-red-700" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xl">
                    <div className="flex items-center justify-center">
                      {i?.pengguna ? (
                        <FaCheckCircle className="text-green-700" />
                      ) : (
                        <FaTimesCircle className="text-red-700" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setAddModal(true);
                        setEditData(i);
                      }}
                      className="p-2 bg-green-600 text-white rounded-md"
                    >
                      <BiEdit />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteUser(i)}
                      className="p-2 bg-red-600 text-white rounded-md"
                    >
                      <BiTrash />
                    </motion.button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
