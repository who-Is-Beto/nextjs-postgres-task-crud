import { AiOutlineCloseCircle } from "react-icons/ai";
import { useToastContext } from "../ToastContext";

export default function ToastIcon() {
  const context = useToastContext();

  if (!context) <></>;
  return (
    <div>
      <AiOutlineCloseCircle />
    </div>
  );
}
