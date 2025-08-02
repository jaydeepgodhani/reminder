'use client';
import { useState } from "react";
import { getLocalStorage, getNow } from "../constants";
import Button from "./button";

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
      <div className="w-1/2 items-center justify-center">
        <div className="flex flex-col py-2">
          <textarea
            rows="4"
            onChange={inputHandler}
            className="p-2 border rounded-xl"
            placeholder="Add something to get a revision reminder"
          />
        </div>
        <Button onClick={clickHandler} color={"#50d71e"}>
          Add a reminder
        </Button>
      </div>
      <div className="w-1/4"></div>
    </div>
  );
}