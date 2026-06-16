<template>
  <div class="w-full font-sans text-black">
    <!-- Sort -->
    <div class="mb-4 flex items-center space-x-3">
      <label class="text-[14px] font-bold text-gray-800">Sort:</label>
      <select 
        :value="modelValue.sort"
        @change="updateFilter('sort', $event.target.value)"
        class="border border-gray-300 rounded-sm p-1.5 text-[13px] text-gray-600 focus:outline-none bg-white flex-1"
      >
        <option value="relevance">Relevance (Default)</option>
        <option value="created_at_desc">Newest First</option>
        <option value="created_at_asc">Oldest First</option>
        <option value="price_asc">Price (Low to High)</option>
        <option value="price_desc">Price (High to Low)</option>
      </select>
    </div>

    <!-- Accordions -->
    <div class="space-y-2">
      
      <!-- Search Filter -->
      <AccordionItem title="SEARCH" :defaultOpen="true">
        <input 
          type="text" 
          placeholder="Search inventory..." 
          :value="modelValue.search"
          @input="updateFilter('search', $event.target.value)"
          class="w-full border border-gray-300 rounded-sm p-2 text-[13px] focus:outline-none focus:border-brand-darkblue"
        />
      </AccordionItem>

      <!-- Stalls Filter -->
      <AccordionItem title="STALLS" :count="modelValue.stalls || ''" :defaultOpen="true">
        <div class="space-y-2">
          <label class="flex items-center space-x-2 cursor-pointer">
            <input type="radio" name="stalls" value="" :checked="!modelValue.stalls" @change="updateFilter('stalls', '')" class="w-4 h-4 accent-brand-darkblue" />
            <span class="text-[13px]">All</span>
          </label>
          <label v-for="stall in ['1', '2', '3', '4', '5', '6+']" :key="stall" class="flex items-center space-x-2 cursor-pointer">
            <input type="radio" name="stalls" :value="stall" :checked="modelValue.stalls === stall" @change="updateFilter('stalls', stall)" class="w-4 h-4 accent-brand-darkblue" />
            <span class="text-[13px]">{{ stall }}</span>
          </label>
        </div>
      </AccordionItem>

      <!-- Pull Type Filter -->
      <AccordionItem title="PULL TYPE" :count="modelValue.pull_type || ''" :defaultOpen="true">
        <div class="space-y-2">
          <label class="flex items-center space-x-2 cursor-pointer">
            <input type="radio" name="pull_type" value="" :checked="!modelValue.pull_type" @change="updateFilter('pull_type', '')" class="w-4 h-4 accent-brand-darkblue" />
            <span class="text-[13px]">All</span>
          </label>
          <label v-for="pt in ['Bumper Pull', 'Gooseneck']" :key="pt" class="flex items-center space-x-2 cursor-pointer">
            <input type="radio" name="pull_type" :value="pt" :checked="modelValue.pull_type === pt" @change="updateFilter('pull_type', pt)" class="w-4 h-4 accent-brand-darkblue" />
            <span class="text-[13px]">{{ pt }}</span>
          </label>
        </div>
      </AccordionItem>

      <!-- Condition Filter -->
      <AccordionItem title="CONDITION" :count="modelValue.condition ? '1' : ''" :defaultOpen="true">
        <div class="space-y-2">
          <label class="flex items-center space-x-2 cursor-pointer">
            <input type="radio" name="condition" value="" :checked="!modelValue.condition" @change="updateFilter('condition', '')" class="w-4 h-4 accent-brand-darkblue" />
            <span class="text-[13px]">All</span>
          </label>
          <label v-for="cond in ['New', 'Used', 'Consignment']" :key="cond" class="flex items-center space-x-2 cursor-pointer">
            <input type="radio" name="condition" :value="cond" :checked="modelValue.condition === cond" @change="updateFilter('condition', cond)" class="w-4 h-4 accent-brand-darkblue" />
            <span class="text-[13px]">{{ cond }}</span>
          </label>
        </div>
      </AccordionItem>

      <!-- Length Filter -->
      <AccordionItem title="LENGTH" :count="modelValue.length || ''" :defaultOpen="false">
        <div class="space-y-2">
          <!-- Add length options if available in schema -->
        </div>
      </AccordionItem>

      <!-- GVWR Filter -->
      <AccordionItem title="GVWR" :count="modelValue.gvwr || ''" :defaultOpen="false">
        <div class="space-y-2">
        </div>
      </AccordionItem>

      <!-- Payload Capacity Filter -->
      <AccordionItem title="PAYLOAD CAPACITY" :count="modelValue.payload || ''" :defaultOpen="false">
        <div class="space-y-2">
        </div>
      </AccordionItem>

      <!-- Manufacturer Filter -->
      <AccordionItem title="MANUFACTURER" :count="modelValue.brand ? '1' : ''" :defaultOpen="false">
        <div class="space-y-2 max-h-[200px] overflow-y-auto pr-2">
          <label class="flex items-center space-x-2 cursor-pointer">
            <input type="radio" name="brand" value="" :checked="!modelValue.brand" @change="updateFilter('brand', '')" class="w-4 h-4 accent-brand-darkblue" />
            <span class="text-[13px]">All Brands</span>
          </label>
          <label v-for="brand in ['4-Star Trailers', 'Adam', 'Bee', 'Cimarron Trailers', 'Delta Trailers', 'Exiss Trailers', 'Kiefer Manufacturing', 'Merhow Trailers']" :key="brand" class="flex items-center space-x-2 cursor-pointer">
            <input type="radio" name="brand" :value="brand" :checked="modelValue.brand === brand" @change="updateFilter('brand', brand)" class="w-4 h-4 accent-brand-darkblue" />
            <span class="text-[13px]">{{ brand }}</span>
          </label>
        </div>
      </AccordionItem>
      
      <!-- Price Filter -->
      <AccordionItem title="PRICE" :count="modelValue.price ? '1' : ''" :defaultOpen="false">
        <div class="space-y-2">
        </div>
      </AccordionItem>

      <!-- Color Filter -->
      <AccordionItem title="COLOR" :count="modelValue.color ? '1' : ''" :defaultOpen="false">
        <div class="space-y-2 max-h-[200px] overflow-y-auto pr-2">
          <label class="flex items-center space-x-2 cursor-pointer">
            <input type="radio" name="color" value="" :checked="!modelValue.color" @change="updateFilter('color', '')" class="w-4 h-4 accent-brand-darkblue" />
            <span class="text-[13px]">All</span>
          </label>
          <label v-for="col in ['White', 'Black', 'Silver', 'Charcoal', 'Red']" :key="col" class="flex items-center space-x-2 cursor-pointer">
            <input type="radio" name="color" :value="col" :checked="modelValue.color === col" @change="updateFilter('color', col)" class="w-4 h-4 accent-brand-darkblue" />
            <span class="text-[13px]">{{ col }}</span>
          </label>
        </div>
      </AccordionItem>

    </div>

    <button v-if="hasActiveFilters" @click="clearFilters" class="mt-6 bg-gray-200 text-gray-800 py-2 text-[13px] font-bold w-full rounded-sm text-center hover:bg-gray-300 transition-colors">
      Clear All Filters
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import AccordionItem from '~/components/inventory/AccordionItem.vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const updateFilter = (key, value) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: value
  });
};

const hasActiveFilters = computed(() => {
  const v = props.modelValue;
  return v.condition || v.stalls || v.pull_type || v.brand || v.category || v.search || v.color;
});

const clearFilters = () => {
  emit('update:modelValue', {
    sort: 'relevance',
    search: '',
    condition: '',
    stalls: '',
    pull_type: '',
    brand: '',
    category: '',
    color: ''
  });
};
</script>
