'use client';
import NewReminder from "./addReminder";
import Reminders from "./reminders";

export default function Dashboard() {

  const lastUpdated = new Date();
  const refreshHandler = () => {
    // what to do on refresh
    console.log('9');
  }

  return (
    <div>
      Last Updated at {lastUpdated.toUTCString()}
      <br/>
      Refresh <button onClick={refreshHandler}/>
      <br/>
      <Reminders />
      <br />
      <NewReminder />
    </div>
  );
}
