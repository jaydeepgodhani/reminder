"use client";
import { useState } from "react";
import NewReminder from "../helpers/addReminder";
import Header from "../helpers/header";
import Reminders, { Imessage } from "../helpers/reminders";

export default function Dashboard() {
  const [data, setData] = useState<Imessage[]>();

  return (
    <div className="w-full flex justify-center">
      <div className=""></div>
      <div className="w-full">
        <Header setData={setData} />
        <Reminders data={data} />
        <br />
        <NewReminder />
      </div>
    </div>
  );
}
