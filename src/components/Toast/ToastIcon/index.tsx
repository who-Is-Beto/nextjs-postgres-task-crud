import React from "react";
import { ToastStatus, useToastContext } from "../ToastContext";
import { GrStatusGood } from "react-icons/gr";
import { BiErrorCircle } from "react-icons/bi";

import { IconType } from "react-icons";
const ICONS = new Map<ToastStatus, IconType | any>([
  ["success", GrStatusGood],
  ["error", BiErrorCircle]
]);

export default function ToastIcon() {
  const context = useToastContext();
  const Icon = ICONS.get(context.status);
  if (!context) <></>;
  return (
    <div>
      <Icon />
    </div>
  );
}
