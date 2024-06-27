import NavBarAdmin from "../navBarAdmin";
import { useEffect, useState } from "react";
import { GetAllBrand, getAllWatches } from "../../../api/ApiConfig";
import TableDashBoard from "./Table";
import { Button } from "../../ui/button";
import Loading from "../../Loading";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Dialog, DialogContent } from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";

import axios from "axios";
import { toast } from "../../ui/use-toast";
export default function DashBoardWatch() {
  const [dataWatch, setDataWatches] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [dataBrand, setDataBrand] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [automatic, setAutomatic] = useState(false);
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const accessToken = sessionStorage.getItem("accessToken");
  useEffect(() => {
    const fetchWatchesDetails = async () => {
      try {
        setTimeout(async () => {
          const response = await GetAllBrand();
          setDataBrand(response.data);
          setIsDataLoaded(true);
        }, 1000);
      } catch (error) {
        console.error("Failed to fetch watch details:", error);
        setIsDataLoaded(false);
      }
    };
    fetchWatchesDetails();
  }, []);
  useEffect(() => {
    const fetchWatchesDetails = async () => {
      try {
        setTimeout(async () => {
          const response = await getAllWatches();
          setDataWatches(response.data);
          setIsDataLoaded(true);
        }, 1000);
      } catch (error) {
        console.error("Failed to fetch watch details:", error);
        setIsDataLoaded(false);
      }
    };
    fetchWatchesDetails();
    return () => clearTimeout(fetchWatchesDetails);
  }, [dataWatch]);
  const handleCreateClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("watchName", name);
    formData.append("price", price);
    formData.append("Automatic", automatic);
    formData.append("watchDescription", description);
    formData.append("brand", brand);
    formData.append("image", image);
    try {
      const response = await axios.post(
        `http://localhost:5000/v1/watch/createWatch`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: "Bearer " + accessToken,
          },
        }
      );
      if (response.status === 200) {
        toast({
          title: "Tạo sản phẩm thành công",
        });
        setShowForm(false);
      } else {
        toast({ title: "Tạo sản phẩm thất bại" });
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.errors) {
        // If error.response.data.errors is an array of error messages
        error.response.data.errors.forEach((message) => {
          toast({
            variant: "destructive",
            title: "Error",
            description: message,
          });
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Image is required.",
        });
      }
    }
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
            <h1 className="font-semibold text-lg">Sản phẩm</h1>
          </div>
          <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <div className="ml-auto flex-1 sm:flex-initial">
              <Button onClick={() => setShowForm(true)}>Tạo mới</Button>
            </div>
          </div>
        </header>
        <main className="flex flex-col gap-4 p-4 md:gap-8 md:p-6 overflow-auto">
          <div className="border shadow-sm rounded-lg p-2">
            <TableDashBoard dataWatches={dataWatch} dataBrand={dataBrand} />
          </div>
        </main>
      </div>
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-md w-full">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Tạo Sản Phẩm</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="brand-name">Tên sản phẩm</Label>
                <Input
                  id="product-name"
                  placeholder="Nhập tên sản phẩm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="brand-price">Giá</Label>
                <Input
                  id="product-price"
                  type="number"
                  placeholder="Giá tiền"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="gap-2 flex items-center">
                <Label htmlFor="automatic">Automatic</Label>
                <input
                  type="checkbox"
                  id="automatic"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  checked={automatic}
                  onChange={(e) => setAutomatic(e.target.checked)}
                />
              </div>
              <div className="  gap-2 flex items-center ">
                <select
                  onChange={(e) => setBrand(e.target.value)}
                  value={brand._id}
                >
                  <option value="" disabled selected>
                    Chọn thương hiệu
                  </option>
                  {dataBrand.map((brand) => (
                    <option key={brand._id} value={brand._id}>
                      {brand.brandName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="brand-name">Hình ảnh</Label>
                <Input
                  id="product-image"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="brand-name">Mô tả</Label>
                <Input
                  id="product-description"
                  placeholder="Nhập mô tả"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
