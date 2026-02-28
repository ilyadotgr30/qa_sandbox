import api from '@/shared/api/client';
import type { Product, ProductUpsertPayload } from '@/entities/product/model';

function withAuth(token: string) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

export async function fetchProductsRequest(): Promise<Product[]> {
  const response = await api.get<Product[]>('/products/');
  return response.data;
}

export async function createProductRequest(payload: ProductUpsertPayload, token: string): Promise<Product> {
  const response = await api.post<Product>('/products/', payload, withAuth(token));
  return response.data;
}

export async function updateProductRequest(productId: number, payload: ProductUpsertPayload, token: string): Promise<Product> {
  const response = await api.put<Product>(`/products/${productId}`, payload, withAuth(token));
  return response.data;
}

export async function deleteProductRequest(productId: number, token: string): Promise<void> {
  await api.delete(`/products/${productId}`, withAuth(token));
}
