'use client';
import { useState } from "react";

export default function NewReminder() {

  const [text, setText] = useState<string>("");

  const inputHandler = (e: any) => {
    setText(e.target.value);
  };

  const clickHandler = (e: any) => {
    const reminders = localStorage.getItem("reminders");
    let jsonReminder = [];
    if(reminders) {
      jsonReminder = JSON.parse(reminders);
    }
    if(text) {
      const now = new Date();
      now.setSeconds(0);
      now.setMilliseconds(0);
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
    <>
      Add a reminder
      <br />
      <input type="text" onChange={inputHandler} className="p-2 border" />
      <button className="border p-2" onClick={clickHandler}>
        Add
      </button>
    </>
  );
}