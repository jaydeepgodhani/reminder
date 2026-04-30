"use client";
import { ReactNode, useEffect, useState } from "react";
import ReminderWithOptions from "./reminder";

export interface GetNotesRes {
  userId: number;
  noteId: number;
  currentInterval: number;
  id: number;
  updatedAt: Date;
  user: {
    username: string;
  };
  note: {
    id: number;
    tags: string[];
    content: string;
  };
}

const Structure = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full flex items-center border-b-1 py-4">
      <div className="w-full flex flex-col">{children}</div>
    </div>
  );
};

export default function Reminders({
  data,
}: {
  data: GetNotesRes[] | undefined;
}) {
  const [currentReminder, setCurrentReminder] = useState<number>(0);

  useEffect(() => {
    setCurrentReminder(0);
  }, [data]);

  if (!data || data.length === 0)
    return <Structure>No reminders. Keep up the revisions.</Structure>;
  if (data && currentReminder >= data.length)
    return <Structure>You did everything. Awesome.</Structure>;

  return (
    <ReminderWithOptions
      message={data[currentReminder]}
      setCurrentReminder={setCurrentReminder}
    />
  );
}
