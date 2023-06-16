import { motion } from "framer-motion";
import BaseInput from "../../Components/BaseInput";
import Modal from "../../Components/Modal";
import { useRef } from "react";
import { useState } from "react";
import MyFetchFunction from "../../Helpers/MyFetchFunction";

const DestinationModal = (props) => {
  const { onClose, options } = props;
  const { updateData, edit, data } = options;
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

      if (values.kode !== "" && values.label !== "" && values.rfid !== "") {
        setLoading(true);
        let result = await MyFetchFunction(
          `api/destination/${data?._id || ""}`,
          edit ? "PUT" : "POST",
          {
            ...values,
            jumlah: data?.jumlah || 0,
            urutan: data?.urutan || 0,
          }
        );
        if (result) {
          alert(
            edit ? "Berhasil mengedit tujuan" : "Berhasil menambahkan tujuan"
          );
        }
        setLoading(false);
      }
      onClose();
      updateData();
    }
  }

  return (
    <Modal {...props} loading={loading}>
      <p className="text-center font-medium text-xl">
        {edit ? "Edit" : "Tambah"} Tujuan
      </p>
      <form ref={formRef} onSubmit={submitFunction} className="mt-3">
        <BaseInput
          label="Kode"
          name="kode"
          disabled={edit ? true : false}
          defaultValue={data?.kode}
        />
        <BaseInput label="Label" name="label" defaultValue={data?.label} />
        <BaseInput label="RFID" name="rfid" defaultValue={data?.rfid} />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-blue-500 rounded-md mx-auto px-7 py-2 mt-5 font-medium text-white text-center block"
        >
          {edit ? "Edit" : "Tambah"} Tujuan
        </motion.button>
      </form>
    </Modal>
  );
};

export default DestinationModal;
