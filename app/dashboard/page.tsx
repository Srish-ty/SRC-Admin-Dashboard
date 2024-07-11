"use client";

import { Button } from "flowbite-react";
import Link from "next/link";
import { useContext, useEffect } from "react";

import { AuthContext } from "@/context/AuthContext";

export default function Home() {
    const { handleSignOut, userInfo } = useContext(AuthContext);

    useEffect(() => {
        const authToken = localStorage.getItem("auth-token");
        if (!authToken) {
            window.location.href = "/";
        }
    }, [userInfo]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center">
                <Button color="gray" className="mb-4" onClick={handleSignOut}>
                    Logout{" "}
                </Button>
                <div className="mb-4 text-3xl text-center">
                    Click on the buttons to visit the respective dashboard.
                </div>
                <Link href="/dashboard/users">
                    <Button color="gray" className="mb-3">
                        Go to Users Dashboard
                    </Button>
                </Link>
                <Link href="/dashboard/teams">
                    <Button color="gray" className="mb-3">
                        Go to Teams Dashboard
                    </Button>
                </Link>
                <Link href="/dashboard/sampleQuery">
                    <Button color="gray" className="mb-3">
                        Go to Sample Query Page
                    </Button>
                </Link>
            </div>
        </div>
    );
}
