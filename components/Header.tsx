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
        <div className="bg-black p-4 w-full text-white rounded-3xl h-auto md:h-[74px] flex flex-col md:flex-row justify-between items-center md:mt-3 ">
          <div className="text-lg font-semibold ml-10">
            SRC-2024 Team Dashboard
          </div>

          <div className="w-[100%] sm:w-[70%] md:w-[50%]">
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
