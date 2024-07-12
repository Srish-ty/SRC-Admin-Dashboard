import React, { useState } from "react";
import Image from "next/image";
import { eventsList } from "@/staticData/teamData";
import Link from "next/link";
import { Button } from "flowbite-react";

const Navbar = () => {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col items-center gap-y-2 w-full md:w-auto">
        {eventsList.map((event, index) => (
          <Link
            key={index}
            href={`/dashboard/teams/${event}`}
            className="w-full"
          >
            <Button className="w-[80%] flex justify-center items-center bg-gray-800 h-auto p-2 text-white hover:bg-gray-700 ">
              {event}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
