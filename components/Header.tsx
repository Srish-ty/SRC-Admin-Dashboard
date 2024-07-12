import { AuthContext } from "@/context/AuthContext";
import { Navdata } from "@/staticData/userData";
import { Button } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const Header = () => {
  const router = useRouter();
  const { handleSignOut } = useContext(AuthContext);
  return (
    <div>
      <div className="fixed top-0 flex justify-center w-full z-50 bg-white ">
        <div className="bg-black p-4 w-[95%] text-white rounded-3xl h-[64px] flex justify-between items-center mt-3  ">
          <div className="flex text-base ml-2md:text-lg font-semibold md:ml-10">
            <div>SRC</div>{" "}
            <div className="max-[530px]:hidden">-2024 Team Dashboard</div>
          </div>
          <div className="w-3/4 md:w-1/3 lg:w-1/3">
            <div className="grid grid-cols-4 gap-x-2">
              {Navdata.map((event, index) => (
                <Link key={index} href={`/dashboard/${event.uri}`}>
                  <Button className="flex justify-center text-base items-center bg-gray-800 text-white hover:bg-gray-700">
                    {event.route}
                  </Button>
                </Link>
              ))}
              <Button
                color="failure"
                className=""
                onClick={() => {
                  handleSignOut();
                  router.push("/");
                }}
              >
                logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
