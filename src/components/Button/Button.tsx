import Link from "next/link";
import React from "react";
import { TButtons } from "shimps";
import ButtonStyle from "./button.module.css";
type TPropsButton = {
  onClIick?: (event: React.SyntheticEvent) => void;
  type: TButtons;
  outlined?: boolean;
  children?: React.ReactNode;
  href?: string;
};

const Button: React.FC<TPropsButton> = ({
  href,
  onClIick,
  children,
  type,
  outlined = false
}): JSX.Element => {
  const buttonType = outlined ? type + "Outlined" : type;
  const buttonClass = `${ButtonStyle.button} ${ButtonStyle[buttonType]}`;
  return (
    <>
      {href ? (
        <Link href={href}>
          <button className={`${buttonClass}`} onClick={onClIick}>
            {children}
          </button>
        </Link>
      ) : (
        <button className={`${buttonClass}`} onClick={onClIick}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
