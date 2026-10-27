import { apiFetch } from './api';
import type { CountPayload, Product, StorageArea } from '../types';

export function fetchAreas(): Promise<StorageArea[]> {
  return apiFetch<StorageArea[]>('/inventory/areas');
}

export function fetchProducts(areaId: number): Promise<Product[]> {
  return apiFetch<Product[]>(`/inventory/areas/${areaId}/products`);
}

export function submitCount(payload: CountPayload): Promise<{ id: number }> {
  return apiFetch<{ id: number }>('/inventory/counts', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
