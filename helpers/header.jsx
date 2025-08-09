import { useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { getLocalStorage, getNow, timers } from "../app/constants";
import Button from "./button";

export default function Header({setData}) {
  const [lastUpdated, setLastUpdated] = useState(null);

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
    <div className="flex h-20 items-center border-b-1 border-black">
      <div className="w-1/4"></div>
      <div className="w-1/2 flex flex-row items-center justify-between">
        {lastUpdated && (
          <div>
            <b>Last Updated</b> : {lastUpdated}
          </div>
        )}

        <Button onClick={refreshHandler} bgColor={"#000000"}>
          <div className="flex items-center">
            <IoMdRefresh />&nbsp; Refresh
          </div>
        </Button>
      </div>
      <div className="w-1/4"></div>
    </div>
  );
}
