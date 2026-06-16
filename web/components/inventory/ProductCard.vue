<template>
  <NuxtLink :to="`/inventory/${product.slug}`" class="group cursor-pointer flex flex-col text-center">
    <!-- Image Area -->
    <div class="relative overflow-hidden aspect-[4/3] rounded-xl border border-white/30 mb-4 shadow-lg">
      <img :src="primaryImageUrl" :alt="product.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      
      <!-- Watermark Overlay -->
      <div class="absolute bottom-[50px] right-2 opacity-30 w-16 pointer-events-none">
        <img src="/images/logo.png" alt="watermark" class="w-full h-auto" />
      </div>
      
      <!-- Price Overlay -->
      <div class="absolute bottom-0 left-0 w-full px-3 py-2 flex justify-between items-center bg-black/60 backdrop-blur-sm">
        <span class="bg-[#e5e5e5] text-black text-[11px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider hover:bg-white transition-colors">View Details</span>
        <span v-if="formattedPrice" class="text-white font-serif text-[22px] font-bold">{{ formattedPrice }}</span>
        <span v-else class="text-white font-serif text-[18px] font-bold">Call for Price</span>
      </div>
    </div>
    
    <!-- Text Area -->
    <div class="px-2 mt-2">
      <h4 class="text-[15px] font-sans font-medium leading-[1.4]" :class="theme === 'dark' ? 'text-white' : 'text-gray-900'">
        <span v-if="product.condition" class="font-bold mr-1" :class="theme === 'dark' ? 'text-brand-yellow' : 'text-brand-darkblue'">{{ product.condition }}</span>
        {{ product.title }}
      </h4>
    </div>
  </NuxtLink>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  theme: {
    type: String,
    default: 'dark' // 'dark' or 'light'
  }
});

const formattedPrice = computed(() => {
  if (!props.product.price) return null;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(props.product.price);
});

// Calculate primary image URL based on whether we join the images table or have it directly
const primaryImageUrl = computed(() => {
  if (props.product.product_images && props.product.product_images.length > 0) {
    // If it's joined from Supabase
    const primary = props.product.product_images.find(img => img.is_primary) || props.product.product_images[0];
    return primary.url;
  }
  
  // Fallback placeholder
  return '/images/placeholder.webp'; 
});
</script>
