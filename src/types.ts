export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
  category: string;
  created_at?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
