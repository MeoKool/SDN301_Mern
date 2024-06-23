import { Button } from "../ui/button";
import "../Card/styleCard.css";
import { useNavigate } from "react-router-dom";
export default function CardProduct(data) {
  console.log(data.data);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/details/${data.data._id}`);
  };
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-sm">
      <div className="relative">
        <img
          src="https://donghoduyanh.com/upload_images/images/2023/09/12/Top-100-anh-dong-ho-dep-1.jpg"
          alt="Product Image"
          width={500}
          height={400}
          className="w-full h-64 object-cover"
        />
        {data.data.Automatic && (
          <div className="absolute top-4 right-4 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-medium">
            Automatic
          </div>
        )}
      </div>
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold">{data.data.watchName}</h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">
            {data.data.price.toLocaleString("en-US")}VNĐ
          </span>
          <Button onClick={handleNavigate} size="sm">
            Detail
          </Button>
        </div>
      </div>
    </div>
  );
}
