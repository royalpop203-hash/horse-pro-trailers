export interface ProductImage {
  id?: string;
  url: string;
  altText?: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface Product {
  id?: string;
  slug: string;
  title: string;
  condition: string;
  price?: number;
  msrp?: number;
  stockNumber: string;
  location: string;
  status: string;
  descriptionHtml?: string;
  type?: string;
  category?: string;
  manufacturer?: string;
  model?: string;
  year?: number;
  floorLength?: string;
  floorWidth?: string;
  weight?: string;
  axleCapacity?: string;
  color?: string;
  pullType?: string;
  axles?: string;
  construction?: string;
  stalls?: string;
  loadType?: string;
  height?: string;
  length?: string;
  features?: string[];
  isSale: boolean;
  isFeatured: boolean;
  images?: ProductImage[];
  createdAt?: string;
  updatedAt?: string;
}
