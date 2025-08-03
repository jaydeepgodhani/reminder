"use client";
import { AnimatePresence, motion } from "motion/react";
import {
  findFromLocalStorage,
  getLocalStorage,
  getNow,
  timers,
} from "../constants";
import Button from "./button";
import { Imessage } from "./reminders";

const transition = {
  duration: 0.3,
};

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
    const floorDueDays = Math.floor(dueDays - timers[currentInterval] / 24);
    return floorDueDays < 0 ? 0 : floorDueDays;
  };

  return (
    <div className="flex items-center border-b-1 py-4">
      <div className="w-1/4"></div>
      <div className="w-1/2">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: transition }}
            transition={transition}
            key={Math.random()}
            className="flex flex-col w-full"
          >
            <div className="py-2">{data}</div>
            <div className="py-2 w-fit ml-auto">
              <b>Due</b> : {dueDays()} days
            </div>
            <div className="flex py-2 justify-between">
              <div className="-ml-6">
                <Button onClick={skipHandler} textColor={"black"}>
                  Skip
                </Button>
              </div>
              <div className="flex space-between items-center">
                <div className="w-fit mr-2">Remind again in</div>&emsp;
                {currentInterval > 0 && (
                  <div className="mr-2">
                    <Button onClick={previousHandler} bgColor={"#3373C4"}>
                      {times(currentInterval - 1)}
                    </Button>
                  </div>
                )}
                {currentInterval < timers.length - 1 && (
                  <div>
                    <Button onClick={currentHandler} bgColor={"#3373C4"}>
                      {times(currentInterval)}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="w-1/4"></div>
    </div>
  );
};

export default ReminderWithOptions;
