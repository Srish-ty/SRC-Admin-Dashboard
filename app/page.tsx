"use client";

import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const navigateToUserDashboard = () => {
    router.push('/dashboard/users');
  };
  const navigateToTeamsDashboard = () => {
    router.push('/dashboard/teams');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center">
        <div className="mb-4 text-3xl text-center">
          Click on the buttons to visit the respective dashboard.
        </div>
        <Button color="gray" className="w-2/5 mb-3" onClick={navigateToUserDashboard}>
          Go to Users Dashboard
        </Button>
        <Button color="gray" className="w-2/5" onClick={navigateToTeamsDashboard}>
          Go to Teams Dashboard
        </Button>
      </div>
    </div>
  );
}