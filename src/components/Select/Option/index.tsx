import React, { ReactNode } from "react";
import { useSelectContext } from "../SelectContext";
import OptionStyle from "./Option.module.css";

const Option: React.FC<{
  children: ReactNode | ReactNode[];
  value: string;
}> = ({ children, value }) => {
  const { changeSelectedOption } = useSelectContext();

  return (
    <li onClick={() => changeSelectedOption(value)} className={OptionStyle.option}>
      {children}
    </li>
  );
};

export default Option;
