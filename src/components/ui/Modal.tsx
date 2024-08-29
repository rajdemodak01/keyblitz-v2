import React, { ReactNode, useEffect, useState } from "react";
import Search from "@/images/search.svg";
import ChaseCursor from "../modal/ChaseCursor";
import { motion, AnimatePresence } from "framer-motion";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = (props: IModalProps) => {
  const { isOpen, onClose } = props;

  const [modalContent, setModalContent] = useState<ReactNode>(
    <div className=" flex flex-col">
      <div
        className=" hover:bg-border px-4 cursor-pointer py-2 transition-all duration-150"
        onClick={() => {
          setModalContent(<ChaseCursor />);
          setModalHeading("Chase the cursor");
        }}
      >
        Chase the cursor
      </div>
    </div>
  ); // we could use queue to store the content so that when the user does back and forth, the content is not lost

  const [modalHeading, setModalHeading] = useState<string | null>(null);

  useEffect(() => {
    setModalContent(
      <div className=" flex flex-col">
        <div
          className=" hover:bg-border px-4 cursor-pointer py-2 transition-all duration-150"
          onClick={() => {
            setModalContent(<ChaseCursor />);
            setModalHeading("Chase the cursor");
          }}
        >
          Chase the cursor
        </div>
      </div>
    );
    setModalHeading(null);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center outline-none px-4 pointer-events-none">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.15, type: "tween" }}
              className=" flex-1 my-[15vh] w-full xs:w-[500px] overflow-hidden pointer-events-auto "
            >
              <div className=" bg-background rounded-xl ">
                <div className="  text-foreground-light text-xl ">
                  {modalHeading ? (
                    <div className=" px-4 py-6 select-none ">
                      {modalHeading}
                    </div>
                  ) : (
                    <label className=" text-foreground-light flex gap-4 justify-center px-4 ">
                      <Search width="24" />
                      <input
                        type="text"
                        className=" py-6 flex-1 bg-transparent outline-none"
                      />
                    </label>
                  )}
                </div>
                <div>
                  <div className=" border-t border-border " />
                  <div className=" text-foreground pb-2 ">{modalContent}</div>
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-black opacity-70   "
            onClick={onClose}
          ></motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
