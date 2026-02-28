import type { Product } from '@/entities/product/model';

export interface ProductCatalogProps {
  products: Product[];
  onDelete: (id: number) => void | Promise<void>;
  onEdit: (product: Product) => void;
  onBuy: (product: Product) => void;
}
