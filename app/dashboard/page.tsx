"use client";
import { useEffect, useState } from "react";
import { getLocalStorage, timers } from "../constants";
import NewReminder from "./addReminder";
import Reminders, { Imessage } from "./reminders";

export default function Dashboard() {
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [data, setData] = useState<Imessage[]>();

  let arr = [];
  const refreshHandler = () => {
    setLastUpdated(new Date().toUTCString());
    // what to do on refresh
    const reminders = getLocalStorage();
    for (const reminder of reminders) {
      const lastviewed = new Date(reminder.lastViewed);
      const currentInterval = reminder.currentInterval;
      const displayAt = lastviewed.setHours(
        lastviewed.getHours() + timers[currentInterval]
      );
      if (new Date().getTime() > new Date(displayAt).getTime()) {
        arr.push(reminder);
      }
    }

    setData(arr);
  };

  useEffect(() => {
    refreshHandler();
  }, []);

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
