import type { IProductRepository, ProductQuery, PaginatedResult } from '../../domain/repositories/IProductRepository';
import type { Product } from '../../domain/entities/Product';

export class GetProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(query?: ProductQuery): Promise<PaginatedResult<Product>> {
    // Here we could add business logic, validation, etc.
    // For now, we just pass the query to the repository
    return await this.productRepository.getProducts(query);
  }
}

export class GetProductBySlugUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(slug: string): Promise<Product | null> {
    if (!slug) {
      throw new Error('Slug is required');
    }
    return await this.productRepository.getProductBySlug(slug);
  }
}

export class GetFeaturedProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(limit: number = 8): Promise<Product[]> {
    return await this.productRepository.getFeaturedProducts(limit);
  }
}
