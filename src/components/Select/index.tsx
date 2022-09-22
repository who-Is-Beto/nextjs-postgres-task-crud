import React, { useEffect, useState } from "react";
import SelectStyles from "./Select.module.css";
import { AiOutlineCaretDown } from "react-icons/ai";
import Option from "./Option";
import { setLenguage } from "@/store/services/slice/appSlice";
import { TLenguages } from "shimps";
import { useDispatch } from "react-redux";

const Select: React.FC<{ value: any }> = ({ value }): JSX.Element => {
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");
  const dispatch = useDispatch();

  const toggleActive = (): void => {
    setActive(!active);
  };

  const handleSelectLeanguage = (lenguage: string): void => {
    setLabel(lenguage);
    dispatch(setLenguage(lenguage as TLenguages));
  };

  useEffect(() => {
    Object.entries(value).forEach(([key, lengValue]) => {
      if (lengValue === true) {
        setLabel(key);
      }
    });
  }, []);
  return (
    <>
      <button className={SelectStyles.select} onClick={toggleActive}>
        <span className={SelectStyles.selectSpan}>
          {label}{" "}
          <AiOutlineCaretDown
            className={`${SelectStyles.downIcon} ${active ? "upsideDown" : ""}`}
          />
        </span>
        {active && <div onClick={toggleActive} className={`${SelectStyles.selectViewport}`}></div>}

        {active && (
          <div className={SelectStyles.selectContainer}>
            {Object.keys(value).map((key) => (
              <div key={key} className={`animate__animated  animate__fadeInDown`}>
                <Option onSelect={handleSelectLeanguage} label={key} />
              </div>
            ))}
          </div>
        )}
      </button>
    </>
  );
};

export default Select;
