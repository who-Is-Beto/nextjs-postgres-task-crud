import React from "react";
import Select from "@/components/Select";
import Switch from "@/components/switch";
import { TLenguages } from "shimps";
import SettingOptionStyle from "./SettingOption.module.css";
import Option from "@/components/Select/Option";
import { Langs } from "@/constants";
import { setLenguage } from "@/store/services/slice/appSlice";

const SettingsOption: React.FC<{
  setDarkMode: () => void;
  label: string;
  value: Array<TLenguages> | boolean;
}> = ({ label, value, setDarkMode }): JSX.Element => {
  return (
    <div className={SettingOptionStyle.settingOptionContainer}>
      <span className={SettingOptionStyle.optionLabel}>{label}:</span>
      {typeof value === "boolean" ? (
        <Switch handleChange={setDarkMode} value={value} id={label} />
      ) : (
        <>
          <Select selectHandler={setLenguage} placeholder="Select a lenguage">
            {Langs.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </>
      )}
    </div>
  );
};

export default SettingsOption;
