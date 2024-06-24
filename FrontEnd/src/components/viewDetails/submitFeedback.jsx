import { createFeedback } from "../../api/ApiConfig";
import { toast } from "../ui/use-toast";

export default async function submitFeedback({
  userId,
  watchId,
  rating,
  content,
}) {
  try {
    const response = await createFeedback(userId, watchId, rating, content);
    if (response.status === 200) {
      toast({
        title: "Cảm ơn bạn đã đánh giá",
      });
    }
  } catch (error) {
    if (error.response.status === 401) {
      toast({
        title: "Bạn không có quyền để đánh giá",
      });
    } else
      toast({
        title: "Lỗi khi đánh giá",
      });
  }
}
