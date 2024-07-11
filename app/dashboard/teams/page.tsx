"use client";

// Import necessary hooks and components
import { Button } from "flowbite-react";
import { useState } from "react";
import { data } from "./sampleData";

export default function Component() {
  const [activeTab, setActiveTab] = useState(0);
  const eventsList = [
    "Chem-E-Car",
    "Chem-E-Jeopardy",
    "K-12 Stem",
    "Student Poster Competition",
    "Student Technical Paper",
  ];

  // Mock data for team information
  const teamInfo: { [key: string]: { teamName: string; members: string[] }[] } =
    {
      "Chem-E-Car": [
        {
          teamName: "Team A",
          members: [
            "John Doe",
            "Jane Smith",
            "John Doe",
            "John Doe",
            "ggg",
            "John Doe",
          ],
        },
        { teamName: "Team B", members: ["Charlie", "Dave"] },
        { teamName: "Team B", members: ["Charlie", "Dave"] },
        { teamName: "Team B", members: ["Charlie", "Dave"] },
      ],
      "Chem-E-Jeopardy": [
        { teamName: "Team C", members: ["Eve", "Frank"] },
        { teamName: "Team D", members: ["Grace", "Heidi"] },
      ],
      "K-12 Stem": [
        { teamName: "Team E", members: ["Eve", "Frank"] },
        { teamName: "Team F", members: ["Grace", "Heidi"] },
      ],
      // Add more events and their teams here
    };

  // Function to render team cards
  const renderTeamCards = () => {
    const eventKey = eventsList[activeTab];
    const teams = teamInfo[eventKey] || [];

    return teams.map(
      (team: { teamName: string; members: string[] }, index: number) => (
        <div key={index} className="border-2 w-1/3">
          <div className="text-4xl underline mb-4 ml-4 mr-4 mt-4">
            {team.teamName}
          </div>
          <div className="flex flex-col gap-x-2 ml-4 mb-4">
            {team.members.map((member, i) =>
              data.user.find((user) => user.name === member) ? (
                <div key={i} className="text-xl text-left flex gap-x-2">
                  {i + 1}. {member}{" | "}
                  <div>
                    aiche_ID:
                    {data.user.find((user) => user.name === member)?.aiche_id}
                  </div>{"|"}
                  <a
                    href={
                      data.user.find((user) => user.name === member)?.idCard
                    }
                  >
                    🪪ID CARD
                  </a>
                </div>
              ) : null
            )}
          </div>
        </div>
      )
    );
  };

  return (
    <div className="mt-3 pl-3 pr-3 mb-3.5">
      <div className="flex justify-between mb-3.5">
        <div className="text-3xl">SRC-2024 Team Dashboard</div>
        <div className="flex gap-x-2">
          <div className="text-3xl">Click on the event:</div>
          {eventsList.map((event, index) => (
            <Button
              key={index}
              color="gray"
              onClick={() => setActiveTab(index)}
            >
              {event}
            </Button>
          ))}
        </div>
      </div>
      <div className="border-b-2 border-gray-400"></div>
      {/* Render team cards based on the active event */}
      <div className="flex flex-col justify-center items-center mt-8 gap-y-4 w-auto">
        {renderTeamCards()}
      </div>
    </div>
  );
}
