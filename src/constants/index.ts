import { TaskTates, TIncomingTime } from "shimps";

export const taskStates: TaskTates[] = ["pending", "in progress", "done"];

export const IncomingDates: TIncomingTime[] = [
  "today",
  "next 3 days",
  "this week",
  "this month",
  "next month",
  "all"
];

export const IncomingDatesTracked: Map<TIncomingTime, Date> = new Map([
  ["today", new Date()],
  ["next 3 days", new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)],
  ["this week", new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)],
  ["this month", new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)],
  ["next month", new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000)],
  ["all", new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000)]
]);
