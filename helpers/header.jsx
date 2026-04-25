import { useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { serviceURL } from "../app/constants";
import Button from "./button";

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
    setLastUpdated(new Date().toUTCString());
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
            <IoMdRefresh />
            &nbsp; Refresh
          </div>
        </Button>
      </div>
      <div className="w-1/4"></div>
    </div>
  );
}
