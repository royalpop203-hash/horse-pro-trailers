import type { IProductRepository, ProductQuery, PaginatedResult } from '../../domain/repositories/IProductRepository';
import type { Product } from '../../domain/entities/Product';
import { useSupabaseClient } from '#imports';

export class SupabaseProductRepository implements IProductRepository {
  private client = useSupabaseClient();

  async getProducts(query?: ProductQuery): Promise<PaginatedResult<Product>> {
    const page = query?.page || 1;
    const limit = query?.limit || 12;
    const offset = (page - 1) * limit;

    let supabaseQuery = this.client
      .from('products')
      .select('*, images:product_images(*)', { count: 'exact' });

    if (query?.category) supabaseQuery = supabaseQuery.eq('category', query.category);
    if (query?.manufacturer) supabaseQuery = supabaseQuery.eq('manufacturer', query.manufacturer);
    if (query?.condition) supabaseQuery = supabaseQuery.eq('condition', query.condition);
    if (query?.pullType) supabaseQuery = supabaseQuery.eq('pull_type', query.pullType);
    if (query?.minPrice !== undefined) supabaseQuery = supabaseQuery.gte('price', query.minPrice);
    if (query?.maxPrice !== undefined) supabaseQuery = supabaseQuery.lte('price', query.maxPrice);
    if (query?.isFeatured !== undefined) supabaseQuery = supabaseQuery.eq('is_featured', query.isFeatured);
    if (query?.isSale !== undefined) supabaseQuery = supabaseQuery.eq('is_sale', query.isSale);

    if (query?.sortBy === 'price_asc') {
      supabaseQuery = supabaseQuery.order('price', { ascending: true });
    } else if (query?.sortBy === 'price_desc') {
      supabaseQuery = supabaseQuery.order('price', { ascending: false });
    } else if (query?.sortBy === 'year_desc') {
      supabaseQuery = supabaseQuery.order('year', { ascending: false });
    } else {
      // newest
      supabaseQuery = supabaseQuery.order('created_at', { ascending: false });
    }

    const { data, count, error } = await supabaseQuery.range(offset, offset + limit - 1);

    if (error) throw new Error(error.message);

    return {
      data: data as any as Product[],
      count: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit)
    };
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    const { data, error } = await this.client
      .from('products')
      .select('*, images:product_images(*)')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw new Error(error.message);
    }
    return data as any as Product;
  }

  async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    const { data, error } = await this.client
      .from('products')
      .select('*, images:product_images(*)')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw new Error(error.message);
    return data as any as Product[];
  }

  async getSimilarProducts(product: Product, limit: number = 6): Promise<Product[]> {
    // Basic similarity: same category or manufacturer, excluding self
    const { data, error } = await this.client
      .from('products')
      .select('*, images:product_images(*)')
      .neq('id', product.id)
      .or(`category.eq."${product.category}",manufacturer.eq."${product.manufacturer}"`)
      .limit(limit);

    if (error) throw new Error(error.message);
    return data as any as Product[];
  }

  async createProduct(product: Partial<Product>): Promise<Product> {
    const { images, ...productData } = product;
    
    // Convert camelCase to snake_case for DB (omitted for brevity, Supabase usually requires matching column names)
    // Here we assume mapping is done or product object already matches DB schema mostly.
    
    const { data, error } = await this.client
      .from('products')
      .insert(productData)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as any as Product;
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    const { images, ...productData } = product;
    const { data, error } = await this.client
      .from('products')
      .update(productData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as any as Product;
  }

  async deleteProduct(id: string): Promise<void> {
    const { error } = await this.client
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }
}
