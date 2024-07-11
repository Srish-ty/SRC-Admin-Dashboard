import { data } from "@/app/dashboard/teams/sampleData";
import { Table } from "flowbite-react";

const eventsList = [
  "Chem-E-Car",
  "Chem-E-Jeopardy",
  "K-12 Stem",
  "Student Poster Competition",
  "Student Technical Paper",
];

const teamInfo: { [key: string]: { teamName: string; members: string[] }[] } = {
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
    { teamName: "Team C", members: ["Charlie", "Dave"] },
    { teamName: "Team D", members: ["Charlie", "Dave"] },
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

const Heading = ["S.No.", "Member Name", "AIChE ID", "ID Card"];

const RenderTeamCards = ({ activeTab }: { activeTab: number }) => {
  const eventKey = eventsList[activeTab];
  const teams = teamInfo[eventKey] || [];

  return (
    <div className="overflow-x-auto">
      {teams.map((team, index) => (
        <div key={index} className="border-2 w-auto p-5 bg-black mb-6 shadow-md rounded-lg">
          <div className="text-3xl font-bold text-center text-white underline mb-6">
            {team.teamName}
          </div>
          <div className="shadow-lg border-2 border-gray-300 rounded-lg overflow-hidden">
            <Table hoverable>
              <Table.Head className="bg-gray-100">
                {Heading.map((item, index) => (
                  <Table.HeadCell key={index} className="text-gray-700 font-semibold">
                    {item}
                  </Table.HeadCell>
                ))}
              </Table.Head>
              <Table.Body className="divide-y bg-white">
                {team.members.map((member, i) => {
                  const user = data.user.find((user) => user.name === member);
                  return user ? (
                    <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {i + 1}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {member}
                      </Table.Cell>
                      <Table.Cell className="text-gray-700">
                        {user.aiche_id}
                      </Table.Cell>
                      <Table.Cell>
                        <a href={user.idCard} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                          🪪ID CARD
                        </a>
                      </Table.Cell>
                    </Table.Row>
                  ) : null;
                })}
              </Table.Body>
            </Table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderTeamCards;
