"use client";
import { AnimatePresence, motion } from "motion/react";
import { getNow, serviceURL, timers } from "../app/constants";
import Button from "./button";
import { GetNotesRes } from "./reminders";

const transition = {
  duration: 0.3,
};

const ReminderWithOptions: React.FC<{
  message: GetNotesRes;
  setCurrentReminder: React.Dispatch<React.SetStateAction<number>>;
}> = ({ message, setCurrentReminder }) => {
  const { note, currentInterval, updatedAt, noteId } = message;
  const content = note.content;

  const updateNoteHandler = async (increase: boolean) => {
    const response = await fetch(`${serviceURL}/updateNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 9,
        noteId: noteId,
        increase: increase,
      }),
    });
    const jsonData = await response.json();
    // TODO... what to do in case of error and server down
    if (jsonData.status === 200) {
      console.log("successfully updated");
    } else {
      console.log("failed to update");
    }
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
    const lastViewedDate = new Date(updatedAt).getTime();
    const dueDays = (now - lastViewedDate) / (1000 * 60 * 60 * 24);
    const floorDueDays = Math.floor(dueDays - timers[currentInterval] / 24);
    return floorDueDays < 0 ? 0 : floorDueDays;
  };

  return (
    <div className="flex w-full items-center py-4 px-4">
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: transition }}
            transition={transition}
            key={Math.random()}
            className="flex flex-col w-full"
          >
            <div className="py-2">{content}</div>
            <div className="py-2 w-fit ml-auto">
              <b>Due</b> : {dueDays()} days
            </div>
            <div className="flex py-2 justify-between items-center">
              <div>
                <Button onClick={skipHandler} textColor={"black"}>
                  Skip
                </Button>
              </div>
              <div className="flex space-between items-center flex-col md:flex-row">
                <div className="w-fit mr-2">Remind again in</div>&emsp;
                {currentInterval > 0 && (
                  <div className="md:mr-2">
                    <Button
                      onClick={() => updateNoteHandler(false)}
                      bgColor={"#3373C4"}
                    >
                      {times(currentInterval - 1)}
                    </Button>
                  </div>
                )}
                {currentInterval < timers.length - 1 && (
                  <div>
                    <Button
                      onClick={() => updateNoteHandler(true)}
                      bgColor={"#3373C4"}
                    >
                      {times(currentInterval)}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReminderWithOptions;
