<template>
  <header class="relative z-50">
    <!-- Bar 1: Top Notification Marquee -->
    <div class="bg-brand-red overflow-hidden relative border-b border-black/15 flex items-center min-h-[37px] font-sans">
      <div class="whitespace-nowrap py-2 text-[13px] sm:text-[15px] text-white animate-marquee inline-block w-full font-extrabold uppercase tracking-[1px] leading-[1.3em]">
        <span>Summer Shows. Weekend Rides. Family Adventures. We have something for everyone with over 50 trailers in stock!!</span>
      </div>
    </div>

    <!-- Bar 2: Main Navigation Bar -->
    <div class="bg-black/80 shadow-[0px_12px_18px_-6px_rgba(0,0,0,0.1)] font-sans">
      <div class="max-w-[1440px] mx-auto px-4 xl:px-8">
        <!-- Desktop Nav -->
        <div class="hidden lg:flex items-center justify-between py-4">
          <!-- Left: Logo & Menus -->
          <div class="flex items-center w-[85%] justify-between pr-4">
            <NuxtLink to="/" class="shrink-0 w-[220px] max-w-full hover:opacity-80 transition-opacity">
              <img src="/images/logo.png" alt="Horse Pro Trailers" class="h-auto w-full" />
            </NuxtLink>

            <nav class="flex items-center space-x-6 text-white text-[12px] font-serif font-bold uppercase">
              <NuxtLink to="/" class="hover:text-brand-yellow transition-colors">Home</NuxtLink>
              
              <!-- Inventory Dropdown -->
              <div class="relative group">
                <NuxtLink to="/inventory" class="hover:text-brand-yellow transition-colors py-4 flex items-center gap-1">
                  Inventory
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </NuxtLink>
                <div class="absolute left-0 mt-0 w-64 bg-black/80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-xl z-50 pt-2 border-t border-black/80">
                  <ul class="py-2">
                    <li><NuxtLink to="/inventory" class="block px-4 py-2 hover:text-brand-yellow transition-colors">All Inventory</NuxtLink></li>
                    <li><NuxtLink to="/inventory?category=Horse+Trailer" class="block px-4 py-2 hover:text-brand-yellow transition-colors">Horse Trailers</NuxtLink></li>
                    <li><NuxtLink to="/inventory?search=Living" class="block px-4 py-2 hover:text-brand-yellow transition-colors">Living Quarter Trailers</NuxtLink></li>
                    <li><NuxtLink to="/inventory?category=Stock+%2F+Stock+Combo+Trailer" class="block px-4 py-2 hover:text-brand-yellow transition-colors">Livestock Trailers</NuxtLink></li>
                    <li><NuxtLink to="/inventory?condition=New" class="block px-4 py-2 hover:text-brand-yellow transition-colors">New Inventory</NuxtLink></li>
                    <li><NuxtLink to="/inventory?condition=Used" class="block px-4 py-2 hover:text-brand-yellow transition-colors">Pre-Owned Inventory</NuxtLink></li>
                    <li><NuxtLink to="/inventory?clearance=true" class="block px-4 py-2 hover:text-brand-yellow transition-colors">Clearance Inventory</NuxtLink></li>
                    <li><a href="#" class="block px-4 py-2 hover:text-brand-yellow transition-colors">Value Your Trade</a></li>
                  </ul>
                </div>
              </div>

              <!-- Brands Dropdown -->
              <div class="relative group">
                <a href="#" class="hover:text-brand-yellow transition-colors py-4 flex items-center gap-1 cursor-pointer">
                  Brands
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </a>
                <div class="absolute left-0 mt-0 w-56 bg-black/80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-xl z-50 pt-2 border-t border-black/80">
                  <ul class="py-2">
                    <li><NuxtLink to="/inventory?brand=Adam" class="block px-4 py-2 hover:text-brand-yellow transition-colors">Adam Trailers</NuxtLink></li>
                    <li><NuxtLink to="/inventory?brand=Bee" class="block px-4 py-2 hover:text-brand-yellow transition-colors">Bee Trailers</NuxtLink></li>
                    <li><NuxtLink to="/inventory?brand=4-Star" class="block px-4 py-2 hover:text-brand-yellow transition-colors">4-Star Trailers</NuxtLink></li>
                    <li><NuxtLink to="/inventory?brand=Cimarron" class="block px-4 py-2 hover:text-brand-yellow transition-colors">Cimarron Trailers</NuxtLink></li>
                    <li><NuxtLink to="/inventory?brand=Delta" class="block px-4 py-2 hover:text-brand-yellow transition-colors">Delta Trailers</NuxtLink></li>
                  </ul>
                </div>
              </div>

              <a href="#" class="hover:text-brand-yellow transition-colors">Parts</a>
              <a href="#" class="hover:text-brand-yellow transition-colors">Service</a>
              
              <!-- About Us Dropdown -->
              <div class="relative group">
                <a href="#" class="hover:text-brand-yellow transition-colors py-4 flex items-center gap-1 cursor-pointer">
                  About Us
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </a>
                <div class="absolute left-0 mt-0 w-48 bg-black/80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-xl z-50 pt-2 border-t border-black/80">
                  <ul class="py-2">
                    <li><a href="#" class="block px-4 py-2 hover:text-brand-yellow transition-colors">About Us</a></li>
                    <li><a href="#" class="block px-4 py-2 hover:text-brand-yellow transition-colors">Employment</a></li>
                    <li><a href="#" class="block px-4 py-2 hover:text-brand-yellow transition-colors">Photos</a></li>
                  </ul>
                </div>
              </div>

              <a href="#" class="hover:text-brand-yellow transition-colors">Financing</a>
              <NuxtLink to="/contact-us" class="hover:text-brand-yellow transition-colors">Contact Us</NuxtLink>
            </nav>
          </div>

          <!-- Right: Buttons -->
          <div class="w-[15%] flex flex-col items-end justify-center space-y-[10px]">
            <span class="text-white text-[12px] font-serif font-bold mb-1 text-right w-full hover:text-brand-yellow transition-colors cursor-default">Gainesville, GA 30506</span>
            <a href="tel:2817796484" class="bg-brand-yellow text-black hover:text-white hover:bg-brand-darkblue border hover:border-brand-darkblue border-brand-yellow font-serif font-bold py-[10px] px-4 rounded-full transition-all duration-300 text-[14px] w-[175px] text-center">
              (281) 779-6484
            </a>
            <NuxtLink to="/inventory?clearance=true" class="bg-brand-orange text-black hover:text-white hover:bg-brand-darkblue border hover:border-brand-darkblue border-brand-orange font-serif font-bold py-[10px] px-4 rounded-full transition-all duration-300 text-[14px] w-[175px] text-center whitespace-nowrap">
              Clearance Trailers
            </NuxtLink>
          </div>
        </div>

        <!-- Mobile Nav Header -->
        <div class="lg:hidden flex items-center justify-between py-3">
          <NuxtLink to="/" class="w-[180px] hover:opacity-80 transition-opacity">
            <img src="/images/logo.png" alt="Horse Pro Trailers" class="h-auto w-full" />
          </NuxtLink>
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-white focus:outline-none p-2">
            <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-show="mobileMenuOpen" class="lg:hidden bg-black/95 border-t border-black absolute w-full z-40 shadow-2xl font-sans">
      <nav class="flex flex-col text-white font-serif font-bold uppercase text-[14px] px-4 pt-2 pb-6 space-y-1">
        <NuxtLink to="/" class="block py-3 border-b border-white/10 text-brand-yellow">Home</NuxtLink>
        <div class="py-3 border-b border-white/10">
          <div class="flex justify-between items-center" @click="toggleMobileSubmenu('inventory')">
            <span>Inventory</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform" :class="{'rotate-180': openSubmenus.inventory}" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
          </div>
          <div v-show="openSubmenus.inventory" class="pl-4 mt-2 space-y-3 text-white/80">
            <NuxtLink to="/inventory" class="block py-1 hover:text-brand-yellow">All Inventory</NuxtLink>
            <NuxtLink to="/inventory?category=Horse+Trailer" class="block py-1 hover:text-brand-yellow">Horse Trailers</NuxtLink>
            <NuxtLink to="/inventory?search=Living" class="block py-1 hover:text-brand-yellow">Living Quarter Trailers</NuxtLink>
            <NuxtLink to="/inventory?category=Stock+%2F+Stock+Combo+Trailer" class="block py-1 hover:text-brand-yellow">Livestock Trailers</NuxtLink>
            <NuxtLink to="/inventory?condition=New" class="block py-1 hover:text-brand-yellow">New Inventory</NuxtLink>
            <NuxtLink to="/inventory?condition=Used" class="block py-1 hover:text-brand-yellow">Pre-Owned Inventory</NuxtLink>
            <NuxtLink to="/inventory?clearance=true" class="block py-1 hover:text-brand-yellow">Clearance Inventory</NuxtLink>
          </div>
        </div>
        
        <div class="py-3 border-b border-white/10">
          <div class="flex justify-between items-center" @click="toggleMobileSubmenu('brands')">
            <span>Brands</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform" :class="{'rotate-180': openSubmenus.brands}" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
          </div>
          <div v-show="openSubmenus.brands" class="pl-4 mt-2 space-y-3 text-white/80">
            <NuxtLink to="/inventory?brand=Adam" class="block py-1 hover:text-brand-yellow">Adam Trailers</NuxtLink>
            <NuxtLink to="/inventory?brand=Bee" class="block py-1 hover:text-brand-yellow">Bee Trailers</NuxtLink>
            <NuxtLink to="/inventory?brand=4-Star" class="block py-1 hover:text-brand-yellow">4-Star Trailers</NuxtLink>
            <NuxtLink to="/inventory?brand=Cimarron" class="block py-1 hover:text-brand-yellow">Cimarron Trailers</NuxtLink>
            <NuxtLink to="/inventory?brand=Delta" class="block py-1 hover:text-brand-yellow">Delta Trailers</NuxtLink>
          </div>
        </div>

        <a href="#" class="block py-3 border-b border-white/10 hover:text-brand-yellow">Parts</a>
        <a href="#" class="block py-3 border-b border-white/10 hover:text-brand-yellow">Service</a>
        
        <div class="py-3 border-b border-white/10">
          <div class="flex justify-between items-center" @click="toggleMobileSubmenu('about')">
            <span>About Us</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform" :class="{'rotate-180': openSubmenus.about}" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
          </div>
          <div v-show="openSubmenus.about" class="pl-4 mt-2 space-y-3 text-white/80">
            <a href="#" class="block py-1 hover:text-brand-yellow">About Us</a>
            <a href="#" class="block py-1 hover:text-brand-yellow">Employment</a>
            <a href="#" class="block py-1 hover:text-brand-yellow">Photos</a>
          </div>
        </div>

        <a href="#" class="block py-3 border-b border-white/10 hover:text-brand-yellow">Financing</a>
        <NuxtLink to="/contact-us" class="block py-3 border-b border-white/10 hover:text-brand-yellow">Contact Us</NuxtLink>
        
        <div class="pt-6 space-y-3">
          <span class="text-white text-[12px] font-bold block text-center w-full">Gainesville, GA 30506</span>
          <a href="tel:2817796484" class="bg-brand-yellow text-black block text-center py-3 rounded-full font-bold hover:bg-brand-darkblue hover:text-white transition-colors">(281) 779-6484</a>
          <NuxtLink to="/inventory?clearance=true" class="bg-brand-orange text-black block text-center py-3 rounded-full font-bold shadow-md hover:bg-brand-darkblue hover:text-white transition-colors">Clearance Trailers</NuxtLink>
        </div>
      </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const mobileMenuOpen = ref(false);

const openSubmenus = reactive({
  inventory: false,
  brands: false,
  about: false
});

const toggleMobileSubmenu = (menu) => {
  openSubmenus[menu] = !openSubmenus[menu];
};

// Close mobile menu on route change
watch(() => route.fullPath, () => {
  mobileMenuOpen.value = false;
  Object.keys(openSubmenus).forEach(key => openSubmenus[key] = false);
});
</script>
