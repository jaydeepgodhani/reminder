"use client";
import {
  findFromLocalStorage,
  getLocalStorage,
  getNow,
  timers,
} from "../constants";
import Button from "./button";
import { Imessage } from "./reminders";

const ReminderWithOptions: React.FC<{
  message: Imessage;
  setCurrentReminder: React.Dispatch<React.SetStateAction<number>>;
}> = ({ message, setCurrentReminder }) => {
  const { data, currentInterval, lastViewed } = message;
  const previousHandler = () => {
    // update date & minus one
    const reminders = getLocalStorage();
    const reminder = findFromLocalStorage(message, reminders);
    if (reminder) {
      reminder.currentInterval = reminder.currentInterval - 1;
      const now = getNow();
      reminder.lastViewed = now.toISOString();
    }
    localStorage.setItem("reminders", JSON.stringify(reminders));
    setCurrentReminder((e: number) => e + 1);
  };

  const currentHandler = () => {
    // update date
    const reminders = getLocalStorage();
    const reminder = findFromLocalStorage(message, reminders);
    if (reminder) {
      reminder.currentInterval = reminder.currentInterval + 1;
      const now = getNow();
      reminder.lastViewed = now.toISOString();
    }
    localStorage.setItem("reminders", JSON.stringify(reminders));
    setCurrentReminder((e: number) => e + 1);
  };

  const skipHandler = () => {
    setCurrentReminder((e: number) => e + 1);
  };

  const times = (interval: number) => {
    if (timers[interval] <= 24) return timers[interval] + " Hours";
    else return timers[interval] / 24 + " Days";
  };

  const dueDays = (): number => {
    const now = getNow().getTime();
    const lastViewedDate = new Date(lastViewed).getTime();
    const dueDays = (now - lastViewedDate) / (1000 * 60 * 60 * 24);
    return Math.floor(dueDays) - (timers[currentInterval]/24);
  }

  return (
    <div className="flex items-center border-b-1 py-4">
      <div className="w-1/4"></div>
      <div className="w-1/2 flex flex-col">
        <div className="py-2">{data}</div>
        <div className="py-2">
          <b>Due</b> : {dueDays()} days
        </div>
        <div className="py-2">
          Remind again in...
          <br />
          <br />
          <div className="flex space-between">
            {currentInterval > 0 && (
              <Button onClick={previousHandler} color={"#ffff00"}>
                {times(currentInterval - 1)}
              </Button>
            )}
            <Button onClick={skipHandler} color={"#000000"}>
              Skip
            </Button>
            {currentInterval < timers.length - 1 && (
              <Button onClick={currentHandler} color={"#ffff00"}>
                {times(currentInterval)}
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="w-1/4"></div>
    </div>
  );
};

export default ReminderWithOptions;
