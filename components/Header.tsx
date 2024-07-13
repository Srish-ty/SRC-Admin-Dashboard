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
    <div id="navHeader" className="text-[10px] sm:text-sm lg:text-base">
      <div className="fixed top-0 flex justify-start w-full z-50 bg-white ">
        <div className="bg-black p-3 md:p-4 w-full text-white rounded-3xl h-auto md:h-[82px] flex flex-col md:flex-row justify-between items-center md:mt-0 ">
          <div className="font-semibold lg:ml-10 pb-2 md:p-0 text-sm sm:text-md lg:text-lg">
            SRC-2024 Team Dashboard
          </div>

          <div className="w-full sm:w-[70%] md:w-[50%]">
            <div className="grid grid-cols-4 gap-x-2">
              {Navdata.map((event, index) => (
                <Link key={index} href={`/dashboard/${event.uri}`}>
                  <Button className="flex justify-center text-base items-center p-0 md:py-1 md:px-3 bg-gray-800 text-white hover:bg-gray-700">
                    <span className="text-[10px] sm:text-sm lg:text-base">
                      {event.route}
                    </span>
                  </Button>
                </Link>
              ))}
              <Button
                color="failure"
                className="p-0 md:py-1"
                onClick={() => {
                  handleSignOut();
                  router.push("/");
                }}
              >
                <span className="text-[10px] sm:text-sm lg:text-base">
                  logout
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
