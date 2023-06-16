import { motion } from "framer-motion";

const MyPages = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="font-poppins w-full"
    >
      {children}
    </motion.div>
  );
};

export default MyPages;
