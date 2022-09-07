import React from "react";
import Options from "./Options";
import NavbarStyles from "./Navbar.module.css";

const Navbar: React.FC = (): JSX.Element => {
  return (
    <header className={NavbarStyles.navbarHeader}>
      <nav className={NavbarStyles.navbarContainer}>
        <Options />
      </nav>
    </header>
  );
};

export default Navbar;
