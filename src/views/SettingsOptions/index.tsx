import React from "react";
import Select from "@/components/Select";
import Switch from "@/components/switch";
import { IUserConfig, TIncomingTime, TLenguages } from "shimps";
import SettingOptionStyle from "./SettingOption.module.css";
import Option from "@/components/Select/Option";
import { IncomingDates, Langs } from "@/constants";
import { setIncomingTime, setLenguage } from "@/store/services/slice/appSlice";
import { useDispatch } from "react-redux";

const SettingsOption: React.FC<{
  setDarkMode: () => void;
  globalSettings: IUserConfig;
}> = ({ setDarkMode, globalSettings }): JSX.Element => {
  const dispatch = useDispatch();
  const handleSelectLenguage = (value: TLenguages): void => {
    if (value === globalSettings.lenguage) return;
    dispatch(setLenguage(value));
  };
  const handleSelectIncomingDates = (value: TIncomingTime): void => {
    if (value === globalSettings.incomingTime) return;
    dispatch(setIncomingTime(value));
  };
  return (
    <div className={SettingOptionStyle.settingOptionContainer}>
      <div className={SettingOptionStyle.settingOptionItem}>
        <span className={SettingOptionStyle.optionLabel}>Language:</span>
        <Select
          defaultValue={globalSettings.lenguage}
          selectHandler={handleSelectLenguage}
        >
          {Langs.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      </div>
      <div className={SettingOptionStyle.settingOptionItem}>
        <span className={SettingOptionStyle.optionLabel}>
          Every once in while show remainings tasks:
        </span>
        <Select
          selectHandler={handleSelectIncomingDates}
          defaultValue={globalSettings.incomingTime}
        >
          {IncomingDates.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      </div>
      <div className={SettingOptionStyle.settingOptionItem}>
        <span className={SettingOptionStyle.optionLabel}>Dark Mode:</span>
        <Switch
          handleChange={setDarkMode}
          id={"DarkMode"}
          value={globalSettings.darkMode}
        />
      </div>
    </div>
  );
};

export default SettingsOption;
