<template>
  <div class="bg-[#f4f4f4] min-h-screen">
    <!-- Breadcrumb / Header Area -->
    <div class="bg-brand-darkblue py-8">
      <div class="max-w-[1440px] mx-auto px-4 xl:px-8">
        <h1 class="text-[32px] md:text-[40px] font-serif font-bold text-white tracking-wide">
          Inventory
        </h1>
        <p class="text-white/80 font-sans mt-2">
          Browse our extensive selection of new and pre-owned trailers.
        </p>
      </div>
    </div>

    <div class="max-w-[1440px] mx-auto px-4 xl:px-8 py-10">
      <div class="flex flex-col lg:flex-row gap-8">
        
        <!-- Sidebar Filters (Mobile & Desktop) -->
        <div class="w-full lg:w-[280px] shrink-0">
          <InventorySidebar v-model="filters" @update:modelValue="onFiltersChanged" />
        </div>

        <!-- Product Grid Area -->
        <div class="flex-1">
          <!-- Loading State -->
          <div v-if="pending && products.length === 0" class="flex justify-center items-center py-20">
            <div class="w-10 h-10 border-4 border-brand-red border-t-transparent rounded-full animate-spin"></div>
          </div>

          <!-- Empty State -->
          <div v-else-if="products.length === 0" class="bg-white p-10 text-center rounded-md border border-gray-200">
            <h3 class="text-[20px] font-serif font-bold mb-2">No trailers found</h3>
            <p class="text-gray-600 mb-6">We couldn't find any trailers matching your current filters.</p>
            <button @click="resetFilters" class="bg-brand-red text-white hover:bg-brand-darkblue px-6 py-2 rounded-full font-bold transition-colors">
              Clear All Filters
            </button>
          </div>

          <!-- Grid/List -->
          <div v-else>
            <div class="mb-6 flex justify-between items-center text-[18px] font-bold text-brand-darkblue">
              <span>{{ totalUnits }} units</span>
            </div>
            
            <div class="flex flex-col gap-0 border-t border-gray-200">
              <ProductListItem
                v-for="product in products"
                :key="product.id"
                :product="product"
              />
            </div>

            <!-- Load More -->
            <div v-if="hasMore" class="mt-10 flex justify-center">
              <button 
                @click="loadMore" 
                :disabled="pending"
                class="bg-brand-darkblue text-white hover:bg-brand-yellow hover:text-black border border-brand-darkblue px-8 py-3 rounded-full font-serif font-bold transition-all disabled:opacity-50"
              >
                <span v-if="pending">Loading...</span>
                <span v-else>Load More</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSupabaseClient, useSeoMeta } from '#imports';
import InventorySidebar from '~/components/inventory/InventorySidebar.vue';
import ProductListItem from '~/components/inventory/ProductListItem.vue';

useSeoMeta({
  title: 'Inventory | Horse Pro Trailers',
  description: 'Browse our extensive inventory of new and used horse trailers for sale. Filter by brand, stalls, pull type, and condition.',
  ogTitle: 'Inventory | Horse Pro Trailers',
  ogDescription: 'Browse our extensive inventory of new and used horse trailers for sale.',
  ogImage: '/images/Horse-Pro-Trailers-Hero-Background-1-jpg.webp',
  twitterCard: 'summary_large_image',
})

const route = useRoute();
const router = useRouter();
const supabase = useSupabaseClient();

const PAGE_SIZE = 12;

// State
const products = ref([]);
const pending = ref(false);
const hasMore = ref(false);
const page = ref(1);
const totalUnits = ref(0);

// Initialize filters from URL query
const filters = ref({
  sort: 'relevance',
  search: route.query.search || '',
  condition: route.query.condition || '',
  category: route.query.category || '',
  stalls: route.query.stalls || '',
  pull_type: route.query.pull_type || '',
  clearance: route.query.clearance === 'true',
  on_order: route.query['on-order'] === 'true'
});

