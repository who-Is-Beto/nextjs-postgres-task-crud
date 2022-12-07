import { createContext, useContext } from "react";

export type ToastStatus = "success" | "error" | "warning" | "info";

interface ToastState {
  show: boolean;
  status: ToastStatus;
  handleShow: (show: boolean) => void;
}

export const toastState: ToastState = {
  handleShow: () => {},
  show: false,
  status: "success"
};

const ToastContext = createContext<ToastState>(toastState);

const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("Toast compound components cannot be rendered outside the Toast component");
  }
  return context;
};

export { ToastContext, useToastContext };
