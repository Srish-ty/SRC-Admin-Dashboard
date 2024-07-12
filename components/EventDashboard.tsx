import { eventsList } from "@/staticData/teamData";
import { Button, Sidebar } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type MainTeamComponentProps = {
  eventName: string;
};

const Dashboard = ({ eventName }: MainTeamComponentProps) => {
  const router = useRouter();

  const encodedString = eventName.toString();
  const CN = decodeURIComponent(encodedString);

  return (
    <div className="lg:fixed max-lg:flex justify-center w-full md:w-auto">
      <Sidebar
        aria-label="Default sidebar example"
        className="h-auto lg:h-screen w-screen  lg:w-auto"
      >
        <div className="flex flex-col items-center gap-y-2 w-screen lg:w-full ">
          {eventsList.map((event, index) => (
            <Link
              key={index}
              href={`/dashboard/events/${event}`}
              className="w-full"
            >
              <Button
                className={`w-[80%] flex justify-center items-center bg-gray-800 h-auto p-2 text-white hover:bg-gray-700 ${
                  event === CN && "bg-blue-700"
                }`}
              >
                {event}
              </Button>
            </Link>
          ))}
        </div>
      </Sidebar>
    </div>
  );
};

export default Dashboard;
