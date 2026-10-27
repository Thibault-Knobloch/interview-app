// Mirrors the API shapes of the Kitchen Admin server (interview-server repo).

export interface StorageArea {
  id: number;
  name: string;
  productCount: number;
}

export interface Product {
  productKey: string;
  name: string;
  areaId: number;
  unit: string;
}

export interface CountItem {
  productKey: string;
  count: number;
}

/** Body of POST /api/inventory/counts */
export interface CountPayload {
  areaId: number;
  items: CountItem[];
}
