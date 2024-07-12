import { AuthContext } from "@/context/AuthContext"
import { Navdata } from "@/staticData/userData"
import { Button } from "flowbite-react"
import { useRouter } from "next/navigation"
import { useContext } from "react"

const Header=()=>{
    const router = useRouter()
    const {handleSignOut}=useContext(AuthContext)
    return(
    <div>
        <div className="fixed top-0 flex justify-center w-full z-50 bg-white ">
          <div className="bg-black p-4 w-[95%] text-white rounded-3xl h-[64px] flex justify-between items-center mt-3  ">
            <div className="text-lg font-semibold ml-10">SRC-2024 Team Dashboard</div>
            <div className="w-1/3">
              <div className="grid grid-cols-4 gap-x-2">
                {Navdata.map((event, index) => (
                  <Button
                    className="flex justify-center text-base items-center bg-gray-800 text-white hover:bg-gray-700"
                    key={index}
                    onClick={() => router.push(`/dashboard/${event.uri}`)}
                  >
                    {event.route}
                  </Button>
                ))}<Button color="failure" className="" onClick={handleSignOut&&(()=>router.push("/"))}>logout</Button>
              </div>
            </div>
          </div>
        </div>
    </div>
    )
}
export default Header