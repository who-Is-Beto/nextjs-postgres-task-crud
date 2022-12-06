import React from "react";
import Link from "next/link";
import { RiHomeFill, RiNotification3Fill, RiSettings4Fill, RiUserFill } from "react-icons/ri";
import { TbNotes } from "react-icons/tb";
import OptionsStyles from "./Options.module.css";
import { NextRouter } from "next/router";
import { useSelector } from "react-redux";
import { IStore } from "shimps";

const Options: React.FC<{ router: NextRouter }> = ({ router }): JSX.Element => {
  const isDarkMode = useSelector((state: { app: IStore }) => state.app.config.darkMode);
  const mainClass = isDarkMode ? "#3c415c" : "#f5eddc";
  const secondaryClass = isDarkMode ? "#f5eddc" : "#3c415c";

  return (
    <div className={OptionsStyles.options}>
      <CustomLink router={router} to="/">
        <RiHomeFill
          fill={router.pathname.split("/")[1] === "/".split("/")[1] ? mainClass : secondaryClass}
        />
      </CustomLink>

      <CustomLink router={router} to="/user">
        <RiUserFill
          fill={
            router.pathname.split("/")[1] === "/user".split("/")[1] ? mainClass : secondaryClass
          }
        />
      </CustomLink>

      <CustomLink router={router} to="/Tasks">
        <TbNotes
          fill={
            router.pathname.split("/")[1] === "/Tasks".split("/")[1] ? mainClass : secondaryClass
          }
        />
      </CustomLink>

      <CustomLink router={router} to="/Notifications">
        <RiNotification3Fill
          fill={
            router.pathname.split("/")[1] === "/Notifications".split("/")[1]
              ? mainClass
              : secondaryClass
          }
        />
      </CustomLink>

      <CustomLink router={router} to="/Settings">
        <RiSettings4Fill
          fill={
            router.pathname.split("/")[1] === "/Settings".split("/")[1] ? mainClass : secondaryClass
          }
        />
      </CustomLink>
    </div>
  );
};

const CustomLink: React.FC<{ to: string; children: JSX.Element; router: NextRouter }> = ({
  children,
  to,
  router
}): JSX.Element => {
  const isActive = router.pathname.split("/")[1] === to.split("/")[1];
  return (
    <Link href={to}>
      <a className={isActive ? OptionsStyles.optionsIconActive : OptionsStyles.optionsIcon}>
        {children}
      </a>
    </Link>
  );
};

export default Options;
