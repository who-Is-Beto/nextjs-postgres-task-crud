import { createContext, useContext } from "react";

const SelectContext = createContext<{
  selectedOption: string;
  changeSelectedOption: (option: string) => void;
}>({
  selectedOption: "",
  changeSelectedOption: (option) => {}
});

const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("Select compound components cannot be rendered outside the Select component");
  }
  return context;
};

export { SelectContext, useSelectContext };
