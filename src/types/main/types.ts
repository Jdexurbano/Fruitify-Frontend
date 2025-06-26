export type ProductTypes = {
  id: number;
  name: string;
  description: string;
  product_image: string;
  price: number;
  stock: number;
};

//props type for buying products

export type BuyProductProps = {
  product: number;
  quantity: number;
  price: number;
  product_name: string;
};

//types for the orders
export type OrdersTypes = {
  id: number;
  product: ProductTypes;
  quantity: number;
  price: number;
  status: string;
};
