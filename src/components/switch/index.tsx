import React from "react";
import SwitchStyles from "./Switch.module.css";

const Switch: React.FC<{ handleChange: () => void; value: boolean; id: string }> = ({
  value,
  id,
  handleChange
}): JSX.Element => {
  return (
    <>
      <input
        className={SwitchStyles.checkbox}
        onChange={handleChange}
        checked={value}
        type="checkbox"
        id={id}
      />
      <label className={SwitchStyles.switch} htmlFor={id}></label>
    </>
  );
};

export default Switch;
