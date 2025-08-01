"use client";
import {
  findFromLocalStorage,
  getLocalStorage,
  getNow,
  timers,
} from "../constants";
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
    <div className="flex flex-col">
      {data}
      <br />
      Due {dueDays()} days
      <br />
      Remind again in...
      <br />
      <div className="flex space-between">
        {currentInterval > 0 && (
          <button onClick={previousHandler} className="border p-2 bg-blue-700">
            {times(currentInterval - 1)}
          </button>
        )}
        <button onClick={skipHandler} className="border p-2">
          Skip
        </button>
        {currentInterval < timers.length - 1 && (
          <button onClick={currentHandler} className="border p-2 bg-red-700">
            {times(currentInterval)}
          </button>
        )}
      </div>
    </div>
  );
};

export default ReminderWithOptions;
