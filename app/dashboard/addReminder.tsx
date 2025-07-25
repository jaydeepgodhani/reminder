'use client';
import { useState } from "react";

export default function NewReminder() {

  const [text, setText] = useState<string>("");

  const inputHandler = (e: any) => {
    setText(e.target.value);
  };

  const clickHandler = (e: any) => {
    messages.push({
      // if not null then only add
      data: text,
      lastViewed: new Date(),
      currentInterval: 0,
    });
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