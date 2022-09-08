import React from "react";
import { useSelector } from "react-redux";
import { IStore } from "shimps";
import SettingsOption from "./SettingsOptions";
import SettingOptionStyle from "./Settings.module.css";
import Button from "@/components/Button/Button";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useLogoutUserMutation } from "@/store/services/UsersService";
import { useRouter } from "next/router";
import { setDarkMode } from "@/store/services/slice/appSlice";

const Settings: React.FC = (): JSX.Element => {
  const globalSettings = useSelector((state: { app: IStore }) => state.app.config);
  const router = useRouter();
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = (): void => {
    logoutUser();
    router.push("/");
  };

  const handleChangeTheme = (): void => {
    setDarkMode(false);
  };

  return (
    <div className={`w-100 ${SettingOptionStyle.settingsContainer}`}>
      <div>
        <h1 className={`textRight pageTitle ${SettingOptionStyle.settingTitle}`}>Settings</h1>
        <div className="setting-item">
          {Object.entries(globalSettings).map(([key, value]) => (
            <SettingsOption key={key} setDarkMode={handleChangeTheme} label={key} value={value} />
          ))}
        </div>
      </div>

      <div className="alignRight">
        <Button type="danger" onClIick={handleLogout}>
          <RiLogoutBoxRFill scale={4} />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Settings;
