import React from "react";
import Options from "./Options";
import NavbarStyles from "./Navbar.module.css";
import { useRouter } from "next/router";

const Navbar: React.FC = (): JSX.Element => {
  const router = useRouter();
  return (
    <header className={NavbarStyles.navbarHeader}>
      <nav className={NavbarStyles.navbarContainer}>
        <Options router={router} />
      </nav>
    </header>
  );
};

export default Navbar;
