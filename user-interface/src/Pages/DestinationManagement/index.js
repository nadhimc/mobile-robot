import { BiEdit, BiTrash } from "react-icons/bi";
import { MdOutlineRestoreFromTrash } from "react-icons/md";
import DashboardHeader from "../../Components/DashboardHeader";
import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import LoadingOverlay from "../../Components/LoadingOverlay";
import MyFetchFunction from "../../Helpers/MyFetchFunction";
import DestinationModal from "./DestinationModal";
import { useHistory } from "react-router-dom";

const DestinationManagement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editData, setEditData] = useState(null);
  let history = useHistory();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      let result = await MyFetchFunction("api/destination");
      console.log("GET DESTINATIONS", result);
      if (result) {
        setData(result);
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
    let result = await MyFetchFunction("api/destination");
    if (result) {
      setData(result);
      // console.log("GET DESTINATIONS", result);
    }
    setLoading(false);
  }

  async function emptyCart(data) {
    let emptyConfirm = window.confirm(
      "Kamu yakin ingin mengosongkan keranjang?"
    );
    if (emptyConfirm) {
      setLoading(true);
      let result = await MyFetchFunction(
        `api/destination/${data?._id}`,
        "PUT",
        {
          ...data,
          jumlah: 0,
        }
      );
      if (result) {
        updateData();
      }
      setLoading(false);
    }
  }

  async function deleteDestination(data) {
    let confirm = window.confirm(
      `Kamu yakin ingin menghapus ${data?.label || data?.kode}?`
    );
    if (confirm) {
      setLoading(true);
      let result = await MyFetchFunction(
        `api/destination/${data?._id}`,
        "DELETE"
      );
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
      <DestinationModal
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
          <p className="text-2xl font-bold text-center">Manajemen Tujuan</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setAddModal(true)}
            className="px-8 py-2 rounded-md shadow text-white bg-blue-500 mr-0 ml-auto block"
          >
            Tambah Tujuan
          </motion.button>
        </div>
        <div className="relative overflow-x-auto rounded-lg mt-5">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Kode
                </th>
                <th scope="col" className="px-6 py-3">
                  Label
                </th>
                <th scope="col" className="px-6 py-3">
                  RFID
                </th>
                <th scope="col" className="px-6 py-3">
                  Jumlah
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((i, idx) => (
                <tr
                  key={idx}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th className="px-6 py-4">{i?.kode}</th>
                  <td className="px-6 py-4">{i?.label}</td>
                  <td className="px-6 py-4">{i?.rfid || "-"}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <p>{i?.jumlah || 0}</p>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-blue-600 text-white rounded-md"
                        onClick={() => emptyCart(i)}
                      >
                        <MdOutlineRestoreFromTrash />
                      </motion.button>
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
                      onClick={() => deleteDestination(i)}
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

export default DestinationManagement;
