import { eventsList } from "@/staticData/teamData";
import { Button, Sidebar } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type MainTeamComponentProps = {
  eventName: string;
  isDark: boolean;
};

const Dashboard = ({ eventName, isDark }: MainTeamComponentProps) => {
  const router = useRouter();

  const encodedString = eventName.toString();
  const CN = decodeURIComponent(encodedString);

  return (
    <div
      className={`lg:fixed max-lg:flex max-lg:justify-center ${
        isDark ? "dark" : ""
      }`}
    >
      <Sidebar
        aria-label="Default sidebar example"
        className="h-auto lg:h-screen w-screen lg:w-auto"
      >
        <div className="flex flex-col items-center lg:mt-10 justify-center gap-y-2">
          {eventsList.map((event, index) => (
            <Link
              key={index}
              href={`/dashboard/events/${event}`}
              className="w-[350px] lg:w-full "
            >
              <Button
                className={`w-[80%] flex justify-center mx-auto items-center bg-gray-800 h-auto p-0 md:p-2 text-white hover:bg-gray-700 ${
                  event === CN && "bg-blue-700 dark:bg-teal-900"
                }`}
              >
                <span className="text-[11px] sm:text-sm lg:text-base">
                  {event}
                </span>
              </Button>
            </Link>
          ))}
        </div>
      </Sidebar>
    </div>
  );
};

export default Dashboard;
