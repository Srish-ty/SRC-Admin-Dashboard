"use client";

import { Table, Select, Button } from "flowbite-react";
import { data } from "./sampleData";
import { useState } from "react";
import UsersMainComponent from "@/components/usersMainComponent";

export default function Component() {
  // const [event, setEvent] = useState("Chem-E-Car");

  // function handleSelect(event: any) {
  //   setEvent(event);
  // }

  // const handleButtonClick = () => {
  //   console.log("Selected event:", event);
  // };

  return (
    <main>
 {/*      <div className="flex pl-3 pr-3 mt-3 mb-4 justify-between items-center">
        <div className="text-3xl">SRC-2024 Admin Dashboard</div>
        <div className="flex gap-x-4 items-center">
          <div className="text-3xl">Select the event :</div>
          <Select
            id="countries"
            required
            className="w-auto min-w-0"
            value={event}
            onChange={(e) => handleSelect(e.target.value)}
          >
            {eventsList.map((event) => (
              <option key={event}>{event}</option>
            ))}
          </Select>
          <Button onClick={handleButtonClick}>Fetch Details</Button>
        </div>
      </div> */}
    <UsersMainComponent/>
    </main>
  );
}
