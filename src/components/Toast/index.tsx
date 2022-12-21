import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from "react-dom/client";
import Styles from "./toast.module.css";

const TOAST_CONTAINER_ID = "toast" as const;

interface ToastProperties {
  timer?: number;
  type: "success" | "error";
  label: string;
}

export const ShowToast = (props: ToastProperties): void => {
  const toastContainer = document.getElementById(TOAST_CONTAINER_ID) as HTMLElement;
  if (!toastContainer) throw new Error("Toast container not found");
  const root = createRoot(toastContainer);
  root.render(<Toast {...props} />);
};

export const HideToast = (documentId: string = TOAST_CONTAINER_ID): void => {
  const toastContainer = document.getElementById(TOAST_CONTAINER_ID) as HTMLElement;
  const root = createRoot(toastContainer);
  root.unmount();
};

const TOAST_TIME_MS = 3000000 as const;

const Toast: React.FC<ToastProperties> = (props): JSX.Element => {
  const toast = useRef<HTMLOutputElement>(null);

  let timer: number = -1;

  const onReset = (): void => {
    window.clearTimeout(timer);
  };

  const onStart = (): void => {
    timer = window.setTimeout(HideToast, props.timer);
  };

  const onClose = (event: SyntheticEvent | null): void => {
    if (event) event.preventDefault();

    HideToast();
  };

  useEffect(() => {
    onStart();
    toast.current?.focus();

    return () => {
      onClose(null);
    };
  });

  return (
    <output
      aria-labelledby="toast-label"
      onMouseLeave={onStart}
      onMouseEnter={onReset}
      className={`${Styles.toast} ${Styles[props.type]}`}
      ref={toast}
    >
      <span id="toast-label" className={Styles.toastText}>
        {props.label}
      </span>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close dialog"
        className={Styles.toastButton}
      >
        ×
      </button>
    </output>
  );
};

Toast.defaultProps = {
  timer: TOAST_TIME_MS
};
