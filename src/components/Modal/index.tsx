import useModal from "@/hooks/useModal";
import React, { ReactPortal, useEffect, useState, createContext, Dispatch } from "react";
import { createPortal } from "react-dom";
import Styles from "./modal.module.css";

const ModalContext = createContext<(boolean | Dispatch<boolean>)[] | null>(null);
const ModalButton: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [, setIsOpen] = useModal();
  return React.cloneElement(children, { onClick: () => (setIsOpen as Dispatch<boolean>)(true) });
};

const ModalContent: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [isOpen, setIsOpen] = useModal();
  const closeModal = () => (setIsOpen as Dispatch<boolean>)(false);
  return (
    <dialog open={isOpen as boolean}>
      <div className={Styles.modalBackgroudn}></div>
      <div className={Styles.modal}>
        <button onClick={closeModal} className={Styles.modal__closeButton}>
          X
        </button>
        {children}
      </div>
    </dialog>
  );
};

const Modal: React.FC<any> = (props): ReactPortal | null => {
  const [isBrowser, setIsBrowser] = useState<boolean>(false);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const value = [isOpen, setIsOpen];
  useEffect(() => {
    setIsBrowser(true);
    setModalRoot(document.getElementById("modal") as HTMLElement);
  }, []);

  if (isBrowser) {
    return createPortal(
      <ModalContext.Provider value={value} {...props} />,
      modalRoot as HTMLElement
    );
  }
  return null;
};

export { Modal, ModalButton, ModalContext, ModalContent };
