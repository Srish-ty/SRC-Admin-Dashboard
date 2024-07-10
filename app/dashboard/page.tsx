"use client";

import { Table, Select, Button } from "flowbite-react";

export default function Component() {
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

  return (
    <main>
      <div className="flex pl-3 pr-3 mt-3 mb-4 justify-between items-center">
        <div className="text-3xl">SRC_2k24 Admin Dashboard</div>
        <div className="flex gap-x-4 items-center">
          <div className="text-3xl">Select the event :</div>
          <Select id="countries" required className="w-auto min-w-0">
            {eventsList.map((event) => (
              <option key={event}>{event}</option>
            ))}
          </Select>
          <Button>Fetch Details</Button>
        </div>
      </div>
      <div className="overflow-x-auto pl-3 pr-3">
        <Table hoverable>
          <Table.Head>
            {tableHeadings.map((heading) => (
                <Table.HeadCell key={heading} className="text-lg">{heading}</Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className=" font-medium text-gray-900 dark:text-white">
                Apple MacBook Pro 17
              </Table.Cell>
              <Table.Cell>Sliver</Table.Cell>
              <Table.Cell>Laptop</Table.Cell>
              <Table.Cell>$2999</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Microsoft Surface Pro
              </Table.Cell>
              <Table.Cell>White</Table.Cell>
              <Table.Cell>Laptop PC</Table.Cell>
              <Table.Cell>$1999</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Magic Mouse 2
              </Table.Cell>
              <Table.Cell>Black</Table.Cell>
              <Table.Cell>Accessories</Table.Cell>
              <Table.Cell>$99</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </main>
  );
}
