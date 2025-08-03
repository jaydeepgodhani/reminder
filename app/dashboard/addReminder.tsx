'use client';
import { useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { getLocalStorage, getNow } from "../constants";
import Button from "./button";

export default function NewReminder() {

  const [text, setText] = useState<string|null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const textAreaRef = useRef(null);

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
      localStorage.setItem("reminders", JSON.stringify(jsonReminder));
      setText(null);
      setIsAdded(true);
      textAreaRef.current.value = null;
    }
  };

  useEffect(()=> {
    if(isAdded){
      const tout = setTimeout(()=> {
        setIsAdded(false);
      }, 2000);
      return () => {
        clearTimeout(tout);
      };
    }
  }, [isAdded]);

  return (
    <div className="flex items-center">
      <div className="w-1/4"></div>
      <div className="w-1/2 items-center justify-center">
        <div className="flex flex-col py-2">
          <textarea
            rows="4"
            onChange={inputHandler}
            ref={textAreaRef}
            className="p-2 border rounded-xl"
            placeholder="Add something to get a revision reminder"
          />
        </div>
        <div className="py-2 flex">
          <Button onClick={clickHandler} bgColor={"#000000"}>
            <div className="flex items-center">
              <IoMdAdd />
              &nbsp; Add a reminder
            </div>
          </Button>
          {isAdded && <div className="flex items-center text-green-600">
            &emsp;
            <MdDone />
            Added Successfully !
          </div>}
        </div>
      </div>
      <div className="w-1/4"></div>
    </div>
  );
}