import { TaskTates, TIncomingTime, TLenguages } from "shimps";

export const taskStates: TaskTates[] = ["pending", "in progress", "done"];

export const Langs: TLenguages[] = ["english", "spanish"];

export const IncomingDates: TIncomingTime[] = [
  "today",
  "next 3 days",
  "this month",
  "next month",
  "this week",
  "all"
];
