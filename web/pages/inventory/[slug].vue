<template>
  <div class="bg-white min-h-screen font-sans">
    <div v-if="pending" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-darkblue"></div>
    </div>

    <div v-else-if="error || !product" class="container mx-auto px-4 py-20 text-center">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Trailer Not Found</h2>
      <p class="text-gray-600 mb-8">We couldn't find the trailer you were looking for.</p>
      <NuxtLink to="/inventory" class="text-brand-darkblue font-bold border-2 border-brand-darkblue py-2 px-6 rounded-sm hover:bg-brand-darkblue hover:text-white transition-colors">
        Back to Inventory
      </NuxtLink>
    </div>

    <div v-else class="pb-24">
      <!-- Top Title Bar -->
      <div class="container mx-auto max-w-[1440px] px-4 xl:px-8 py-6">
        <div class="flex justify-between items-start md:items-center">
          <h1 class="text-[28px] md:text-[32px] font-serif font-bold text-gray-900 leading-tight w-[85%]">
            <span v-if="product.condition" class="text-brand-darkblue uppercase tracking-wider mr-2">{{ product.condition }}</span>
            {{ product.title }}
          </h1>
          
          <div class="flex items-center gap-4 shrink-0">
            <NuxtLink to="/inventory" class="hidden md:flex items-center gap-2 text-gray-600 font-bold uppercase tracking-wider text-[14px] hover:text-brand-darkblue transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </NuxtLink>
            <!-- Print Icon -->
            <button class="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors" @click="window.print()">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Main Content Split -->
      <div class="container mx-auto max-w-[1440px] px-4 xl:px-8 mt-2">
        <div class="flex flex-col lg:flex-row gap-10">
          
          <!-- Left: Image Gallery -->
          <div class="w-full lg:w-[65%]">
            <!-- Main Viewer -->
            <div class="relative bg-gray-100 aspect-[4/3] flex items-center justify-center overflow-hidden mb-4 group">
              <img v-if="images.length" :src="images[activeImageIndex].url" :alt="product.title" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              
              <!-- Arrows -->
              <button v-if="images.length > 1" @click="prevImage" class="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button v-if="images.length > 1" @click="nextImage" class="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <!-- Thumbnail Strip -->
            <div v-if="images.length > 1" class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button 
                v-for="(img, idx) in images" 
                :key="img.id"
                @click="activeImageIndex = idx"
                class="relative shrink-0 w-24 aspect-[4/3] border-[3px] transition-colors"
                :class="activeImageIndex === idx ? 'border-brand-darkblue' : 'border-transparent hover:border-gray-300'"
              >
                <img :src="img.url" alt="thumbnail" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <!-- Right: Price & Specs -->
          <div class="w-full lg:w-[35%] flex flex-col">
            <!-- Price Block -->
            <div class="mb-4">
              <h2 class="text-gray-900 text-[22px] font-bold flex items-center gap-3">
                Price <span class="text-brand-darkblue text-[32px]">{{ formattedPrice }}</span>
              </h2>
            </div>

            <!-- Featured Badge -->
            <div v-if="product.is_featured" class="mb-8">
               <span class="bg-[#f07c6f] text-white text-[13px] font-bold px-5 py-2 rounded-full uppercase tracking-wider inline-block">
                Featured
              </span>
            </div>
            <div v-else class="mb-8"></div> <!-- spacer -->

            <!-- Key Details Lines -->
            <div class="border-t-2 border-gray-900 py-3 text-[16px] text-gray-900 font-semibold">
              Stock #: {{ product.stock_number || 'N/A' }}
            </div>
            <div class="border-t-2 border-brand-darkblue py-3 text-[16px] text-gray-900 font-semibold">
              Location: {{ product.location || 'N/A' }}
            </div>
            <div class="border-t-2 border-brand-darkblue py-3 text-[16px] text-gray-900 font-semibold mb-8">
              Status: {{ product.status || 'Available' }}
            </div>

            <!-- CTA Buttons -->
            <div class="flex flex-col gap-4 mt-auto">
              <button class="bg-brand-darkblue text-white w-full py-4 uppercase font-bold tracking-wider hover:bg-opacity-90 transition-opacity rounded-sm shadow-sm">
                Request Info
              </button>
              <button class="bg-white text-gray-900 border-[1.5px] border-gray-400 w-full py-4 uppercase font-bold tracking-wider hover:bg-gray-50 transition-colors rounded-sm">
                Get Financed
              </button>
              <button class="bg-white text-gray-900 border-[1.5px] border-gray-400 w-full py-4 uppercase font-bold tracking-wider hover:bg-gray-50 transition-colors rounded-sm">
                (678) 557-7165
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Specs & Details Area -->
      <div class="mt-16 bg-[#f4f4f4] pt-12 pb-24">
        <div class="container mx-auto max-w-[1440px] px-4 xl:px-8">
          <h2 class="text-center text-[36px] font-serif font-bold text-gray-900 uppercase tracking-widest mb-8">Unit Specs</h2>
          
          <!-- Tabs -->
          <div class="flex justify-center border-b-2 border-gray-300 mb-8 max-w-xl mx-auto">
            <button 
              @click="activeTab = 'description'"
              class="w-1/2 text-center py-3 text-[20px] transition-colors"
              :class="activeTab === 'description' ? 'text-brand-darkblue border-b-[3px] border-brand-darkblue font-semibold -mb-[2px]' : 'text-gray-500 hover:text-gray-800'"
            >
              Description
            </button>
            <button 
              @click="activeTab = 'details'"
              class="w-1/2 text-center py-3 text-[20px] transition-colors"
              :class="activeTab === 'details' ? 'text-brand-darkblue border-b-[3px] border-brand-darkblue font-semibold -mb-[2px]' : 'text-gray-500 hover:text-gray-800'"
            >
              Details
            </button>
          </div>

          <!-- Tab Content Wrapper -->
          <div class="bg-white max-w-5xl mx-auto p-8 md:p-12 shadow-sm rounded-sm min-h-[400px]">
            
            <!-- Description Tab -->
            <div v-show="activeTab === 'description'" class="prose max-w-none text-gray-700 text-[15px] leading-relaxed">
              <div v-html="product.description_html || 'No description available for this unit.'"></div>
            </div>

            <!-- Details Tab Grid -->
            <div v-show="activeTab === 'details'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-8 text-[14px]">
              
              <div class="flex flex-col gap-1">
                <span class="font-bold text-gray-900 uppercase tracking-wide text-[12px]">Type:</span>
                <span class="text-gray-700">{{ product.type || '-' }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="font-bold text-gray-900 uppercase tracking-wide text-[12px]">Category:</span>
                <span class="text-gray-700">{{ product.category || '-' }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="font-bold text-gray-900 uppercase tracking-wide text-[12px]">Stock:</span>
                <span class="text-gray-700">{{ product.stock_number || '-' }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="font-bold text-gray-900 uppercase tracking-wide text-[12px]">Condition:</span>
                <span class="text-gray-700">{{ product.condition || '-' }}</span>
              </div>
              
              <div class="flex flex-col gap-1">
                <span class="font-bold text-gray-900 uppercase tracking-wide text-[12px]">Status:</span>
                <span class="text-gray-700">{{ product.status || '-' }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="font-bold text-gray-900 uppercase tracking-wide text-[12px]">Manufacturer:</span>
                <span class="text-gray-700">{{ product.manufacturer || '-' }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="font-bold text-gray-900 uppercase tracking-wide text-[12px]">Model:</span>
                <span class="text-gray-700">{{ product.model || '-' }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="font-bold text-gray-900 uppercase tracking-wide text-[12px]">Year:</span>
                <span class="text-gray-700">{{ product.year || '-' }}</span>
              </div>
              
              <div class="flex flex-col gap-1">
                <span class="font-bold text-gray-900 uppercase tracking-wide text-[12px]">Floor Length:</span>
                <span class="text-gray-700">{{ product.floor_length || '-' }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="font-bold text-gray-900 uppercase tracking-wide text-[12px]">Floor Width:</span>
                <span class="text-gray-700">{{ product.floor_width || '-' }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="font-bold text-gray-900 uppercase tracking-wide text-[12px]">GVWR:</span>
                <span class="text-gray-700">{{ formattedWeight(product.weight) || '-' }}</span>
              </div>
               <!-- We don't have payload capacity directly but we mimic it if needed, or leave it -->
              <div class="flex flex-col gap-1">
                <span class="font-bold text-gray-900 uppercase tracking-wide text-[12px]">Axle Capacity:</span>
                <span class="text-gray-700">{{ product.axle_capacity || '-' }}</span>
              </div>

              <div class="flex flex-col gap-1">
                <span class="font-bold text-gray-900 uppercase tracking-wide text-[12px]">Color:</span>
                <span class="text-gray-700">{{ product.color || '-' }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="font-bold text-gray-900 uppercase tracking-wide text-[12px]">Pull Type:</span>
                <span class="text-gray-700">{{ product.pull_type || '-' }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="font-bold text-gray-900 uppercase tracking-wide text-[12px]">Axles:</span>
                <span class="text-gray-700">{{ product.axles || '-' }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="font-bold text-gray-900 uppercase tracking-wide text-[12px]">Construction:</span>
                <span class="text-gray-700">{{ product.construction || '-' }}</span>
              </div>

              <div class="flex flex-col gap-1">
                <span class="font-bold text-gray-900 uppercase tracking-wide text-[12px]">Stalls:</span>
                <span class="text-gray-700">{{ product.stalls || '-' }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="font-bold text-gray-900 uppercase tracking-wide text-[12px]">Load Type:</span>
                <span class="text-gray-700">{{ product.load_type || '-' }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="font-bold text-gray-900 uppercase tracking-wide text-[12px]">Height:</span>
                <span class="text-gray-700">{{ product.height || '-' }}</span>
              </div>

            </div>
          </div>

          <!-- Similar Listings -->
          <div v-if="similarProducts.length > 0" class="mt-20 max-w-[1440px] mx-auto">
            <h2 class="text-[28px] font-serif font-bold text-gray-900 mb-8 border-b-2 border-gray-300 pb-4">Similar Listings</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <InventoryProductCard v-for="sim in similarProducts" :key="sim.id" :product="sim" theme="light" />
            </div>
          </div>

        </div>
      </div>
      
      <!-- Floating Contact Button -->
      <div class="fixed bottom-6 right-6 z-50">
        <NuxtLink to="/contact-us" class="bg-brand-yellow text-white font-sans font-bold uppercase tracking-wider py-3 px-6 rounded-full hover:opacity-90 flex items-center justify-center gap-2 transition-opacity shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
          </svg>
          Contact Us!
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useSupabaseClient } from '#imports';

const route = useRoute();
const slug = route.params.slug;
const supabase = useSupabaseClient();

const activeTab = ref('description');
const activeImageIndex = ref(0);

// Fetch product and images
const { data, pending, error } = await useAsyncData(`product-${slug}`, async () => {
  const { data: productData, error: productError } = await supabase
    .from('products')
    .select(`
      *,
      product_images (
        id, url, is_primary, sort_order
      )
    `)
    .eq('slug', slug)
    .single();

  if (productError) throw productError;
  return productData;
}, { lazy: true });

const product = computed(() => data.value || null);

const images = computed(() => {
  if (!product.value || !product.value.product_images) return [];
  // Sort images by sort_order
  return [...product.value.product_images].sort((a, b) => {
    if (a.is_primary) return -1;
    if (b.is_primary) return 1;
    return (a.sort_order || 0) - (b.sort_order || 0);
  });
});

// Fetch similar products
const { data: similarData } = await useAsyncData(`similar-${slug}`, async () => {
  if (!product.value) return [];
  const { data } = await supabase
    .from('products')
    .select(`
      *,
      product_images (
        id, url, is_primary, sort_order
      )
    `)
    .eq('category', product.value.category)
    .neq('id', product.value.id)
    .limit(4);
  return data || [];
}, { watch: [product], lazy: true });

const similarProducts = computed(() => similarData.value || []);

const nextImage = () => {
  if (images.value.length === 0) return;
  activeImageIndex.value = (activeImageIndex.value + 1) % images.value.length;
};

const prevImage = () => {
  if (images.value.length === 0) return;
  activeImageIndex.value = (activeImageIndex.value - 1 + images.value.length) % images.value.length;
};

const formattedPrice = computed(() => {
  if (!product.value || !product.value.price) return 'Call for Price';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(product.value.price);
});

const formattedWeight = (weight) => {
  if (!weight) return '-';
  const weightStr = String(weight);
  if (weightStr.toLowerCase().includes('lbs')) {
    return weightStr;
  }
  return weightStr + ' lbs';
};
</script>
