import type { Product } from '../entities/Product';

export interface ProductQuery {
  category?: string;
  manufacturer?: string;
  condition?: string;
  pullType?: string;
  minPrice?: number;
  maxPrice?: number;
  isFeatured?: boolean;
  isSale?: boolean;
  sortBy?: 'price_asc' | 'price_desc' | 'year_desc' | 'newest';
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  count: number;
  page: number;
  totalPages: number;
}

export interface IProductRepository {
  getProducts(query?: ProductQuery): Promise<PaginatedResult<Product>>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getFeaturedProducts(limit?: number): Promise<Product[]>;
  getSimilarProducts(product: Product, limit?: number): Promise<Product[]>;
  createProduct(product: Partial<Product>): Promise<Product>;
  updateProduct(id: string, product: Partial<Product>): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
}
