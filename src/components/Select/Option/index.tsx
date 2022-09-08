import React from "react";
import OptionStyle from "./Option.module.css";

const Option: React.FC<{ onSelect: (lang: string) => void; label: string }> = ({
  onSelect,
  label
}): JSX.Element => {
  return (
    <div className={OptionStyle.option} onClick={() => onSelect(label)}>
      {label}
    </div>
  );
};

export default Option;
