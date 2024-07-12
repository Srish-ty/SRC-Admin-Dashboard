"use client";

import RenderTeamCards from "./TeamCard";
import Dashboard from "./EventDashboard";
import Header from "./Header";

type MainTeamComponentProps = {
  eventID: string;
};

const MainTeamComponent = ({ eventID }: MainTeamComponentProps) => {
  return (
    <div className="flex justify-center items-center mt-3 md:px-2 mb-3.5 max-md:rounded-bl-3xl max-md:rounded-br-3xl">
      <Header />
      <div className="flex flex-col lg:flex-row gap-4 w-screen px-4">
        <div className="w-full lg:w-1/3 mt-[95px] md:mt-[105px]">
          <Dashboard eventName={eventID} />
        </div>
        <div className="flex flex-col justify-center items-center w-full lg:w-2/3 mt-[20px] lg:mt-[105px] gap-4">
          <RenderTeamCards eventName={eventID} />
        </div>
      </div>
    </div>
  );
};

export default MainTeamComponent;
