import React from "react";

type TPropsButton = {
  label: string;
  onClIick: () => void;
};

const Button: React.FC<TPropsButton> = ({ label, onClIick }): JSX.Element => {
  return (
    <>
      <button onClick={onClIick}>{label}</button>
    </>
  );
};

export default Button;
