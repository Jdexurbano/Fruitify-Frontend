import ProductCard from "@/components/main/ProductCard";
import axios from "axios";
import { useState, useEffect } from "react";
import type { ProductTypes } from "@/types/main/types";
import { URL } from "@/utils/constant";
import { useAuth } from "@/context/AuthContext";

function MainPage() {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const { token } = useAuth();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${URL}products/`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + String(token),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center px-5">
      {products.map((data) => {
        return (
          <ProductCard
            key={data.id}
            id={data.id}
            name={data.name}
            price={data.price}
            description={data.description}
            product_image={data.product_image}
            stock={data.stock}
          />
        );
      })}
    </section>
  );
}

export default MainPage;
