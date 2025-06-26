import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { URL, IMGURL } from "@/utils/constant";
import type { OrdersTypes } from "@/types/main/types";
import { LoaderCircle } from "lucide-react";
function OrdersPage() {
  //state to store the orders
  const [orders, setOrders] = useState<OrdersTypes[]>([]);

  //get the token from the useAuth context
  const { token } = useAuth();

  //function to fecth the data
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${URL}orders/`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + String(token),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setOrders(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (!orders)
    return (
      <section className="h-screen w-full flex justify-center items-center">
        <LoaderCircle size={50} color="gray" className="animate-spin" />
      </section>
    );

  return (
    <section className="w-full px-5 pt-4 space-y-3.5">
      {[...orders].reverse().map((order) => {
        return (
          <div
            key={order.id}
            className="border py-2 px-3 flex justify-between items-center cursor-pointer rounded-lg"
          >
            <div>
              <p className="text-lg">{order.product.name}</p>
              <p className="text-sm text-neutral-600">
                {order.product.description.length > 50
                  ? `${order.product.description.substring(0, 50)}...`
                  : order.product.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p
                className={`${
                  order.status == "pending"
                    ? "bg-amber-200"
                    : order.status == "shipped"
                    ? "bg-green-200"
                    : "bg-red-200"
                } px-2 py-1 rounded-md text-neutral-500 text-sm`}
              >
                {order.status}
              </p>
              <img
                src={`${IMGURL}${order.product.product_image}`}
                alt=""
                className="size-20  rounded-md"
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default OrdersPage;
