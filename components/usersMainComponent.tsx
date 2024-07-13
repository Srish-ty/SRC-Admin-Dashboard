"use client";
import GET_ALL_USERS from "@/graphql/queries/getIndividualusers";
import { orgId } from "@/staticData/gqVars";
import { Navdata, tableHeadings } from "@/staticData/userData";
import { useQuery } from "@apollo/client";
import { Button, Table, TextInput } from "flowbite-react";
import { FaLightbulb } from "react-icons/fa6";
import { MdOutlineModeNight } from "react-icons/md";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Header from "./Header";
import LoaderComp from "./loader";

interface User {
  name: string;
  email: string;
  id: string;
  college: string;
  mobile: string;
  srcID: string;
  tSize: string;
  idCardPhoto: string;
  aicheRegID: string;
}

const UsersMainComponent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQueries, setSearchQueries] = useState({
    name: "",
    email: "",
    mobile: "",
    college: "",
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    document.body.style.backgroundColor = isDarkMode ? "#fff" : "#1e2024";
    setIsDarkMode(!isDarkMode);
  };

  const {
    data: allUsersData,
    error: Error,
    loading: Loading,
  } = useQuery(GET_ALL_USERS, {
    variables: {
      orgId: orgId,
    },
  });

  useEffect(() => {
    if (allUsersData) {
      // console.log(allUsersData);
      setUsers(allUsersData?.getAllUsers);
      toast.success("Users fetched successfully");
    }
    if (Error) {
      console.log("usersError", Error);
      toast.error("Failed to fetch users");
    }
  }, [allUsersData, Error]);

  if (Loading) return <LoaderComp />;

  const actualUsers = users.filter((user) => {
    if (!user.srcID) {
      return true;
    } else {
      const userCode = user.srcID.slice(0, 4);
      return !(
        userCode.toLowerCase() === "test" || userCode.toLowerCase() === "nitr"
      );
    }
  });

  // console.log("Actual users", actualUsers);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setSearchQueries({ ...searchQueries, [field]: e.target.value });
  };

  const filteredUsers = actualUsers.filter((user) =>
    Object.keys(searchQueries).every((key) => {
      const userValue = (user as any)[key] || "";
      return userValue
        .toLowerCase()
        .includes((searchQueries as any)[key].toLowerCase());
    })
  );

  const cellStyle = {
    borderRight: "0.2px solid #f5f5f5",
    borderBottom: "0.1px solid #ababab",
    padding: "6px",
  };

  const inputStyle = {
    padding: "6px 8px",
    borderRadius: "4px",
    border: "1px solid #6ec2b7",
    fontSize: "12px",
  };

  return (
    <div className="mt-1 px-2 mb-3.5 rounded-xl">
      <Header />

      <div
        className={`overflow-x-auto px-2 mt-20 md:mt-[5.5vw] ${
          isDarkMode ? "dark" : ""
        }`}
      >
        <div className="flex justify-end mb-4 ">
          <Button onClick={() => toggleDarkMode()}>
            {isDarkMode ? (
              <FaLightbulb size={15} />
            ) : (
              <MdOutlineModeNight size={20} />
            )}
          </Button>
        </div>
        <Table hoverable>
          <Table.Head>
            {tableHeadings.map((heading) => (
              <Table.HeadCell
                key={heading}
                className="text-xs sm:text-base lg:text-lg text-teal-500 bg-slate-200 dark:bg-gray-600"
                style={cellStyle}
              >
                {heading}
              </Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Head>
            {[
              "name",
              "id",
              "mobile",
              "email",
              "college",
              "idCardPhoto",
              "aicheRegID",
              "srcID",
              "tSize",
            ].map((field) => (
              <Table.HeadCell key={field} className="p-0">
                {(field === "name" ||
                  field === "email" ||
                  field === "mobile" ||
                  field === "college" ||
                  field === "srcID") && (
                  <TextInput
                    type="text"
                    placeholder={`Search ${field.toUpperCase()}`}
                    value={(searchQueries as any)[field]}
                    onChange={(e) => handleSearchChange(e, field)}
                    className="w-full text-xs md:text-sm bg-[#9e9e9e]"
                    style={inputStyle}
                  />
                )}
              </Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            {filteredUsers.map((user, index) => (
              <Table.Row
                key={index}
                className="bg-white dark dark:border-gray-700 dark:bg-gray-700 hover:bg-gray-200 hover:text-gray-700 text-[10px] sm:text-xs lg:text-sm"
              >
                <Table.Cell
                  className="text-gray-950 font-medium "
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
                    className="text-blue-600 dark:text-teal-600 hover:underline"
                    target="_blank"
                  >
                    View ID Card
                  </a>
                </Table.Cell>
                <Table.Cell style={cellStyle}>
                  {user.aicheRegID ? user.aicheRegID : "-"}
                </Table.Cell>
                <Table.Cell style={cellStyle}>
                  {user.srcID ? user.srcID : "-"}
                </Table.Cell>
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
