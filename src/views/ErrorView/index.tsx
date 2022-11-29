import React from "react";
import Styles from "./errorView.module.css";

const ErrorView: React.FC<{ message: string }> = ({ message }): JSX.Element => {
  return <div className={Styles.view}>{message}</div>;
};

export default ErrorView;
