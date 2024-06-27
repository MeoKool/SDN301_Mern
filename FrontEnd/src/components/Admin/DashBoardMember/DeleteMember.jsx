import { deleteMember } from "../../../api/ApiConfig";
import { toast } from "../../ui/use-toast";

export default async function DeleteWatches({ memberName }) {
  try {
    const response = await deleteMember(memberName);
    if (response.status === 200) {
      toast({
        title: "Xóa thành công",
      });
    }
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      toast({
        title: "Bạn không có quyền để xóa",
      });
    } else
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: error.response.data.message,
      });
  }
}
