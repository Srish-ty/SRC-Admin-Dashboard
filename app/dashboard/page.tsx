"use client";

import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { orgId } from "@/staticData/gqVars";
import { GET_EVENTS } from "@/graphql/queries/getEvents";
import { AuthContext } from "@/context/AuthContext";

export default function Home() {
    const { handleSignOut, userInfo } = useContext(AuthContext);
    const router = useRouter();
    const {
        data: eventsData,
        loading: eventsLoading,
        error: eventsError,
        refetch: refetchEvents,
    } = useQuery(GET_EVENTS, {
        variables: {
            orgId: orgId,
        },
    });

    const navigateToUserDashboard = () => {
        router.push("/dashboard/users");
    };

    const navigateToTeamsDashboard = () => {
        router.push("/dashboard/teams");
    };

    useEffect(() => {
        if (!userInfo.uid) {
            window.location.href = "/";
        }
    }, [userInfo]);

    useEffect(() => {
        if (eventsData) {
            console.log("eventsData", eventsData);
        }
        if (eventsError) {
            console.log("eventsError", eventsError);
        }
    }, [eventsData, eventsError]);

    if (eventsLoading) return <div>Loading...</div>;

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center">
                <Button color="gray" className="mb-4" onClick={handleSignOut}>
                    Logout{" "}
                </Button>
                <div className="mb-4 text-3xl text-center">
                    Click on the buttons to visit the respective dashboard.
                </div>
                <Button
                    color="gray"
                    className="w-2/5 mb-3"
                    onClick={navigateToUserDashboard}
                >
                    Go to Users Dashboard
                </Button>
                <Button
                    color="gray"
                    className="w-2/5 mb-3"
                    onClick={navigateToTeamsDashboard}
                >
                    Go to Teams Dashboard
                </Button>
            </div>
        </div>
    );
}
