import React from "react";
import Link from "next/link";
import { RiHomeFill, RiNotification3Fill, RiSettings4Fill, RiUserFill } from "react-icons/ri";
import { TbNotes } from "react-icons/tb";
import OptionsStyles from "./Options.module.css";

const Options: React.FC = (): JSX.Element => {
  return (
    <div className={OptionsStyles.options}>
      <Link href={"/"}>
        <a className={OptionsStyles.optionsIcon}>
          <RiHomeFill />
        </a>
      </Link>

      <Link href={"/"}>
        <a className={OptionsStyles.optionsIcon}>
          <RiUserFill />
        </a>
      </Link>

      <Link href={"/"}>
        <a className={OptionsStyles.optionsIcon}>
          <TbNotes />
        </a>
      </Link>

      <Link href={"/"}>
        <a className={OptionsStyles.optionsIcon}>
          <RiNotification3Fill />
        </a>
      </Link>

      <Link href={"/Settings"}>
        <a className={OptionsStyles.optionsIcon}>
          <RiSettings4Fill />
        </a>
      </Link>
    </div>
  );
};

export default Options;
