"use client";

import { Table, Select, Button } from "flowbite-react";
import { data } from "./sampleData";
import { useState } from "react";

export default function Component() {
  const [event, setEvent] = useState("Chem-E-Car");

  const eventsList = [
    "Chem-E-Car",
    "Chem-E-Jeopardy",
    "K-12 Stem",
    "Student Poster Competition",
    "Student Technical Paper",
  ];

  const tableHeadings = [
    "User Name",
    "User ID",
    "Phone No.",
    "Mail ID",
    "College",
    "ID Card",
    "AICHE ID",
    "SRC ID",
    "T-Shirt Size",
  ];

  function handleSelect(event: any) {
    setEvent(event);
  }

  return (
    <main>
      <div className="flex pl-3 pr-3 mt-3 mb-4 justify-between items-center">
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
          <Button onClick={() => handleSelect(event)}>Fetch Details</Button>
        </div>
      </div>
      <div className="overflow-x-auto pl-3 pr-3">
        <Table hoverable>
          <Table.Head>
            {tableHeadings.map((heading) => (
              <Table.HeadCell key={heading} className="text-lg">
                {heading}
              </Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            {data.user.map((user, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="font-medium text-gray-900 dark:text-white">
                  {user.name}
                </Table.Cell>
                <Table.Cell>{user.mail}</Table.Cell>
                <Table.Cell>{user.mobile}</Table.Cell>
                <Table.Cell>{user.mail}</Table.Cell>
                <Table.Cell>{user.college}</Table.Cell>
                <Table.Cell>
                  <a
                    href={user.idCard}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                  >
                    View ID Card
                  </a>
                </Table.Cell>
                <Table.Cell>{user.aiche_id}</Table.Cell>
                <Table.Cell>{user.srcId}</Table.Cell>
                <Table.Cell>{user.tShirt}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </main>
  );
}
