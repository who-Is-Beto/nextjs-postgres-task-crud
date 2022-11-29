import React from "react";

const ErrorMessenger: React.FC<{ message: string }> = ({ message }): JSX.Element => {
  return <div>{message}</div>;
};

export default ErrorMessenger;
