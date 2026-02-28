import { useCallback, useEffect, useState } from 'react';
import {
  createProductRequest,
  deleteProductRequest,
  fetchProductsRequest,
  updateProductRequest,
  type Product,
  type ProductUpsertPayload,
} from '@/entities/product';
import type { UseProductManagementResult } from '@/features/product/model';

const TOKEN_KEY = 'cyber_token';

export function useProductManagement(): UseProductManagementResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isPending, setIsPending] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      const nextProducts = await fetchProductsRequest();
      setProducts(nextProducts);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }, []);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  const submitProduct = async (payload: ProductUpsertPayload): Promise<boolean> => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      alert('Unauthorized');
      return false;
    }

    setIsPending(true);
    try {
      if (editingProduct) {
        await updateProductRequest(editingProduct.id, payload, token);
      } else {
        await createProductRequest(payload, token);
      }
      setEditingProduct(null);
      await fetchProducts();
      return true;
    } catch {
      alert('Data transmission error');
      return false;
    } finally {
      setIsPending(false);
    }
  };

  const deleteProduct = async (id: number): Promise<void> => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      alert('Unauthorized');
      return;
    }

    try {
      await deleteProductRequest(id, token);
      await fetchProducts();
    } catch {
      alert('Failed to delete: no access or server error');
    }
  };

  const startEditProduct = (product: Product) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditProduct = () => {
    setEditingProduct(null);
  };

  const buyProduct = (product: Product) => {
    alert(`Added to cart: ${product.name} - $${product.price}`);
  };

  return {
    products,
    editingProduct,
    isPending,
    submitProduct,
    deleteProduct,
    startEditProduct,
    cancelEditProduct,
    buyProduct,
  };
}
