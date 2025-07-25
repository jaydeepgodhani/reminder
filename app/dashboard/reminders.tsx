'use client';
import { useState } from "react";
import ReminderWithOptions from "./reminder";

export interface Imessage {
  data: string;
  lastViewed: string;
  currentInterval: number;
}

// const messages: Imessage[] = [
//   {
//     data: "zero",
//     lastViewed: new Date(),
//     currentInterval: 0,
//   },
//   {
//     data: "first",
//     lastViewed: new Date(),
//     currentInterval: 1,
//   },
//   {
//     data: "second",
//     lastViewed: new Date(),
//     currentInterval: 2,
//   },
//   {
//     data: "third",
//     lastViewed: new Date(),
//     currentInterval: 3,
//   },
//   {
//     data: "fourth",
//     lastViewed: new Date(),
//     currentInterval: 4,
//   },
//   {
//     data: "fifth",
//     lastViewed: new Date(),
//     currentInterval: 5,
//   },
//   {
//     data: "sixth",
//     lastViewed: new Date(),
//     currentInterval: 6,
//   },
// ];

export default function Reminders() {
  const [currentReminder, setCurrentReminder] = useState<number>(0);

  let messages: Imessage[] = [];
  const reminders = localStorage.getItem('reminders');
  if(reminders) {
    const jsonReminder = JSON.parse(reminders);
    messages = jsonReminder.map((obj: Imessage) => {
      return {
        data: obj.data,
        lastViewed: new Date(obj.lastViewed),
        currentInterval: obj.currentInterval
    }});
  }

  if (messages.length === 0) return <p>No reminders. Keep up the revisions.</p>;
  if (currentReminder >= messages.length)
    return <p>You did everything. Awesome.</p>;

  return (
    <ReminderWithOptions
      message={messages[currentReminder]}
      setCurrentReminder={setCurrentReminder}
    />
  );
}