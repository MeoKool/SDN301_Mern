import NavBarAdmin from "../navBarAdmin";
import { useEffect, useState } from "react";
import { getAllWatches } from "../../../api/ApiConfig";
import TableDashBoard from "./Table";
import { Button } from "../../ui/button";
import Loading from "../../Loading";

export default function DashBoardWatch() {
  const [data, setData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
    const fetchWatchesDetails = async () => {
      try {
        setTimeout(async () => {
          const response = await getAllWatches();
          setData(response);
          setIsDataLoaded(true);
        }, 1000);
      } catch (error) {
        console.error("Failed to fetch watch details:", error);
        setIsDataLoaded(false);
      }
    };
    fetchWatchesDetails();
    return () => clearTimeout(fetchWatchesDetails);
  }, [data]);
  if (!isDataLoaded) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-7xl mx-auto bg-white">
      <NavBarAdmin />
      <div className="flex flex-col flex-grow">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
          <div className="flex-1">
            <h1 className="font-semibold text-lg">Sản phẩm</h1>
          </div>
          <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <div className="ml-auto flex-1 sm:flex-initial">
              <Button>Tạo mới</Button>
            </div>
          </div>
        </header>
        <main className="flex flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-auto">
          <div className="border shadow-sm rounded-lg p-2">
            <TableDashBoard dataWatches={data} />
          </div>
        </main>
      </div>
    </div>
  );
}
