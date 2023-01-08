import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IStore } from "shimps";
import { useDispatch } from "react-redux";
import { setConfig } from "@/store/services/slice/appSlice";

const Layout: React.FC<{ children: JSX.Element[] }> = ({
  children
}): JSX.Element => {
  const config = useSelector((state: { app: IStore }) => state.app.config);
  const mainClass = config.darkMode ? "darkMode" : "lightMode";
  const dispatch = useDispatch();

  useEffect((): void => {
    sessionStorage.setItem("userConfig", JSON.stringify(config));
  }, [config]);

  useEffect((): void => {
    const userConfig = sessionStorage.getItem("userConfig");
    if (userConfig) {
      const config = JSON.parse(userConfig);
      dispatch(setConfig(config));
    }
  }, []);
  return <main className={`layout ${mainClass}`}>{children}</main>;
};

export default Layout;
