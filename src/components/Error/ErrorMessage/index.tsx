import React from "react";
import Styles from "./errorMessage.module.css";

const ErrorMessenge: React.FC<{ message: string }> = ({ message }): JSX.Element => {
  return <strong className={Styles.message}>{message}</strong>;
};

export default ErrorMessenge;
