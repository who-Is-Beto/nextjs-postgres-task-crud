import React, { ReactNode, useEffect, useRef, useState } from "react";
import { SelectContext } from "./SelectContext";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { AiFillCaretDown } from "react-icons/ai";
import SelectStyles from "./Select.module.css";

const Select: React.FC<{
  children: ReactNode | ReactNode[];
  defaultValue?: string;
  placeholder?: string;
  selectHandler?: (value: any) => void;
}> = ({ children, defaultValue, placeholder, selectHandler }): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState<string>(defaultValue || "");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const handleShowDropdown = (): void => setShowDropdown(!showDropdown);
  const selectPlaceholder = placeholder || "Select an option";

  const selectContainerRef = useRef<HTMLDivElement>(null);

  const handleClickOutSide = () => setShowDropdown(false);

  useOnClickOutside(selectContainerRef, handleClickOutSide);
  const updateSelectedOption = (option: string): void => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  useEffect((): void => {
    if (selectedOption && selectHandler) {
      selectHandler(selectedOption);
    }
  }, [selectedOption, selectHandler]);

  return (
    <SelectContext.Provider
      value={{
        selectedOption,
        changeSelectedOption: updateSelectedOption
      }}
    >
      <div className={SelectStyles.select} onClick={handleShowDropdown} ref={selectContainerRef}>
        <span className={SelectStyles.selectSpan}>
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
