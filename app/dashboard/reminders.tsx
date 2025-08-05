"use client";
import { ReactNode, useEffect, useState } from "react";
import ReminderWithOptions from "./reminder";

export interface Imessage {
  data: string;
  lastViewed: string;
  currentInterval: number;
}

const Structure = ({ children }: {children: ReactNode}) => {
  return (
    <div className="flex items-center border-b-1 py-4">
      <div className="w-1/4"></div>
      <div className="w-1/2 flex flex-col">{children}</div>
      <div className="w-1/4"></div>
    </div>
  );
};

export default function Reminders({ data }: {data: Imessage[] | undefined}) {
  const [currentReminder, setCurrentReminder] = useState<number>(0);

  useEffect(()=>{
    setCurrentReminder(0);
  }, [data]);

  if (!data || data.length === 0) return (
    <Structure>
      No reminders. Keep up the revisions.
    </Structure>
  );
  if (data && currentReminder >= data.length)
    return <Structure>You did everything. Awesome.</Structure>;

  return (
    <ReminderWithOptions
      message={data[currentReminder]}
      setCurrentReminder={setCurrentReminder}
    />
  );
}
