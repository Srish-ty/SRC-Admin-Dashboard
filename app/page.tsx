"use client";

import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const navigateToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center">
        <div className="mb-3 text-3xl text-center">
          Click on the button to visit the dashboard.
        </div>
        <Button color="gray" className="w-1/3" onClick={navigateToDashboard}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}