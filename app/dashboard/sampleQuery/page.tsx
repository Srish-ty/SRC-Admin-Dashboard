"use client";
import { useQuery } from "@apollo/client";
import { orgId } from "@/staticData/gqVars";
import { GET_EVENTS } from "@/graphql/queries/getEvents";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Page() {
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
  useEffect(() => {
    if (eventsData) {
      toast.success("Events fetched successfully");
      // console.log("eventsData", eventsData);
    }
    if (eventsError) {
      // console.log("eventsError", eventsError);
      toast.error("Failed to fetch events");
    }
  }, [eventsData, eventsError]);

  if (eventsLoading) return <div>Loading...</div>;
  return (
    <div>
      {eventsData && (
        <ul>
          {eventsData.getEvents.map((event: any) => (
            <li key={event.id}>
              <h2>{event.name}</h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
