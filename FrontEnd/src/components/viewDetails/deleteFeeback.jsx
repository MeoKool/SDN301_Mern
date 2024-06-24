import { deleteFeedback } from "../../api/ApiConfig";
import { toast } from "../ui/use-toast";

export default async function DeleteComment({ idWatch, idComment }) {
  try {
    const response = await deleteFeedback(idWatch, idComment);
    if (response.status === 200) {
      toast({
        title: "Xóa đánh giá thành công",
      });
    }
  } catch (error) {
    console.log(error);
    if (error === 401) {
      toast({
        title: "Bạn không có quyền xóa đánh giá",
      });
    } else console.log(error);
    toast({
      title: "Lỗi khi xóa đánh giá",
    });
  }
}
