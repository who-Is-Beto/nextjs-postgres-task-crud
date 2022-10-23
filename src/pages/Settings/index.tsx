import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IStore } from "shimps";
import SettingsOption from "./SettingsOptions";
import SettingOptionStyle from "./Settings.module.css";
import Button from "@/components/Button/Button";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useLogoutUserMutation } from "@/store/services/UsersService";
import { setDarkMode } from "@/store/services/slice/appSlice";
import { GetServerSidePropsContext } from "next";
import { useServerRefresher } from "@/hooks/useServerRefresher";
import { userFromRequest } from "@/web/tokens";
import { User } from "@prisma/client";
import UnAuth from "@/components/unaAuth";

const Settings: React.FC<{ user: User }> = ({ user }): JSX.Element => {
  const globalSettings = useSelector((state: { app: IStore }) => state.app.config);
  const refreshServer = useServerRefresher();
  const [logoutUser, { data }] = useLogoutUserMutation();
  const dispatch = useDispatch();

  const handleChangeTheme = (): void => {
    dispatch(setDarkMode(!globalSettings.darkMode));
  };

  const handleLogout = (): void => {
    logoutUser();
  };

  useEffect((): void => {
    if (data) {
      refreshServer();
    }
  }, [data, refreshServer]);

  return (
    <>
      {user && (
        <div className={`w-100 ${SettingOptionStyle.settingsContainer}`}>
          <div>
            <h1 className={`textRight pageTitle ${SettingOptionStyle.settingTitle}`}>Settings</h1>
            <div className="setting-item">
              {Object.entries(globalSettings).map(([key, value]) => (
                <SettingsOption
                  key={key}
                  setDarkMode={handleChangeTheme}
                  label={key}
                  value={value}
                />
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
      )}
      {!user && <UnAuth message="Please login to get access to Settings." />}
    </>
  );
};

export async function getServerSideProps(constext: GetServerSidePropsContext) {
  const user = await userFromRequest(constext.req);
  if (user) {
    return {
      props: {
        user: JSON.parse(JSON.stringify(user))
      }
    };
  }

  return {
    props: {}
  };
}

export default Settings;
