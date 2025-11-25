// --- 1. UPDATED PRODUCT INTERFACE ---
export interface Product {
  id: string; 
  name: string;
  price: number; 
  category: string;
  image: string; 
  quantity?: number;
  time?: string;
  isFeatured?: boolean;
  description?: string;
  qtyLabel?: string; 
  seller?: string;
  url?: string;
  rating?: string | null;
}