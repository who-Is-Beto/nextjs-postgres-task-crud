import React from "react";
import ReactLoading from "react-loading";
import Styles from "./loader.module.css";

type LoadingType =
  | "blank"
  | "balls"
  | "bars"
  | "bubbles"
  | "cubes"
  | "cylon"
  | "spin"
  | "spinningBubbles"
  | "spokes";

const Loader: React.FC<{ type: LoadingType }> = ({ type }): JSX.Element => {
  return (
    <div className={Styles.loaderContainer}>
      <ReactLoading type={type} color={"var(--tealBlue)"} />
    </div>
  );
};

export default Loader;
