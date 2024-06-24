import { editFeeback } from "../../api/ApiConfig";
import { toast } from "../ui/use-toast";

export default async function handleEditFeedback({
  idWatch,
  idComment,
  rating,
  content,
  idMember,
}) {
  try {
    const response = await editFeeback(
      idWatch,
      idComment,
      rating,
      content,
      idMember
    );
    if (response.status === 200) {
      toast({
        title: "Chỉnh sửa đánh giá thành công",
      });
    }
  } catch (error) {
    console.log(error);
    if (error === 401) {
      toast({
        title: "Bạn không có quyền chỉnh sửa đánh giá",
      });
    } else console.log(error);
    toast({
      title: "Lỗi khi chỉnh sửa đánh giá",
    });
  }
}
