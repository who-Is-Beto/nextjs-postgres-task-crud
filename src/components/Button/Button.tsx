import React from "react";
import ButtonStyle from "./button.module.css";
type TPropsButton = {
  label: string;
  onClIick: () => void;
};

const Button: React.FC<TPropsButton> = ({ label, onClIick }): JSX.Element => {
  return (
    <>
      <button className={`${ButtonStyle.button} ${ButtonStyle.buttonPrimary}`} onClick={onClIick}>
        {label}
      </button>
    </>
  );
};

export default Button;
