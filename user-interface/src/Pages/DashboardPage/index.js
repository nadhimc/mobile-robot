import { motion } from "framer-motion";
import { useEffect } from "react";
import { BiPackage, BiQrScan, BiUser, BiLogOut, BiLock } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import MyFetchFunction from "../../Helpers/MyFetchFunction";
import { useState } from "react";
import LoadingOverlay from "../../Components/LoadingOverlay";

const menu = [
  {
    icon: <BiPackage className="text-5xl md:text-7xl" />,
    tag: "tujuan",
    text: "Manajemen Tujuan",
    link: "/dashboard/destination-management",
  },
  {
    icon: <BiQrScan className="text-5xl md:text-7xl" />,
    tag: "scanner",
    text: "Scanner Paket",
    link: "/dashboard/scanner",
  },
  {
    icon: <BiUser className="text-5xl md:text-7xl" />,
    tag: "pengguna",
    text: "Manajemen Pengguna",
    link: "/dashboard/user-management",
  },
  {
    icon: <BiLogOut className="text-5xl md:text-7xl" />,
    tag: "keluar",
    text: "Keluar",
    link: "/logout",
  },
];

const DashboardPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  let history = useHistory();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      let result = await MyFetchFunction("api/myinfo");
      if (result?.data) {
        setData(result?.data);
      }
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <div className="flex items-center justify-center w-11/12 h-full max-w-5xl px-5 py-5 mx-auto gap-5 flex-wrap content-center">
      <LoadingOverlay isOpen={loading} />
      {menu.map((i, idx) => {
        let approved = i.tag === "keluar" ? true : data?.[i.tag];
        return (
          <motion.button
            key={idx}
            onClick={() => {
              if (approved) {
                history.push(i?.link);
              } else {
                alert("Kamu tidak memiliki akses");
              }
            }}
            whileHover={{ scale: approved ? 1.02 : 1 }}
            whileTap={{ scale: approved ? 0.98 : 1 }}
            className={`flex flex-col items-center justify-center p-10 ${
              approved ? "bg-white" : "bg-gray-500 cursor-not-allowed"
            } rounded-lg shadow-lg h-40 md:h-80 w-40 md:w-80`}
          >
            {approved ? i.icon : <BiLock className="text-5xl md:text-7xl" />}
            <p className="font-medium">{i.text}</p>
          </motion.button>
        );
      })}
    </div>
  );
};

export default DashboardPage;
