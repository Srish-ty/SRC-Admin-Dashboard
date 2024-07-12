import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import toast from "react-hot-toast";
import GET_ALL_TEAMS from "@/graphql/queries/getTeamUsers";
import { orgId } from "@/staticData/gqVars";

const Heading = ["S.No.", "Member Name", "AIChE ID", "ID Card"];

type MainTeamComponentProps = {
  eventName: string;
};

type User = {
  idCardPhoto: string | null;
  srcID: string | null;
  name: string;
};

type TeamRegistration = {
  eventID: string;
  teamName: string;
  submittedPDF: string;
  users: User[];
};

type Event = {
  eventID: string;
  name: string;
  teamRegistration: TeamRegistration[];
};

const RenderTeamCards = ({ eventName }: MainTeamComponentProps) => {
  const [teams, setTeams] = useState<TeamRegistration[]>([]);
  const { data: allTeamsData, error: Error, loading: Loading } = useQuery(GET_ALL_TEAMS, {
    variables: { orgId: orgId }
  });

  useEffect(() => {
    if (allTeamsData) {
      const events: Event[] = allTeamsData?.getEvents || [];
      const encodedString = eventName.toString();
      const CN = decodeURIComponent(encodedString);
      const filteredEvent = events.find(event => event.name === CN);
      
      if (filteredEvent) {
        const filteredTeams = filteredEvent.teamRegistration;
        setTeams(filteredTeams);
        toast.success("Teams fetched successfully");
      }
    }
    if (Error) {
      toast.error("Failed to fetch events");
    }
  }, [allTeamsData, Error, eventName]);

  if(Loading) return <div>Loading...</div>

  return (
    <div className="overflow-x-auto">
      {teams.length > 0 ? (
        teams.map((team, index) => (
          <div key={index} className=" border-2 w-full p-5 bg-black mb-6 shadow-md rounded-lg">
            <div className="flex justify-between text-xl font-bold text-center text-white mb-6">
             <div className="flex"><div className="font-normal">TEAM-</div> {team.teamName}</div>
             <a href={team.submittedPDF}  className="hover:underline hover:cursor-pointer text-white">submittedpdf</a>
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
                  {team.users.map((user, i) => (
                    <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {i + 1}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </Table.Cell>
                      <Table.Cell className="text-gray-700">
                        {user.srcID || "N/A"}
                      </Table.Cell>
                      <Table.Cell>
                        {user.idCardPhoto ? (
                          <a href={user.idCardPhoto} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                            🪪ID CARD
                          </a>
                        ) : "No ID Card"}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        ))
      ) : (
        <div>No teams registered for this event.</div>
      )}
    </div>
  );
};

export default RenderTeamCards;
