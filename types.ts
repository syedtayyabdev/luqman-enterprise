export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  specs: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 'All' | 'Gaming' | 'MacBook' | 'Headphones' | 'Budget';