import Select from "@/components/Select";
import Switch from "@/components/switch";
import React from "react";
import { IAviableLenguages } from "shimps";
import SettingOptionStyle from "./SettingOption.module.css";

const SettingsOption: React.FC<{
  setDarkMode: () => void;
  label: string;
  value: IAviableLenguages | boolean;
}> = ({ label, value, setDarkMode }): JSX.Element => {
  console.log(value);
  return (
    <div className={SettingOptionStyle.settingOptionContainer}>
      <span className={SettingOptionStyle.optionLabel}>{label}:</span>
      {typeof value === "boolean" ? (
        <Switch handleChange={setDarkMode} value={value} id={label} />
      ) : (
        <>
          <Select value={value} />
        </>
      )}
    </div>
  );
};

export default SettingsOption;