// Fetch products based on filters and pagination
const fetchProducts = async (isLoadMore = false) => {
  pending.value = true;
  
  try {
    let query = supabase
      .from('products')
      .select(`
        id,
        slug,
        title,
        price,
        condition,
        stock_number,
        description_html,
        floor_length,
        weight,
        color,
        pull_type,
        is_sale,
        is_featured,
        product_images (
          url,
          is_primary
        )
      `, { count: 'exact' });

    // Apply Filters
    if (filters.value.search) {
      query = query.or(`title.ilike.%${filters.value.search}%,stock_number.ilike.%${filters.value.search}%`);
    }
    
    if (filters.value.condition) {
      if (filters.value.condition === 'Used') {
        query = query.ilike('condition', '%used%'); 
      } else {
        query = query.ilike('condition', `%${filters.value.condition}%`);
      }
    }
    
    if (filters.value.category) {
      query = query.ilike('category', `%${filters.value.category}%`);
    }
    
    if (filters.value.brand) {
      query = query.ilike('manufacturer', `%${filters.value.brand}%`);
    }
    
    if (filters.value.stalls) {
      if (filters.value.stalls === '6+') {
        query = query.gte('stalls', 6);
      } else {
        query = query.eq('stalls', parseInt(filters.value.stalls));
      }
    }

    if (filters.value.pull_type) {
      query = query.ilike('pull_type', `%${filters.value.pull_type}%`);
    }

    if (filters.value.clearance) {
      query = query.eq('is_sale', true);
    }

    if (filters.value.on_order) {
      query = query.ilike('status', '%On Order%');
    }

    // Apply Sorting
    if (filters.value.sort === 'price_asc') {
      query = query.order('price', { ascending: true, nullsFirst: false });
    } else if (filters.value.sort === 'price_desc') {
      query = query.order('price', { ascending: false, nullsFirst: false });
    } else if (filters.value.sort === 'created_at_asc') {
      query = query.order('created_at', { ascending: true });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    // Pagination
    const from = (page.value - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) throw error;

    if (isLoadMore) {
      products.value = [...products.value, ...(data || [])];
    } else {
      products.value = data || [];
      totalUnits.value = count || 0;
    }

    hasMore.value = products.value.length < count;
    
  } catch (err) {
    console.error('Error fetching products:', err);
  } finally {
    pending.value = false;
  }
};

const onFiltersChanged = () => {
  // Update URL
  const query = {};
  if (filters.value.search) query.search = filters.value.search;
  if (filters.value.condition) query.condition = filters.value.condition;
  if (filters.value.category) query.category = filters.value.category;
  if (filters.value.brand) query.brand = filters.value.brand;
  if (filters.value.stalls) query.stalls = filters.value.stalls;
  if (filters.value.pull_type) query.pull_type = filters.value.pull_type;
  if (filters.value.clearance) query.clearance = 'true';
  if (filters.value.on_order) query['on-order'] = 'true';
  
  router.push({ query });

  // Reset pagination and fetch
  page.value = 1;
  fetchProducts(false);
};

const resetFilters = () => {
  filters.value = {
    sort: 'relevance',
    search: '',
    condition: '',
    category: '',
    brand: '',
    stalls: '',
    pull_type: '',
    clearance: false,
    on_order: false
  };
  onFiltersChanged();
};

const loadMore = () => {
  page.value++;
  fetchProducts(true);
};

// Initial fetch
onMounted(() => {
  // If the user navigates directly to /inventory?category=Horse+Trailers
  // The filters are set, we just need to fetch
  fetchProducts(false);
});

// Watch for route query changes (e.g., clicking a link from header while already on inventory page)
watch(
  () => route.query,
  (newQuery) => {
    // Only react if the query actually changed filters to avoid infinite loops
    let changed = false;
    if (newQuery.search !== filters.value.search) {
      filters.value.search = newQuery.search || '';
      changed = true;
    }
    if (newQuery.condition !== filters.value.condition) {
      filters.value.condition = newQuery.condition || '';
      changed = true;
    }
    if (newQuery.category !== filters.value.category) {
      filters.value.category = newQuery.category || '';
      changed = true;
    }
    if (newQuery.brand !== filters.value.brand) {
      filters.value.brand = newQuery.brand || '';
      changed = true;
    }
    if (newQuery.stalls !== filters.value.stalls) {
      filters.value.stalls = newQuery.stalls || '';
      changed = true;
    }
    if (newQuery.pull_type !== filters.value.pull_type) {
      filters.value.pull_type = newQuery.pull_type || '';
      changed = true;
    }
    const newClearance = newQuery.clearance === 'true';
    if (newClearance !== filters.value.clearance) {
      filters.value.clearance = newClearance;
      changed = true;
    }
    const newOnOrder = newQuery['on-order'] === 'true';
    if (newOnOrder !== filters.value.on_order) {
      filters.value.on_order = newOnOrder;
      changed = true;
    }
    
    if (changed) {
      page.value = 1;
      fetchProducts(false);
    }
  }
);
</script>
