import { Input } from "../../ui/input";
import TableDashBoard from "./Table";
import NavBarAdmin from "../navBarAdmin";
import { useEffect, useState } from "react";
import { GetAllMember } from "../../../api/ApiConfig";

export default function DashBoardMember() {
  const [members, setMembers] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
    const fetchWatchesDetails = async () => {
      try {
        const response = await GetAllMember();
        setMembers(response);
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Failed to fetch watch details:", error);
        setIsDataLoaded(false);
      }
    };
    fetchWatchesDetails();
  }, []);
  if (!isDataLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full max-w-7xl mx-auto bg-white">
      <NavBarAdmin />
      <div className="flex flex-col flex-grow">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
          <div className="flex-1">
            <h1 className="font-semibold text-lg">Thành viên</h1>
          </div>
          <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search members..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
          </div>
        </header>
        <main className="flex flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-auto">
          <div className="border shadow-sm rounded-lg p-2">
            <TableDashBoard dataMembers={members} />
          </div>
        </main>
      </div>
    </div>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
