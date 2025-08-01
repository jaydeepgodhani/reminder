"use client";
import { useEffect, useState } from "react";
import { getLocalStorage, getNow, timers } from "../constants";
import NewReminder from "./addReminder";
import Reminders, { Imessage } from "./reminders";

export default function Dashboard() {
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [data, setData] = useState<Imessage[]>();

  const refreshHandler = () => {
    let arr = [];
    setLastUpdated(new Date().toUTCString());
    // what to do on refresh
    const reminders = getLocalStorage();
    for (const reminder of reminders) {
      const lastviewed = new Date(reminder.lastViewed).getTime();
      const now = getNow().getTime();
      const currentInterval = reminder.currentInterval;
      const displayAt = new Date(lastviewed);
      if (now > lastviewed + timers[currentInterval] * 60 * 1000) {
        arr.push(reminder);
      }
    }
    setData(arr.slice());
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
