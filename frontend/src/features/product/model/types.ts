import type { Product, ProductUpsertPayload } from '@/entities/product';

export interface ProductFormProps {
  editingProduct: Product | null;
  isPending: boolean;
  onSubmit: (payload: ProductUpsertPayload) => Promise<boolean>;
  onCancelEdit: () => void;
}

export interface UseProductManagementResult {
  products: Product[];
  editingProduct: Product | null;
  isPending: boolean;
  submitProduct: (payload: ProductUpsertPayload) => Promise<boolean>;
  deleteProduct: (id: number) => Promise<void>;
  startEditProduct: (product: Product) => void;
  cancelEditProduct: () => void;
  buyProduct: (product: Product) => void;
}
