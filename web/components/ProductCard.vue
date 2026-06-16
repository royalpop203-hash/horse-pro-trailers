<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
    <NuxtLink :to="`/inventory/${product.slug}`" class="relative overflow-hidden group block aspect-[4/3]">
      <img 
        :src="primaryImage" 
        :alt="product.title" 
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div v-if="product.isSale" class="absolute top-4 right-4 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wide">
        Sale
      </div>
      <div class="absolute bottom-4 left-4 bg-black/70 text-white text-sm font-semibold px-3 py-1 rounded-sm">
        {{ product.condition }}
      </div>
    </NuxtLink>
    
    <div class="p-6 flex flex-col flex-grow">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-heading font-bold text-gray-900 leading-tight">
          <NuxtLink :to="`/inventory/${product.slug}`" class="hover:text-brand-blue transition-colors">
            {{ product.title }}
          </NuxtLink>
        </h3>
      </div>
      
      <div class="mt-auto pt-4 flex justify-between items-end border-t border-gray-100">
        <div class="text-2xl font-bold text-brand-red">
          {{ formattedPrice }}
        </div>
        <NuxtLink :to="`/inventory/${product.slug}`" class="text-sm font-semibold text-brand-blue uppercase tracking-wide hover:underline">
          View Details
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const primaryImage = computed(() => {
  if (!props.product.images || props.product.images.length === 0) {
    return 'https://via.placeholder.com/600x400?text=No+Image';
  }
  const primary = props.product.images.find(i => i.isPrimary);
  return primary ? primary.url : props.product.images[0].url;
});

const formattedPrice = computed(() => {
  if (props.product.price === null || props.product.price === undefined) {
    return 'Call for Price';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(props.product.price);
});
</script>
