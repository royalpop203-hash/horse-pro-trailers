import { SupabaseProductRepository } from '../infrastructure/http/SupabaseProductRepository';
import { 
  GetProductsUseCase, 
  GetProductBySlugUseCase, 
  GetFeaturedProductsUseCase 
} from '../application/usecases/ProductUseCases';

export const useProducts = () => {
  // Initialize repository
  const repository = new SupabaseProductRepository();

  // Initialize use cases
  const getProductsUseCase = new GetProductsUseCase(repository);
  const getProductBySlugUseCase = new GetProductBySlugUseCase(repository);
  const getFeaturedProductsUseCase = new GetFeaturedProductsUseCase(repository);

  return {
    getProducts: (query?: any) => getProductsUseCase.execute(query),
    getProductBySlug: (slug: string) => getProductBySlugUseCase.execute(slug),
    getFeaturedProducts: (limit?: number) => getFeaturedProductsUseCase.execute(limit),
    getSimilarProducts: (product: any, limit?: number) => repository.getSimilarProducts(product, limit)
  };
};
