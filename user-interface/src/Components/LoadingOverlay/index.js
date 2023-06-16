import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadingOverlay = ({ isOpen, absolute }) => {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          //   onClick={onClose}
          className={`${
            absolute ? "absolute" : "fixed"
          } z-[100] inset-0 w-full h-full bg-[rgba(0,0,0,.3)] justify-center items-center flex`}
        >
          <div className="text-white flex flex-col items-center justify-center gap-5">
            <AiOutlineLoading3Quarters className="animate-spin text-3xl" />
            <p className="text-2xl">Loading...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;
