"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { serviceURL } from "../app/constants";
import Button from "./button";

const transition = {
  duration: 1,
};

export default function NewReminder() {
  const [text, setText] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const inputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const clickHandler = async () => {
    if (text) {
      const response = await fetch(`${serviceURL}/createNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 9,
          content: text,
          tags: ["default"],
        }),
      });
      const jsonData = await response.json();
      // TODO... what to do in case of error and server down
      if (jsonData.status === 200) {
        console.log("successfully added");
        setText(null);
        setIsAdded(true);
        if (textAreaRef.current) textAreaRef.current.value = "";
      } else {
        console.log("failed to add");
      }
    }
  };

  useEffect(() => {
    if (isAdded) {
      const tout = setTimeout(() => {
        setIsAdded(false);
      }, 2000);
      return () => {
        clearTimeout(tout);
      };
    }
  }, [isAdded]);

  return (
    <div className="flex items-center">
      <div className="w-full items-center justify-center px-4">
        <div className="flex flex-col py-2">
          <textarea
            rows={4}
            onChange={inputHandler}
            ref={textAreaRef}
            className="p-2 border-[2px] rounded-xl"
            placeholder="Add something to get a revision reminder"
          />
        </div>
        <div className="py-2 flex w-full items-center">
          <div className="ml-auto mr-4">
            <AnimatePresence>
              {isAdded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: transition }}
                  transition={transition}
                  className="flex items-center text-green-600"
                >
                  <MdDone />
                  &nbsp; Added Successfully
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="right-0">
            <Button onClick={clickHandler} bgColor={"#000000"}>
              <div className="flex items-center">
                <IoMdAdd />
                &nbsp; Add a reminder
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
