import NavBarAdmin from "../navBarAdmin";
import { useEffect, useState } from "react";
import { GetAllBrand } from "../../../api/ApiConfig";
import TableDashBoard from "./Table";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Dialog, DialogContent } from "../../ui/dialog";
import SubmitCreateBrand from "./CreateBrand";
import Loading from "../../Loading";

export default function DashBoardBrand() {
  const [data, setData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [brandName, setBrandName] = useState("");
  useEffect(() => {
    const fetchWatchesDetails = async () => {
      try {
        setTimeout(async () => {
          const response = await GetAllBrand();
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
  }, []);

  const handleCreateClick = () => {
    SubmitCreateBrand({ brandName: brandName });
    setShowForm(false);
  };
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
            <h1 className="font-semibold text-lg">Thương Hiệu</h1>
          </div>
          <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <div className="ml-auto flex-1 sm:flex-initial">
              <Button onClick={() => setShowForm(true)}>Tạo mới</Button>
            </div>
          </div>
        </header>
        <main className="flex flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-auto">
          <div className="border shadow-sm rounded-lg p-2">
            <TableDashBoard dataBrands={data} />
          </div>
        </main>
      </div>
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-md w-full">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Tạo Thương Hiệu Mới</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="brand-name">Tên thương hiệu</Label>
                <Input
                  id="brand-name"
                  placeholder="Nhập tên thương hiệu"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleCreateClick}>
                Tạo
              </Button>
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}
