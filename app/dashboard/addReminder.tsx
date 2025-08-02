'use client';
import { useState } from "react";
import { getLocalStorage, getNow } from "../constants";

export default function NewReminder() {

  const [text, setText] = useState<string>("");

  const inputHandler = (e: any) => {
    setText(e.target.value);
  };

  const clickHandler = (e: any) => {
    const jsonReminder = getLocalStorage();
    if(text) {
      const now = getNow();
      jsonReminder.push({
        // if not null then only add
        data: text,
        lastViewed: now,
        currentInterval: 0,
      });
    }
    localStorage.setItem("reminders", JSON.stringify(jsonReminder));
  };

  return (
    <div className="flex items-center">
      <div className="w-1/4"></div>
      <div className="w-1/2">
        Add a reminder
        <br />
        <input type="text" onChange={inputHandler} className="p-2 border" />
        <button className="border p-2" onClick={clickHandler}>
          Add
        </button>
      </div>
      <div className="w-1/4"></div>
    </div>
  );
}