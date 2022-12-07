import React, { ReactNode, useState } from "react";
import { ToastContext, ToastStatus } from "./ToastContext";
import ToastIcon from "./ToastIcon";

const Toast: React.FC<{ children: ReactNode; status: ToastStatus }> & { ToastIcon: any } = ({
  children,
  status
}): JSX.Element => {
  const [toastShow, setToastShow] = useState<boolean>(false);
  const handleShow = (show: boolean) => {
    setToastShow(show);
  };

  return (
    <ToastContext.Provider value={{ status, show: toastShow || false, handleShow }}>
      <div>{children}</div>
    </ToastContext.Provider>
  );
};
Toast.ToastIcon = ToastIcon;
export default Toast;
