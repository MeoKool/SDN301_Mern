import { DeleteWatch } from "../../../api/ApiConfig";
import { toast } from "../../ui/use-toast";

export default async function DeleteWatches({ id }) {
  try {
    const response = await DeleteWatch(id);
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
        title: "Lỗi khi xóa",
      });
  }
}
