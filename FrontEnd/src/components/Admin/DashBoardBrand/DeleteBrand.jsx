import { DeleteBrand } from "../../../api/ApiConfig";
import { toast } from "../../ui/use-toast";

export default async function DeleteBrands({ brandId }) {
  console.log(brandId);
  try {
    const response = await DeleteBrand(brandId);
    if (response.status === 200) {
      toast({
        title: "Xóa thanh công",
      });
    }
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      toast({
        title: "Bạn không có quyền để xóa",
      });
    } else console.log(error);
    toast({
      variant: "destructive",
      title: "Lỗi khi xóa",
      description: error.response.data.message,
    });
  }
}
