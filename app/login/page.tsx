'use client';
import { useState } from "react";

export default function Login() {
  const [userName, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const clickHandler = () => {
    console.log(userName);
    console.log(password);
  }
  return (
    <div className="flex items-center justify-center flex-col">
      <input type="text" onChange={(e) => setUserName(e.target.value)} className="border m-2"/>
      <input type="password" onChange={(e) => setPassword(e.target.value)} className="border m-2"/>
      <button onClick={clickHandler} className="p-2 border">Submit</button>
    </div>
  );
}