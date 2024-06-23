import { Button } from "../ui/button";
import "../Card/styleCard.css";
export default function CardProduct() {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-sm mx-auto">
      <div className="relative">
        <img
          src="https://donghoduyanh.com/upload_images/images/2023/09/12/Top-100-anh-dong-ho-dep-1.jpg"
          alt="Product Image"
          width={500}
          height={400}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-medium">
          New
        </div>
      </div>
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold">Acme Wireless Headphones</h3>
        <p className="text-gray-500 text-sm">
          Experience the ultimate in audio quality with our Acme Wireless
          Headphones. Crafted with premium materials and designed for comfort,
          these headphones deliver an immersive listening experience.
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">$99.99</span>
          <Button size="sm">Detail</Button>
        </div>
      </div>
    </div>
  );
}
