"use client";

import { Button } from "flowbite-react";
import RenderTeamCards from "./TeamCard";
import { useState } from "react";

const eventsList = [
    "Chem-E-Car",
    "Chem-E-Jeopardy",
    "K-12 Stem",
    "Student Poster Competition",
    "Student Technical Paper",
  ];

const MainTeamComponent = () => {const [activeTab, setActiveTab] = useState(0);
 
    
  return (
    
    <div className="mt-3 pl-2 pr-2  mb-3.5 rounded-xl ">
      <div className="   fixed top-0 z-50 bg-white ">
        <div className="bg-black p-4 text-white rounded-3xl flex justify-evenly items-center mt-3  ">
          <div className="text-2xl font-bold">SRC-2024 Team Dashboard</div>
          <div className="w-2/3">
            <div className="grid grid-cols-5 gap-x-2">
              {eventsList.map((event, index) => (
                <Button
                  className="flex justify-center items-center bg-gray-800 text-white hover:bg-gray-700"
                  key={index}
                  onClick={() => setActiveTab(index)}
                >
                  {event}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-[13%] gap-y-4 w-auto">
        <RenderTeamCards activeTab={activeTab} />
      </div>
    </div>
  );
};



  export default MainTeamComponent