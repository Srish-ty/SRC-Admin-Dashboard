"use client";
import GET_ALL_USERS from "@/graphql/queries/getIndividualusers";
import { orgId } from "@/staticData/gqVars";
import { Navdata, tableHeadings } from "@/staticData/userData";
import { useQuery } from "@apollo/client";
import { Button, Table } from "flowbite-react";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Header from "./Header";

interface User {
  name: string;
  email: string;
  id: string;
  college: string;
  mobile: string;
  srcID: string;
  tSize: string;
  idCardPhoto: string;
}

const UsersMainComponent = () => {
  const [user, setUser] = useState<User[]>([]);

  const {
    data: allTeamsData,
    error: Error,
    loading: Loading,
  } = useQuery(GET_ALL_USERS, {
    variables: {
      orgId: orgId,
    },
  });

  useEffect(() => {
    if (allTeamsData) {
      console.log(allTeamsData);
      setUser(allTeamsData?.getAllUsers);
      toast.success("Teams fetched successfully");
    }
    if (Error) {
      console.log("eventsError", Error);
      toast.error("Failed to fetch events");
    }
  }, [allTeamsData, Error]);

  if (Loading) return <div>Loading...</div>;

  const cellStyle = {
    borderRight: "0px solid #e6e6e6",
    borderBottom: "0.1px solid #ababab",
    padding: "8px",
  };

  return (
    <div className="mt-1 px-2 mb-3.5 rounded-xl">
      <Header />
      <div className="overflow-x-auto px-2 mt-20 md:mt-[6%]">
        <Table hoverable>
          <Table.Head>
            {tableHeadings.map((heading) => (
              <Table.HeadCell
                key={heading}
                className="text-lg text-teal-500 bg-slate-100"
                style={cellStyle}
              >
                {heading}
              </Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            {user.map((user, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-200 hover:text-gray-700"
              >
                <Table.Cell
                  className="font-medium text-gray-900 dark:text-white"
                  style={cellStyle}
                >
                  {user.name}
                </Table.Cell>
                <Table.Cell style={cellStyle}>{user.id}</Table.Cell>
                <Table.Cell style={cellStyle}>{user.mobile}</Table.Cell>
                <Table.Cell style={cellStyle}>{user.email}</Table.Cell>
                <Table.Cell style={cellStyle}>{user.college}</Table.Cell>
                <Table.Cell style={cellStyle}>
                  <a
                    href={user.idCardPhoto}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                  >
                    View ID Card
                  </a>
                </Table.Cell>
                <Table.Cell style={cellStyle}>{user.id}</Table.Cell>
                <Table.Cell style={cellStyle}>{user.srcID}</Table.Cell>
                <Table.Cell style={cellStyle}>{user.tSize}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default UsersMainComponent;
