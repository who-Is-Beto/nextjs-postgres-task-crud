import React from "react";
import Link from "next/link";
import { RiHomeFill, RiNotification3Fill, RiSettings4Fill, RiUserFill } from "react-icons/ri";
import { TbNotes } from "react-icons/tb";
import OptionsStyles from "./Options.module.css";
import { userFromRequest } from "@/web/tokens";
import { GetServerSidePropsContext } from "next";
import { NextRouter } from "next/router";

const Options: React.FC<{ router: NextRouter }> = ({ router }): JSX.Element => {
  return (
    <div className={OptionsStyles.options}>
      <CustomLink router={router} to="/">
        <RiHomeFill
          fill={router.pathname.split("/")[1] === "/".split("/")[1] ? "#3c415c" : "#e8f0fe"}
        />
      </CustomLink>

      <CustomLink router={router} to="/user">
        <RiUserFill
          fill={router.pathname.split("/")[1] === "/user".split("/")[1] ? "#3c415c" : "#e8f0fe"}
        />
      </CustomLink>

      <CustomLink router={router} to="/Tasks">
        <TbNotes
          fill={router.pathname.split("/")[1] === "/Tasks".split("/")[1] ? "#3c415c" : "#e8f0fe"}
        />
      </CustomLink>

      <CustomLink router={router} to="/Notifications">
        <RiNotification3Fill
          fill={
            router.pathname.split("/")[1] === "/Notifications".split("/")[1] ? "#3c415c" : "#e8f0fe"
          }
        />
      </CustomLink>

      <CustomLink router={router} to="/Settings">
        <RiSettings4Fill
          fill={router.pathname.split("/")[1] === "/Settings".split("/")[1] ? "#3c415c" : "#e8f0fe"}
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
