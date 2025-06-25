import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { IMGURL, URL } from "@/utils/constant";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import type { ProductTypes } from "@/types/main/types";
import { ChevronRight, ChevronLeft, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductModal from "@/components/main/ProductModal";
import BackHomeButton from "@/shared/components/BackHomeButton";
function BuyProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductTypes | null>(null);
  const { token } = useAuth();
  const [quantity, setQuantity] = useState<number>(0);

  const handleAddQuantity = () => {
    quantity === product?.stock
      ? setQuantity(quantity)
      : setQuantity(quantity + 1);
  };
  const handleReduceQuantity = () => {
    quantity === 0 ? setQuantity(0) : setQuantity(quantity - 1);
  };
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${URL}products/${id}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + String(token),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setProduct(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!product)
    return (
      <section className="h-screen w-full flex justify-center items-center">
        <LoaderCircle size={50} color="gray" className="animate-spin" />
      </section>
    );

  return (
    <section className="px-5">
      <div className="w-full border h-52 overflow-hidden rounded-md ">
        <BackHomeButton />
        <img
          src={`${IMGURL}${product?.product_image}`}
          alt=""
          className="w-full h-fit"
        />
      </div>
      <div className="space-y-2.5 pt-5">
        <div className="flex items-center gap-2 text-xl">
          <h1>{product?.name}</h1>
          <p className="font-normal">₱{product.price}</p>
        </div>
        <p className="font-light">{product.description}</p>
        <p className="font-light">Stocks: {product.stock}</p>
        <div className="flex items-center space-x-5">
          <Button size="icon" onClick={handleReduceQuantity}>
            <ChevronLeft />
          </Button>
          <p>{quantity}</p>
          <Button size="icon" onClick={handleAddQuantity}>
            <ChevronRight />
          </Button>
          <ProductModal
            price={product.price}
            product={product.id}
            quantity={quantity}
            product_name={product.name}
          />
        </div>
      </div>
    </section>
  );
}

export default BuyProductPage;
