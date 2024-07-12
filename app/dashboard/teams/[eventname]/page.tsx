import React from "react";
import MainTeamComponent from "@/components/MainTeamComponent";

const Chem_A_Car = ({ params }: { params: { eventname: string } }) => {
  return (
    <div>
      <MainTeamComponent eventID={params.eventname} />
    </div>
  );
};

export default Chem_A_Car;
