<template>
  <div class="flex flex-col md:flex-row gap-6 py-8 border-b-2 border-brand-darkblue last:border-b-0">
    <!-- Image -->
    <div class="w-full md:w-[35%] shrink-0">
      <div class="relative aspect-[4/3] rounded-sm overflow-hidden bg-gray-100 group">
        <img 
          v-if="primaryImageUrl"
          :src="primaryImageUrl" 
          :alt="product.title" 
          class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div class="absolute bottom-2 right-2 opacity-40 w-16 pointer-events-none">
          <img src="/images/logo.png" alt="watermark" class="w-full h-auto" />
        </div>
      </div>
    </div>

    <!-- Details -->
    <div class="w-full md:w-[40%] flex flex-col justify-start">
      <h3 class="text-[20px] font-sans text-gray-900 font-bold leading-tight mb-2">
        <span v-if="product.condition" class="font-bold text-brand-darkblue mr-1">{{ product.condition }}</span>
        {{ product.title }}
      </h3>
      <p class="text-[13px] text-gray-500 mb-4">Stock #: <span class="font-bold">{{ product.stock_number || 'N/A' }}</span></p>
      
      <div class="text-[14px] text-gray-800 space-y-1">
        <!-- Render simple bullets from description -->
        <div v-if="extractedBullets.length > 0" class="pl-5">
          <ul class="list-disc space-y-1">
            <li v-for="(bullet, index) in extractedBullets" :key="index" v-html="bullet"></li>
          </ul>
        </div>
        <div v-else-if="product.description_html" class="prose prose-sm max-w-none text-gray-800 line-clamp-4" v-html="product.description_html"></div>
      </div>

      <!-- Featured Badge -->
      <div v-if="product.is_featured" class="mt-4">
        <span class="bg-[#f07c6f] text-white text-[12px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wide inline-block">
          Featured
        </span>
      </div>
    </div>

    <!-- Price and Specs -->
    <div class="w-full md:w-[25%] flex flex-col justify-between shrink-0">
      <div>
        <div class="text-[26px] font-bold text-brand-darkblue font-sans text-right mb-4">
          {{ formattedPrice }}
        </div>

        <!-- Specs Table -->
        <div class="w-full text-[13px] mb-6 border border-gray-100 rounded-sm overflow-hidden">
          <div class="flex justify-between py-2 px-3 bg-gray-100">
            <span class="text-gray-600">Floor Length</span>
            <span class="font-bold text-gray-900">{{ product.floor_length || '-' }}</span>
          </div>
          <div class="flex justify-between py-2 px-3 bg-white">
            <span class="text-gray-600">GVWR</span>
            <span class="font-bold text-gray-900">{{ formattedWeight }}</span>
          </div>
          <div class="flex justify-between py-2 px-3 bg-gray-100">
            <span class="text-gray-600">Color</span>
            <span class="font-bold text-gray-900">{{ product.color || '-' }}</span>
          </div>
          <div class="flex justify-between py-2 px-3 bg-white">
            <span class="text-gray-600">Pull Type</span>
            <span class="font-bold text-gray-900">{{ product.pull_type || '-' }}</span>
          </div>
        </div>
      </div>

      <!-- Button -->
      <div class="text-right">
        <NuxtLink :to="`/inventory/${product.slug}`" class="inline-block">
          <button class="bg-transparent text-brand-darkblue border-[1.5px] border-brand-darkblue font-sans font-bold uppercase tracking-wider py-2.5 px-6 rounded-sm hover:bg-brand-darkblue hover:text-white transition-colors w-full">
            View Details
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const formattedPrice = computed(() => {
  if (!props.product.price) return 'Call for Price';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(props.product.price);
});

const formattedWeight = computed(() => {
  if (!props.product.weight) return '-';
  const weightStr = String(props.product.weight);
  if (weightStr.toLowerCase().includes('lbs')) {
    return weightStr;
  }
  return weightStr + ' lbs';
});

const primaryImageUrl = computed(() => {
  if (props.product.product_images && props.product.product_images.length > 0) {
    const primary = props.product.product_images.find(img => img.is_primary) || props.product.product_images[0];
    return primary.url;
  }
  return ''; 
});

// Extract first 3 bullets from description HTML if they exist
const extractedBullets = computed(() => {
  if (!props.product.description_html) return [];
  const matches = [...props.product.description_html.matchAll(/<li[^>]*>(.*?)<\/li>/gi)];
  if (matches.length > 0) {
    return matches.slice(0, 3).map(m => m[1].replace(/<\/?(?:b|i|strong|em|span)[^>]*>/g, (tag) => tag)); // keep simple inline tags
  }
  return [];
});
</script>
