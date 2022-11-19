import useOnClickOutside from "@/hooks/useOnClickOutside";
import React, { ReactPortal, useEffect, useState, createContext, Dispatch, useRef } from "react";
import { createPortal } from "react-dom";
import Styles from "./modal.module.css";

const Modal: React.FC<{
  children: JSX.Element;
  isOpen: boolean;
  openHandler: (newIsOpen: boolean) => void;
}> = ({ children, isOpen, openHandler }): ReactPortal | null => {
  const [isBrowser, setIsBrowser] = useState<boolean>(false);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  const handleClickOutside = () => openHandler(false);
  const ModalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(ModalRef, handleClickOutside);
  useEffect(() => {
    setIsBrowser(true);
    setModalRoot(document.getElementById("modal") as HTMLDivElement);
  }, []);

  if (isBrowser) {
    return createPortal(
      <dialog open={isOpen as boolean}>
        <div className={Styles.modalBackground}></div>
        <div ref={ModalRef} className={Styles.modal}>
          {isOpen && children}
        </div>
      </dialog>,
      modalRoot as HTMLElement
    );
  }
  return null;
};

export { Modal };
