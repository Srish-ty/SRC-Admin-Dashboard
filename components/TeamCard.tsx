import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Table, Button } from "flowbite-react";
import { FaLightbulb } from "react-icons/fa6";
import { MdOutlineModeNight } from "react-icons/md";

import toast from "react-hot-toast";
import GET_ALL_TEAMS from "@/graphql/queries/getTeamUsers";
import { orgId } from "@/staticData/gqVars"; // Import the modal component
import IdCardModal from "./IdCardModal";
import LoaderComp from "./loader";

const HEADINGS = [
  "S.No.",
  "Member Name",
  "SRC ID",
  "College Name",
  "Mobile No.",
];

type MainTeamComponentProps = {
  eventName: string;
  isDarkMode: boolean;
  setDark: (isDark: boolean) => void;
};

type User = {
  idCardPhoto: string | null;
  srcID: string | null;
  name: string;
  college: string | null;
  mobile: string;
};

type TeamRegistration = {
  eventID: string;
  teamName: string;
  submittedPDF: string;
  users: User[];
};

type EventRegistration = {
  eventID: string;
  user: User;
  submittedPDF: string;
};

type Event = {
  eventID: string;
  name: string;
  isTeamEvent: boolean;
  teamRegistration: TeamRegistration[];
  eventRegistration: EventRegistration[];
};

const RenderTeamCards = ({
  eventName,
  isDarkMode,
  setDark,
}: MainTeamComponentProps) => {
  const [teams, setTeams] = useState<TeamRegistration[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const {
    data: allTeamsData,
    error,
    loading,
  } = useQuery(GET_ALL_TEAMS, {
    variables: { orgId },
  });

  const toggleTheme = () => {
    setDark(!isDarkMode);
    document.body.style.backgroundColor = isDarkMode ? "#fff" : "#1e2024";
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  const handleOpenModal = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedImageUrl(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (allTeamsData) {
      const events: Event[] = allTeamsData?.getEvents || [];
      const decodedEventName = decodeURIComponent(eventName);
      const matchedEvent = events.find(
        (event) => event.name.toLowerCase() === decodedEventName.toLowerCase()
      );

      if (matchedEvent) {
        if (matchedEvent.isTeamEvent) {
          setTeams(matchedEvent.teamRegistration);
        } else {
          setUsers(
            matchedEvent.eventRegistration.map(
              (registration) => registration.user
            )
          );
        }
        toast.success("Event fetched successfully");
      }
    }

    if (error) {
      toast.error("Failed to fetch teamEvents");
    }
  }, [allTeamsData, error, eventName]);

  if (loading) return <LoaderComp />;

  return (
    <div className="overflow-x-auto max-md:w-[100%]">
      <div className="flex justify-end mb-4">
        <Button onClick={() => toggleTheme()} className="rounded-3xl">
          {isDarkMode ? (
            <FaLightbulb size={15} />
          ) : (
            <MdOutlineModeNight size={20} />
          )}
        </Button>
      </div>
      {teams.length > 0 ? (
        teams.map((team, index) => (
          <TeamCard
            key={index}
            team={team}
            isDark={isDarkMode}
            onImageClick={handleOpenModal}
          />
        ))
      ) : users.length > 0 ? (
        <IndividualEventTable users={users} onImageClick={handleOpenModal} />
      ) : (
        <div>No teams registered for this event.</div>
      )}
    </div>
  );
};

type TeamCardProps = {
  team: TeamRegistration;
  onImageClick: (imageUrl: string) => void;
  isDark: boolean;
};

const TeamCard = ({ team, onImageClick, isDark }: TeamCardProps) => (
  <div className="border-2 w-full p-5 bg-black mb-6 shadow-md rounded-lg">
    <div className="flex justify-between items-center text-base sm:text-lg lg:text-xl text-center text-white mb-6 px-0 md:px-14">
      <div className="flex">
        <div className="font-normal">Team Name: </div>
        <h2 className="text-teal-300 font-bold px-2"> {team.teamName} </h2>
      </div>
      <span className="text-base">
        Link to Submitted PDF:{" "}
        <a
          href={team.submittedPDF}
          className="hover:underline text-sm hover:cursor-pointer hover:text-white underline text-blue-500"
        >
          {team.submittedPDF
            ? team.submittedPDF.substring(0, 28) + "..."
            : "No PDF Submitted"}
        </a>
      </span>
    </div>
    <div className="shadow-lg border-2 border-gray-300 rounded-lg overflow-hidden">
      <TeamTable
        users={team.users}
        isDark={isDark}
        onImageClick={onImageClick}
      />
    </div>
  </div>
);

type TeamTableProps = {
  users: User[];
  onImageClick: (imageUrl: string) => void;
  isDark: boolean;
};

const TeamTable = ({ users, isDark }: TeamTableProps) => (
  <div className={`overflow-x-auto ${isDark ? "dark" : ""}`}>
    <Table hoverable>
      <Table.Head className="bg-gray-100 text-xs sm:text-base lg:text-lg">
        {HEADINGS.map((item, index) => (
          <Table.HeadCell
            key={index}
            className="text-gray-700  dark:text-white font-semibold"
          >
            {item}
          </Table.HeadCell>
        ))}
      </Table.Head>
      <Table.Body className="divide-y bg-white">
        {users.map((user, index) => (
          <Table.Row
            key={index}
            className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 text-xs sm:text-sm lg:text-base"
          >
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {index + 1}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {user.name}
            </Table.Cell>
            <Table.Cell className="text-gray-700 dark:text-gray-200">
              {user.srcID || "-"}
            </Table.Cell>
            <Table.Cell>{user.college}</Table.Cell>
            <Table.Cell>{user.mobile}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
);
type IndividualEventTableProps = {
  users: User[];
  onImageClick: (imageUrl: string) => void;
};

const IndividualEventTable = ({
  users,
  onImageClick,
}: IndividualEventTableProps) => (
  <div className="shadow-lg border-2  border-gray-300 rounded-lg overflow-x-auto md:overflow-hidden">
    <Table hoverable>
      <Table.Head className="bg-gray-100">
        {HEADINGS.map((item, index) => (
          <Table.HeadCell key={index} className="text-gray-700 font-semibold">
            {item}
          </Table.HeadCell>
        ))}
      </Table.Head>
      <Table.Body className="divide-y bg-white">
        {users.map((user, index) => (
          <Table.Row
            key={index}
            className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50"
          >
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {index + 1}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {user.name}
            </Table.Cell>
            <Table.Cell className="text-gray-700">
              {user.srcID || "-"}
            </Table.Cell>
            <Table.Cell>{user.college}</Table.Cell>
            <Table.Cell>{user.mobile}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
);

export default RenderTeamCards;
