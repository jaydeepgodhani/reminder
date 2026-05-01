"use client";
import { useState } from "react";
import NewReminder from "../helpers/addReminder";
import Header from "../helpers/header";
import Reminders, { GetNotesRes } from "../helpers/reminders";

export default function Dashboard() {
  const [data, setData] = useState<GetNotesRes[]>();

  return (
    <div className="w-full flex justify-center">
      <div className="w-full md:w-3/4 lg:w-3/4 xl:w-3/5">
        <Header setData={setData} />
        <Reminders data={data} />
        <NewReminder />
      </div>
    </div>
  );
}
