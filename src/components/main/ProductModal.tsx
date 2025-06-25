import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import type { BuyProductProps } from "@/types/main/types";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "@/utils/constant";
import { useAuth } from "@/context/AuthContext";

function ProductModal({
  price,
  product,
  quantity,
  product_name,
}: BuyProductProps) {
  //state for the total price
  const [totalPrice, setTotalPrice] = useState<number | null>(0);

  //function to calculate the total price
  const handleTotalPrice = () => setTotalPrice(quantity * price);

  //get the token
  const { token } = useAuth();

  useEffect(() => {
    handleTotalPrice();

    //call the handleTotalPrice function when the quantity change
  }, [quantity]);

  //function to handle the buying the product
  const handleBuyProduct = async () => {
    const payload = {
      product: product,
      quantity: quantity,
      price: totalPrice,
    };
    try {
      const response = await axios.post(`${URL}orders/`, payload, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + String(token),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        console.log("success");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Buy Now</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Purchase</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to purchase <strong>{quantity}</strong>{" "}
            <strong>{product_name}</strong> (s) for a total of{" "}
            <strong>₱{totalPrice}</strong>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={quantity ? false : true}
            onClick={handleBuyProduct}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ProductModal;
