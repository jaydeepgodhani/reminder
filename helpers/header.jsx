import { useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { serviceURL } from "../app/constants";
import Button from "./button";
const timePlaceholder = "-:-";

export default function Header({ setData }) {
  const [lastUpdated, setLastUpdated] = useState(null);

  const refreshHandler = async () => {
    const response = await fetch(`${serviceURL}/getNotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 9,
      }),
    });
    const jsonData = await response.json();
    // TODO... what to do in case of error and server down
    if (jsonData.status === 200) {
      console.log("successfully fetched all notes");
      setData(jsonData.data);
    } else {
      console.log("failed to fetch");
    }
    const now = new Date();
    const minutes =
      now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
    const formattedDate = `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}, ${now.getHours()}:${minutes} UTC`;
    setLastUpdated(formattedDate);
  };

  useEffect(() => {
    refreshHandler();
  }, []);

  return (
    <div className="flex items-center">
      <div className="w-full flex flex-col md:flex-row items-center h-full justify-between border-b-2 border-black px-4 py-4">
        <div>
          <b>Last Updated</b> : {lastUpdated ? lastUpdated : timePlaceholder}
        </div>

        <Button
          onClick={refreshHandler}
          bgColor={"transparent"}
          textColor={"black"}
        >
          <div className="flex items-center justify-center">
            <IoMdRefresh />
            &nbsp; Refresh
          </div>
        </Button>
      </div>
    </div>
  );
}
