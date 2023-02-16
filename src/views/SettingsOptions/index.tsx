import React from "react";
import Select from "@/components/Select";
import Switch from "@/components/switch";
import { IStore, TIncomingTime } from "shimps";
import SettingOptionStyle from "./SettingOption.module.css";
import Option from "@/components/Select/Option";
import { IncomingDates } from "@/constants";
import { setDarkMode, setIncomingTime } from "@/store/services/slice/appSlice";
import { useDispatch, useSelector } from "react-redux";

const SettingsOption: React.FC = (): JSX.Element => {
  const globalSettings = useSelector(
    (state: { app: IStore }) => state.app.config
  );
  const dispatch = useDispatch();
  const handleSelectIncomingDates = (value: TIncomingTime): void => {
    if (value === globalSettings.incomingTime) return;
    dispatch(setIncomingTime(value));
  };
  const handleChangeTheme = (): void => {
    dispatch(setDarkMode(!globalSettings.darkMode));
  };
  return (
    <div className={SettingOptionStyle.settingOptionContainer}>
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
          handleChange={handleChangeTheme}
          id={"DarkMode"}
          value={globalSettings.darkMode}
        />
      </div>
    </div>
  );
};

export default SettingsOption;
