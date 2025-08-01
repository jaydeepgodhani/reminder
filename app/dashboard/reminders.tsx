"use client";
import { useEffect, useState } from "react";
import ReminderWithOptions from "./reminder";

export interface Imessage {
  data: string;
  lastViewed: string;
  currentInterval: number;
}

export default function Reminders({ data=[] }) {
  const [currentReminder, setCurrentReminder] = useState<number>(0);

  useEffect(()=>{
    setCurrentReminder(0);
  }, [data]);

  let messages: Imessage[] = [];

  if (data.length === 0) return (
    <p className="font-mono">
      No reminders. Keep up the revisions.
    </p>
  );
  if (currentReminder >= data.length)
    return <p>You did everything. Awesome.</p>;

  return (
    <ReminderWithOptions
      message={data[currentReminder]}
      setCurrentReminder={setCurrentReminder}
    />
  );
}
