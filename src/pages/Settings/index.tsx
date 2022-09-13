import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IStore } from "shimps";
import SettingsOption from "./SettingsOptions";
import SettingOptionStyle from "./Settings.module.css";
import Button from "@/components/Button/Button";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useLogoutUserMutation } from "@/store/services/UsersService";
import { useRouter } from "next/router";
import { setDarkMode } from "@/store/services/slice/appSlice";
import { useServerRefresher } from "@/hooks/useServerRefresher";
import { GetServerSidePropsContext } from "next";
import { userFromRequest } from "@/web/tokens";
import { User } from "@prisma/client";
import UnAuth from "@/components/unaAuth";

const Settings: React.FC<{ user: User }> = ({ user }): JSX.Element => {
  const globalSettings = useSelector((state: { app: IStore }) => state.app.config);
  const refreshServer = useServerRefresher();
  const router = useRouter();
  const [logoutUser, { data }] = useLogoutUserMutation();

  const handleChangeTheme = (): void => {
    setDarkMode(false);
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
