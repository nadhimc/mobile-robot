import { motion } from "framer-motion";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

const DashboardHeader = () => {
  return (
    <div>
      <Link to="/dashboard" className="w-max block">
        <motion.button className="flex items-center gap-1 font-medium text-lg">
          <BiArrowBack />
          <p>Kembali ke Dashboard</p>
        </motion.button>
      </Link>
    </div>
  );
};

export default DashboardHeader;
