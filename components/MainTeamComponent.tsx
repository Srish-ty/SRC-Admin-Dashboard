"use client";

import { useState } from "react";
import RenderTeamCards from "./TeamCard";
import Dashboard from "./EventDashboard";
import Header from "./Header";

type MainTeamComponentProps = {
  eventID: string;
};

const MainTeamComponent = ({ eventID }: MainTeamComponentProps) => {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="flex justify-center items-center mt-3 md:px-2 mb-3.5 max-md:rounded-bl-3xl max-md:rounded-br-3xl">
      <Header />
      <div className="flex flex-col lg:flex-row gap-y-4 w-full ">
        <div className=" w-full pb-10 lg:pb-0 lg:w-1/3 mt-[95px] md:mt-[105px]">
          <Dashboard isDark={isDark} eventName={eventID} />
        </div>
        <div className="flex flex-col justify-center  items-center w-auto lg:w-2/3 mt-[20px] lg:mt-[105px] gap-y-4">
          <RenderTeamCards
            isDarkMode={isDark}
            setDark={setIsDark}
            eventName={eventID}
          />
        </div>
      </div>
    </div>
  );
};

export default MainTeamComponent;
