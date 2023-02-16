import { Task, User } from "@prisma/client";
import { Interface } from "readline";

type TaskTates = "pending" | "in progress" | "done";

type TIncomingTime =
  | "today"
  | "next 3 days"
  | "this week"
  | "this month"
  | "next month"
  | "all";

type IUserLoginData = {
  email: IUserLoginType;
  password: IUserLoginType;
};

interface TDataSendLogin {
  email: string;
  password: string;
}

interface TDataToGetTasks {
  userId: number;
}

interface TDataSendRegister extends TDataSendLogin {
  username: string;
}

interface DataResponseMessage {
  message: string;
}

interface DataResponseSuccess extends DataResponseMessage {
  user?: User;
  tasks?: Task[];
}

interface TDataResponseError {
  error: { data: TDataResponseLoginSuccess; status: number };
}

declare type IResponse = {
  user?: User;
  tasks?: Task[];
  message: string;
  error?: string;
};

interface IUserConfig {
  darkMode: boolean;
  incomingTime: TIncomingTime;
}

interface IStore {
  config: IUserConfig;
}

interface IRouteProperties {
  protect: boolean;
  name: string;
  path: TRouteNames;
  accessWithToken?: boolean;
}

export interface ModalProps {
  component?: React.FC<any>;
  props?: { [key: string]: unknown };
  isVisible?: boolean;
  closable?: boolean;
  onClose?: Function;
  closeModal?: Function;
  width?: number;
  title?: string;
  className?: string;
  enableBottomSheet?: boolean;
  fullScreen?: boolean;
  closeIcon?: boolean;
  headingClassName?: boolean;
  headingComponent?: React.FC<any>;
  bottomSheetFooter?: React.FC<any>;
  bottomSheetClassName?: string;
  modalFooter?: JSX.Element[];
  closeable?: boolean;
  centered?: boolean;
}
//types for confirmation modals
export interface ConfirmationModalProps {
  title?: string;
  message?: string;
  onCancel?: Function;
  onOkay?: Function;
  cancelLabel?: string;
  okayLabel?: string;
  isHeading?: string;
  isBackdropCloseable?: boolean;
  closable?: boolean;
}
//types for async confirmation modals
export interface AsyncConfirmationModalProps {
  title?: string;
  message?: string;
  cancelLabel?: string;
  okayLabel?: string;
  closable?: boolean;
}

declare type FormField = {
  textArea?: boolean;
  type: TInputs;
  name: string;
  placeholder: string;
  label: string;
};

declare type TInputs =
  | "text"
  | "password"
  | "email"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "color"
  | "date"
  | "datetime-local"
  | "time"
  | "month"
  | "week";

type TButtons =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";
