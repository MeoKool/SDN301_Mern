import { CreateBrand } from "../../../api/ApiConfig";
import { toast } from "../../ui/use-toast";

export default async function SubmitCreateBrand({ brandName }) {
  console.log(brandName);
  try {
    const response = await CreateBrand(brandName);
    if (response.status === 200) {
      toast({
        title: "Tạo thương hiệu thành công",
      });
    }
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      toast({
        title: "Bạn không có quyền để đánh giá",
      });
    } else
      toast({
        title: "Lỗi khi tạo",
      });
  }
}
