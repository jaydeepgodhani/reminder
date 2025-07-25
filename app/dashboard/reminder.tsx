"use client";
import { timers } from "../constants";
import { Imessage } from "./reminders";

const ReminderWithOptions: React.FC<{
  message: Imessage;
  setCurrentReminder: React.Dispatch<React.SetStateAction<number>>;
}> = ({ message, setCurrentReminder }) => {
  const { data, currentInterval, lastViewed } = message;
  const previousHandler = () => {
    // update date & minus one
    setCurrentReminder((e: number) => e + 1);
  };
  const currentHandler = () => {
    // update date
    setCurrentReminder((e: number) => e + 1);
  };

  const skipHandler = () => {
    setCurrentReminder((e: number) => e + 1);
  };

  const previousDays = () => {
    if (timers[currentInterval - 1] <= 24)
      return timers[currentInterval - 1] + " Hours";
    else return timers[currentInterval - 1] / 24 + " Days";
  };

  const currentDays = () => {
    if (timers[currentInterval] <= 24)
      return timers[currentInterval] + " Hours";
    else return timers[currentInterval] / 24 + " Days";
  };

  return (
    <div className="flex flex-col">
      {data}
      <br />
      Remind again in...
      <br />
      <div className="flex space-between">
        {currentInterval > 0 && (
          <button onClick={previousHandler} className="border p-2">
            {previousDays()}
          </button>
        )}
        {currentInterval < timers.length - 1 && (
          <button onClick={currentHandler} className="border p-2">
            {currentDays()}
          </button>
        )}
        <button onClick={skipHandler} className="border p-2">
          Skip
        </button>
      </div>
    </div>
  );
};

export default ReminderWithOptions;
