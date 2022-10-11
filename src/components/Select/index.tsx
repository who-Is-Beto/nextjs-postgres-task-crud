import React, { ReactNode, useEffect, useRef, useState } from "react";
import { SelectContext } from "./SelectContext";
import { useDispatch } from "react-redux";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { AiFillCaretDown } from "react-icons/ai";
import SelectStyles from "./Select.module.css";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

const Select: React.FC<{
  children: ReactNode | ReactNode[];
  defaultValue?: string;
  placeholder?: string;
  selectHandler: ActionCreatorWithPayload<any, any>;
}> = ({ children, defaultValue, placeholder, selectHandler }): JSX.Element => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState<string>(defaultValue || "");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const handleShowDropdown = (): void => setShowDropdown(!showDropdown);
  const selectPlaceholder = placeholder || "Select an option";

  const selectContainerRef = useRef<HTMLDivElement>(null);

  const handleClickOutSide = () => setShowDropdown(false);

  useOnClickOutside(selectContainerRef, handleClickOutSide);
  const updateSelectedOption = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  useEffect((): void => {
    if (selectedOption) {
      dispatch(selectHandler(selectedOption));
    }
  }, [selectedOption, selectHandler, dispatch]);

  return (
    <SelectContext.Provider
      value={{
        selectedOption,
        changeSelectedOption: updateSelectedOption
      }}
    >
      <div className={SelectStyles.select} ref={selectContainerRef}>
        <span className={SelectStyles.selectSpan} onClick={handleShowDropdown}>
          {selectedOption.length > 0 ? selectedOption : selectPlaceholder}
          <AiFillCaretDown
            className={`${SelectStyles.selectIcon} ${showDropdown ? "rotate" : ""}`}
          />
        </span>
        {showDropdown && <ul className={SelectStyles.selectList}>{children}</ul>}
      </div>
    </SelectContext.Provider>
  );
};

export default Select;
