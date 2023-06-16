import { motion } from "framer-motion";
import BaseInput from "../../Components/BaseInput";
import Modal from "../../Components/Modal";
import { useRef } from "react";
import { useState } from "react";
import MyFetchFunction from "../../Helpers/MyFetchFunction";
import { useEffect } from "react";

const UserModal = (props) => {
  const { onClose, options } = props;
  const { updateData, edit, data } = options;
  const [tujuan, setTujuan] = useState(data?.tujuan || false);
  const [scanner, setScanner] = useState(data?.scanner || false);
  const [pengguna, setPengguna] = useState(data?.pengguna || false);
  const [loading, setLoading] = useState(false);

  const formRef = useRef();

  async function submitFunction(e) {
    e.preventDefault();
    if (formRef?.current) {
      const formData = new FormData(formRef.current); // Create a new FormData object from the form
      const values = {}; // Create an empty object to store the form values

      for (let [name, value] of formData.entries()) {
        // Use the `entries()` method to iterate over the form fields
        values[name] = value; // Add the field name and value to the object
      }

      if (values.username !== "") {
        if (edit) {
          editFunction(values);
        } else {
          addFunction(values);
        }
      }
    }
  }

  async function addFunction(values) {
    setLoading(true);
    let result = await MyFetchFunction("api/auth/register", "POST", {
      username: values.username,
      password: values.password,
      tujuan,
      scanner,
      pengguna,
    });
    setLoading(false);
    if (result) {
      onClose();
      updateData();
    }
  }

  async function editFunction() {
    setLoading(true);
    let result = await MyFetchFunction(`api/user/${data?._id}`, "PUT", {
      ...data,
      tujuan,
      scanner,
      pengguna,
    });
    setLoading(false);
    if (result) {
      onClose();
      updateData();
    }
  }

  useEffect(() => {
    setTujuan(data?.tujuan || false);
    setScanner(data?.scanner || false);
    setPengguna(data?.pengguna || false);
  }, [data]);

  return (
    <Modal {...props} loading={loading}>
      <p className="text-center font-medium text-xl">
        {edit ? "Edit" : "Tambah"} Pengguna
      </p>
      <form ref={formRef} onSubmit={submitFunction} className="mt-3">
        <BaseInput
          label="Username"
          name="username"
          disabled={edit ? true : false}
          defaultValue={data?.username}
        />
        {!edit && (
          <BaseInput label="Password" name="password" type="password" />
        )}
        <div>
          <label className="relative inline-flex items-center mb-4 cursor-pointer">
            <input
              type="checkbox"
              checked={tujuan}
              onChange={() => setTujuan((p) => !p)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">
              Akses Manajemen Tujuan
            </span>
          </label>
        </div>
        <div>
          <label className="relative inline-flex items-center mb-4 cursor-pointer">
            <input
              type="checkbox"
              checked={scanner}
              onChange={() => setScanner((p) => !p)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">
              Akses Scanner
            </span>
          </label>
        </div>
        <div>
          <label className="relative inline-flex items-center mb-4 cursor-pointer">
            <input
              type="checkbox"
              checked={pengguna}
              onChange={() => setPengguna((p) => !p)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">
              Akses Manajemen Pengguna
            </span>
          </label>
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-blue-500 rounded-md mx-auto px-7 py-2 mt-5 font-medium text-white text-center block"
        >
          {edit ? "Edit" : "Tambah"} Pengguna
        </motion.button>
      </form>
    </Modal>
  );
};

export default UserModal;
