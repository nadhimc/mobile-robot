import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import LoadingOverlay from "../LoadingOverlay";

const Modal = ({
  isOpen,
  onClose,
  children,
  closeButton,
  loading,
  overlayClose = true,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: { y: "0", opacity: 1 },
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={overlayClose ? onClose : undefined}
          className="fixed z-50 inset-0 w-full h-full bg-[rgba(0,0,0,.2)]"
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
            className={`bg-white border-t-[4px] border-gray-700 px-5 pt-10 pb-10 w-11/12 max-w-5xl mx-auto mt-[10vh] relative max-h-[80vh] ${
              !loading ? "overflow-y-auto" : "overflow-y-hidden"
            } scrollbar`}
          >
            <LoadingOverlay isOpen={loading ?? false} absolute />
            {closeButton && (
              <button
                onClick={onClose}
                type="button"
                className="absolute top-4 right-4 text-2xl hover:opacity-60"
              >
                <IoMdClose />
              </button>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
