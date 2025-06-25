import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ProductTypes } from "@/types/main/types";
import { IMGURL } from "@/utils/constant";
import { useNavigate } from "react-router";

function ProductCard({
  id,
  description,
  name,
  price,
  product_image,
}: ProductTypes) {
  const navigate = useNavigate();
  const handleNavigate = (id: number) => {
    navigate(`/buy/${id}`);
  };
  return (
    <Card className="w-80 min-h-80">
      <CardHeader className="p-0">
        <img
          src={`${IMGURL}${product_image}`}
          alt="Product Image"
          className="w-full h-48 object-cover rounded-t-md"
        />
      </CardHeader>

      <CardContent className="space-y-2 p-4">
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <p className="text-green-600 font-semibold text-xl">₱{price}</p>
      </CardContent>

      <CardFooter className="p-4">
        <Button
          className="px-7 cursor-pointer"
          onClick={() => handleNavigate(id)}
        >
          Buy
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
