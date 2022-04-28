export interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export interface SingleProduct extends Product {
  rating: {
    rate: number;
    count: number;
  };
}
