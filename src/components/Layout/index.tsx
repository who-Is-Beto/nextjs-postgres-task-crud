import React from "react";
import { useSelector } from "react-redux";
import { IStore } from "shimps";

const Layout: React.FC<{ children: JSX.Element[] }> = ({ children }): JSX.Element => {
  const isDarkMode = useSelector((state: { app: IStore }) => state.app.config.darkMode);
  const mainClass = isDarkMode ? "darkMode" : "lightMode";
  return <main className={`layout ${mainClass}`}>{children}</main>;
};

export default Layout;
