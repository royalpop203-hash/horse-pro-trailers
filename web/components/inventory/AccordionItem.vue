<template>
  <div class="border border-gray-300 rounded-md bg-white mb-2 overflow-hidden">
    <button 
      @click="isOpen = !isOpen" 
      class="w-full flex items-center justify-between py-3 px-4 bg-white hover:bg-gray-50 transition-colors"
    >
      <div class="flex items-center">
        <span class="text-[13px] font-bold text-gray-800 tracking-wider uppercase">
          {{ title }}
        </span>
        <span v-if="count" class="ml-2 text-gray-400 font-normal text-[13px]">{{ count }}</span>
      </div>
      <!-- Chevron Icon -->
      <svg 
        :class="{'rotate-180': isOpen}" 
        class="w-4 h-4 text-gray-400 transition-transform duration-200" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div v-show="isOpen" class="px-4 pb-4">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  count: {
    type: [Number, String],
    default: ''
  },
  defaultOpen: {
    type: Boolean,
    default: false
  }
});

const isOpen = ref(props.defaultOpen);
</script>
