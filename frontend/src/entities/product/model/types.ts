export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock_quantity: number;
  image_url: string | null;
  created_at: string;
}

export interface ProductUpsertPayload {
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  stock_quantity?: number;
}
