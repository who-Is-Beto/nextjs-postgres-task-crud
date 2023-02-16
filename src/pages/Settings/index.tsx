import React, { useEffect } from "react";
import SettingsOption from "../../views/SettingsOptions";
import SettingOptionStyle from "./Settings.module.css";
import Button from "@/components/Button/Button";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useLogoutUserMutation } from "@/store/services/UsersService";
import { GetServerSidePropsContext } from "next";
import { useServerRefresher } from "@/hooks/useServerRefresher";
import { userFromRequest } from "@/web/tokens";
import { User } from "@prisma/client";
import UnAuth from "@/components/unaAuth";
import { ShowToast } from "@/components/Toast";

const Settings: React.FC<{ user: User }> = ({ user }): JSX.Element => {
  const refreshServer = useServerRefresher();
  const [logoutUser, { data, isSuccess, isError }] = useLogoutUserMutation();

  const handleLogout = (): void => {
    logoutUser();
  };

  useEffect((): void => {
    if (data) {
      refreshServer();
    }
  }, [data, refreshServer]);

  useEffect((): void => {
    if (isSuccess) {
      ShowToast({
        label: "Logout success",
        type: "success"
      });
    }
    if (isError) {
      ShowToast({
        label: "Logout error",
        type: "error"
      });
    }
  }, [isSuccess, isError]);

  return (
    <>
      {user && (
        <div className={`w-100 ${SettingOptionStyle.settingsContainer}`}>
          <div>
            <h1
              className={`textRight pageTitle ${SettingOptionStyle.settingTitle}`}
            >
              Settings
            </h1>
            <div className="setting-item">
              <SettingsOption />
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
