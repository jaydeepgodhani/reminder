"use client";
import { useEffect, useState } from "react";
import { timers } from "../constants";
import NewReminder from "./addReminder";
import Reminders, { Imessage } from "./reminders";

export default function Dashboard() {
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [data, setData] = useState<Imessage[]>();
  useEffect(() => {
    setLastUpdated(new Date().toUTCString());
  }, []);
  let arr = [];
  const refreshHandler = () => {
    // what to do on refresh
    const localReminder = localStorage.getItem("reminders");
    if (localReminder) {
      const reminders = JSON.parse(localReminder);
      for (const reminder of reminders) {
        const lastviewed = new Date(reminder.lastViewed);
        const currentInterval = reminder.currentInterval;
        console.log(lastviewed, currentInterval);
        const displayAt = lastviewed.setHours(
          lastviewed.getHours() + timers[currentInterval]
        );
        if(new Date().getTime() > new Date(displayAt).getTime()) {
          arr.push(reminder);
        }
        console.log(new Date(displayAt));
        console.log("---");
      }
      setData(arr);
    } else {
      // what ?
    }
    console.log("9");
  };

  return (
    <div>
      {lastUpdated && `Last Updated at ${lastUpdated}`}
      <br />
      <button onClick={refreshHandler}>Refresh</button>
      <br />
      <Reminders data={data} />
      <br />
      <NewReminder />
    </div>
  );
}
