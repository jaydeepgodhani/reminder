import { Imessage } from "./dashboard/reminders";

export const timers: number[] = [
  12, 24, 72, 120, 168, 360, 540, 720, 900, 1080, 1260,
];

export const getLocalStorage = () => {
  const localReminder = localStorage.getItem("reminders");
  if (localReminder) {
    try {
      return JSON.parse(localReminder);
    } catch {
      return [];
    }
  }
  else return [];
};

export const getNow = () => {
  const now = new Date();
  now.setMilliseconds(0);
  return now;
}

export const findFromLocalStorage = (message: Imessage, messages: Imessage[]): Imessage | null => {
  for(const item of messages) {
    if(item.currentInterval === message.currentInterval && item.lastViewed === message.lastViewed)
      return item;
  }
  return null;
}