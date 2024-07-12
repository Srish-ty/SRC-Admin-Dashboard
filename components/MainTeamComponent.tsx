"use client";

import RenderTeamCards from "./TeamCard";
import Dashboard from "./EventDashboard";
import Header from "./Header";

type MainTeamComponentProps = {
  eventID: string;
};

const MainTeamComponent = ({ eventID }: MainTeamComponentProps) => {
  return (
    <div className="mt-3 pl-2 pr-2 mb-3.5 rounded-xl">
      <Header />
      <div className="flex flex-col md:flex-row gap-y-4 w-full">
        <div className="w-full md:w-1/3 mt-4 md:mt-[8%]">
          <Dashboard eventName={eventID} />
        </div>
        <div className="flex flex-col justify-center items-center w-full md:w-auto mt-4 md:mt-[8%] gap-y-4">
          <RenderTeamCards eventName={eventID} />
        </div>
      </div>
    </div>
  );
};

export default MainTeamComponent;
