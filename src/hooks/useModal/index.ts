import { ModalContext } from "@/components/Modal";
import { createContext, useContext } from "react";

const useModal = () => {
  const modalContext = useContext(ModalContext);
  if (!modalContext) throw new Error("useModal must be used in or within a Modal Component");
  return modalContext;
};

export default useModal;
