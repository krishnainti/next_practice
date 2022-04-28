import { Product, SingleProduct } from "../../interfaces";

export const getProducts = async (): Promise<Product[]> => {
  return fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => json);
};

export const getSingleProduct = async (id: string): Promise<SingleProduct> => {
  return fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((json) => json);
};
