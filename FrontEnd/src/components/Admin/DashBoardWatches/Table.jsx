import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../ui/table";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import DeleteWatches from "./DeleteWatches";
import { Dialog, DialogContent } from "../../ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useEffect, useState } from "react";
import { toast } from "../../ui/use-toast";
import axios from "axios";
import { getWatchesById } from "../../../api/ApiConfig";
export default function TableDashBoard({ dataWatches, dataBrand }) {
  let data = dataWatches;
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [automatic, setAutomatic] = useState(false);
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [dataCurrent, setDataCurrent] = useState({});
  const [idChoose, setIdChoose] = useState();
  const accessToken = sessionStorage.getItem("accessToken");
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (idChoose) {
      const fetchWatchesDetails = async () => {
        try {
          const response = await getWatchesById(idChoose);
          setDataCurrent(response.data);
          setName(dataCurrent.watchName);
          setPrice(dataCurrent.price);
          setAutomatic(dataCurrent.Automatic);
          setBrand(dataCurrent.brand._id);
          setDescription(dataCurrent.watchDescription);
          setImage(dataCurrent.image);
        } catch (error) {
          console.error("Failed to fetch watch details:", error);
        }
      };
      fetchWatchesDetails();
    }
  }, [idChoose]);
  console.log(automatic);
  const handleOpenForm = (id) => {
    setIdChoose(id);
    setShowForm(true);
  };
  const handleUpdateClick = async () => {
    const formData = new FormData();
    formData.append("watchName", name);
    formData.append("price", price);
    formData.append("Automatic", automatic);
    formData.append("brand", brand);
    formData.append("image", image);
    formData.append("watchDescription", description);
    try {
      const response = await axios.put(
        `http://localhost:5000/v1/watch/updateWatch/${idChoose}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        toast({
          title: "Cập nhật thành công",
        });
        setShowForm(false);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        toast({
          title: "Bạn không có quyền để cập nhật",
        });
      } else
        toast({
          title: "Lỗi khi cập nhật",
          description: error.response.data.message,
        });
    }
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên sản phẩm</TableHead>
            <TableHead>Hình ảnh</TableHead>
            <TableHead>Thương hiệu</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(data) ? (
            data.map((product, index) => (
              <TableRow key={index}>
                <TableCell className="font-bold">{product.watchName}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <img
                    src={`http://localhost:5000/${product.image}`}
                    alt="Product Image"
                    width={80}
                    style={{ borderRadius: "10px", maxHeight: "80px" }}
                  />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {product.brand.brandName}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {product.price.toLocaleString("en-US")}VNĐ
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <DotsVerticalIcon className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleOpenForm(product._id)}
                      >
                        <FilePenIcon className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => DeleteWatches({ id: product._id })}
                      >
                        <Trash2Icon className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="5">No members found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-md w-full">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Chỉnh Sửa Sản Phẩm</CardTitle>
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
              <div className="gap-2 flex items-center">
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
              <Button className="w-full" onClick={handleUpdateClick}>
                Cập Nhật
              </Button>
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Trash2Icon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}
function FilePenIcon(props) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}
