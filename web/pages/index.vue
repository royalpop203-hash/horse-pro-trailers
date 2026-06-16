<template>
  <div class="font-sans">
    
    <!-- Section 1: Hero & Quick Links -->
    <section class="relative bg-[#141414] -mt-[120px] z-10">
      <!-- Main Hero Area -->
      <div class="relative pt-[200px] pb-10 flex flex-col justify-end min-h-[500px]">
        <!-- Background Image with Overlay -->
        <div class="absolute inset-0 w-full h-full">
          <div class="absolute inset-0 bg-black/20 z-10"></div>
          <img src="/images/Horse-Pro-Trailers-Hero-Background-1-jpg.webp" alt="Hero Background" class="w-full h-full object-cover object-center" />
        </div>

        <div class="relative z-20 mb-[80px] w-full max-w-[1440px] mx-auto px-4 xl:px-8 text-left">
          <h6 class="text-[24px] font-semibold uppercase text-brand-yellow tracking-[2px] mb-2 leading-none">- GAINESVILLE, GA</h6>
          <h1 class="text-[50px] md:text-[60px] lg:text-[70px] font-serif font-bold text-white tracking-tight uppercase leading-tight" style="text-shadow: 0em 0.1em 0.1em rgba(0,0,0,0.18);">Horse Pro Trailers</h1>
        </div>
      </div>

      <!-- Quick Link Cards (Full width overlapping the bottom) -->
      <div class="relative z-20 w-full max-w-[1440px] mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 w-full pb-8">
          
          <!-- Card 1 -->
          <NuxtLink to="/inventory?category=Horse+Trailer" class="group relative flex-1 overflow-hidden flex flex-col justify-end pt-[200px] px-5 pb-[10px] cursor-pointer min-h-[300px] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.3)] hover:shadow-[0px_2px_18px_0px_#f41a1a] bg-white transition-shadow duration-300">
            <div class="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-300 z-10"></div>
            <img src="/images/Horse-Pro-Trailers-Horse-Trailers-jpg.webp" class="absolute inset-0 w-full h-full object-cover object-center z-0 transition-transform duration-500 group-hover:scale-105" />
            <div class="absolute inset-0 z-10" style="background-image: linear-gradient(180deg, rgba(43,135,218,0) 62%, #f2bb1b 100%);"></div>
            <div class="relative z-20">
              <h3 class="text-[30px] font-heading font-bold text-[#E5E4E1] group-hover:text-white transition-colors duration-300 mb-[5px] tracking-[6px] uppercase leading-tight">Horse Trailers</h3>
              <h6 class="text-[18px] font-bold text-brand-yellow group-hover:text-white transition-colors uppercase tracking-[2px] mb-0">View Inventory</h6>
            </div>
          </NuxtLink>

          <!-- Card 2 -->
          <NuxtLink to="/inventory?category=Stock+%2F+Stock+Combo+Trailer" class="group relative flex-1 overflow-hidden flex flex-col justify-end pt-[200px] px-5 pb-[10px] cursor-pointer min-h-[300px] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.3)] hover:shadow-[0px_2px_18px_0px_#f41a1a] bg-white transition-shadow duration-300">
            <div class="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-300 z-10"></div>
            <img src="/images/horsepro-livestock-bg.jpg" class="absolute inset-0 w-full h-full object-cover object-center z-0 transition-transform duration-500 group-hover:scale-105" />
            <div class="absolute inset-0 z-10" style="background-image: linear-gradient(180deg, rgba(43,135,218,0) 62%, #f2bb1b 100%);"></div>
            <div class="relative z-20">
              <h3 class="text-[30px] font-heading font-bold text-[#E5E4E1] group-hover:text-white transition-colors duration-300 mb-[5px] tracking-[6px] uppercase leading-tight">Livestock/Pen Trailers</h3>
              <h6 class="text-[18px] font-bold text-brand-yellow group-hover:text-white transition-colors uppercase tracking-[2px] mb-0">View Inventory</h6>
            </div>
          </NuxtLink>

          <!-- Card 3 -->
          <NuxtLink to="/inventory?search=Living" class="group relative flex-1 overflow-hidden flex flex-col justify-end pt-[200px] px-5 pb-[10px] cursor-pointer min-h-[300px] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.3)] hover:shadow-[0px_2px_18px_0px_#f41a1a] bg-white transition-shadow duration-300">
            <div class="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-300 z-10"></div>
            <img src="/images/Horse-Pro-Trailers-Living-Quarters-jpg.webp" class="absolute inset-0 w-full h-full object-cover object-bottom z-0 transition-transform duration-500 group-hover:scale-105" />
            <div class="absolute inset-0 z-10" style="background-image: linear-gradient(180deg, rgba(43,135,218,0) 62%, #f2bb1b 100%);"></div>
            <div class="relative z-20">
              <h3 class="text-[30px] font-heading font-bold text-[#E5E4E1] group-hover:text-white transition-colors duration-300 mb-[5px] tracking-[6px] uppercase leading-tight">Living Quarters</h3>
              <h6 class="text-[18px] font-bold text-brand-yellow group-hover:text-white transition-colors uppercase tracking-[2px] mb-0">View Inventory</h6>
            </div>
          </NuxtLink>

          <!-- Card 4 -->
          <NuxtLink to="/inventory?clearance=true" class="group relative flex-1 overflow-hidden flex flex-col justify-end pt-[200px] px-5 pb-[10px] cursor-pointer min-h-[300px] shadow-[0px_2px_18px_0px_rgba(0,0,0,0.3)] hover:shadow-[0px_2px_18px_0px_#f41a1a] bg-white transition-shadow duration-300">
            <div class="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-300 z-10"></div>
            <img src="/images/Horse-Pro-Trailers-trailers-3-jpg.webp" class="absolute inset-0 w-full h-full object-cover object-bottom z-0 transition-transform duration-500 group-hover:scale-105" />
            <div class="absolute inset-0 z-10" style="background-image: linear-gradient(180deg, rgba(43,135,218,0) 62%, #f2bb1b 100%);"></div>
            <div class="relative z-20">
              <h3 class="text-[30px] font-heading font-bold text-[#E5E4E1] group-hover:text-white transition-colors duration-300 mb-[5px] tracking-[6px] uppercase leading-tight">Clearance Inventory</h3>
              <h6 class="text-[18px] font-bold text-brand-yellow group-hover:text-white transition-colors uppercase tracking-[2px] mb-0">View Inventory</h6>
            </div>
          </NuxtLink>

        </div>
      </div>
    </section>

    <!-- Section 2: Brands Row -->
    <section class="py-12 border-t border-gray-100 bg-white">
      <div class="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-80">
          <NuxtLink to="/inventory?brand=4-Star" class="hover:opacity-100 transition-opacity">
            <img src="/images/4Star-logo.png" alt="4-Star Trailers" class="h-10 md:h-12 w-auto object-contain" />
          </NuxtLink>
          <NuxtLink to="/inventory?brand=Cimarron" class="hover:opacity-100 transition-opacity">
            <img src="/images/cimarron-logo.png" alt="Cimarron Trailers" class="h-8 md:h-10 w-auto object-contain" />
          </NuxtLink>
          <NuxtLink to="/inventory?brand=Delta" class="hover:opacity-100 transition-opacity">
            <img src="/images/delta-logo-jpg.webp" alt="Delta Trailers" class="h-12 md:h-16 w-auto object-contain" />
          </NuxtLink>
          <NuxtLink to="/inventory?brand=Merhow" class="hover:opacity-100 transition-opacity">
            <img src="/images/Merhow-logo.png" alt="Merhow Trailers" class="h-12 md:h-16 w-auto object-contain" />
          </NuxtLink>
          <NuxtLink to="/inventory?brand=Bee" class="hover:opacity-100 transition-opacity">
            <img src="/images/bee-trailers-logo.png" alt="Bee Trailers" class="h-12 md:h-16 w-auto object-contain" />
          </NuxtLink>
          <NuxtLink to="/inventory?brand=Adam" class="hover:opacity-100 transition-opacity">
            <img src="/images/adam-trailers-logo.png" alt="Adam Trailers" class="h-14 md:h-20 w-auto object-contain" />
          </NuxtLink>
          <NuxtLink to="/inventory?brand=Kiefer" class="hover:opacity-100 transition-opacity">
            <img src="/images/kiefer-logo.png" alt="Kiefer Trailers" class="h-10 md:h-12 w-auto object-contain" />
          </NuxtLink>
          <NuxtLink to="/inventory?brand=Exiss" class="hover:opacity-100 transition-opacity">
            <img src="/images/exiss.png" alt="Exiss Trailers" class="h-10 md:h-14 w-auto object-contain" />
          </NuxtLink>
          <NuxtLink to="/inventory?brand=Turnbow" class="hover:opacity-100 transition-opacity">
            <img src="/images/turnbow.png" alt="Turnbow Trailers" class="h-6 md:h-8 w-auto object-contain" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Section 3: Categories with Images -->
    <section class="py-16 bg-white">
      <div class="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <!-- Category 1 -->
          <div class="flex flex-col items-center">
            <div class="w-full mb-6 overflow-hidden">
              <img src="/images/Horse-Pro-Trailers-trailers-2-jpg.webp" alt="New Trailers" class="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 class="text-[20px] font-serif font-bold text-black mb-4">New Trailers</h3>
            <NuxtLink to="/inventory?condition=New" class="w-full text-center bg-brand-darkblue text-white hover:text-black hover:bg-brand-yellow font-serif font-bold py-2 px-6 rounded-full transition-colors text-[16px] border border-brand-darkblue hover:border-brand-yellow">
              Shop Now
            </NuxtLink>
          </div>

          <!-- Category 2 -->
          <div class="flex flex-col items-center">
            <div class="w-full mb-6 overflow-hidden">
              <img src="/images/Horse-Pro-Trailers-trailers-1-jpg.webp" alt="Used Inventory" class="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 class="text-[20px] font-serif font-bold text-black mb-4">Used Inventory</h3>
            <NuxtLink to="/inventory?condition=Used" class="w-full text-center bg-brand-darkblue text-white hover:text-black hover:bg-brand-yellow font-serif font-bold py-2 px-6 rounded-full transition-colors text-[16px] border border-brand-darkblue hover:border-brand-yellow">
              Shop Now
            </NuxtLink>
          </div>

          <!-- Category 3 -->
          <div class="flex flex-col items-center">
            <div class="w-full mb-6 overflow-hidden">
              <img src="/images/Horse-Pro-Trailers-trailers-4-jpg.webp" alt="Value Your Trade" class="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 class="text-[20px] font-serif font-bold text-black mb-4">Value Your Trade</h3>
            <NuxtLink to="/value-your-trade" class="w-full text-center bg-brand-darkblue text-white hover:text-black hover:bg-brand-yellow font-serif font-bold py-2 px-6 rounded-full transition-colors text-[16px] border border-brand-darkblue hover:border-brand-yellow">
              Apply Now
            </NuxtLink>
          </div>

          <!-- Category 4 -->
          <div class="flex flex-col items-center">
            <div class="w-full mb-6 overflow-hidden">
              <img src="/images/Horse-Pro-Trailers-trailers-3-jpg.webp" alt="On-Order Inventory" class="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 class="text-[20px] font-serif font-bold text-black mb-4">On-Order Inventory</h3>
            <NuxtLink to="/inventory?on-order=true" class="w-full text-center bg-brand-darkblue text-white hover:text-black hover:bg-brand-yellow font-serif font-bold py-2 px-6 rounded-full transition-colors text-[16px] border border-brand-darkblue hover:border-brand-yellow">
              Shop Now
            </NuxtLink>
          </div>

        </div>
      </div>
    </section>

    <!-- Section 4: Latest Arrivals -->
    <section class="py-16 bg-brand-darkblue">
      <div class="max-w-[1440px] mx-auto px-4 xl:px-8">
        <div class="text-center mb-10">
          <h2 class="text-[40px] md:text-[50px] font-serif font-bold text-white tracking-wide">Latest Arrivals</h2>
        </div>

        <!-- Carousel Slider -->
        <div 
          ref="sliderRef" 
          @scroll="handleScroll"
          class="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 scrollbar-hide scroll-smooth"
        >
          <div 
            v-for="product in latestProducts" 
            :key="product.id"
            class="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex-none snap-start"
          >
            <ProductCard :product="product" />
          </div>
        </div>

        <!-- Carousel Indicators -->
        <div class="flex justify-center mt-8 space-x-2">
          <button 
            v-for="i in numSlides" 
            :key="i"
            @click="scrollToSlide(i - 1)"
            class="w-2.5 h-2.5 rounded-full cursor-pointer transition-colors"
            :class="activeSlide === (i - 1) ? 'bg-[#829986]' : 'bg-white/50 hover:bg-white'"
          ></button>
        </div>

      </div>
    </section>

    <!-- Section 5: About Us -->
    <section class="py-20 bg-white border-t border-gray-100">
      <div class="max-w-[1440px] mx-auto px-4 xl:px-8">
        <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <!-- Left: Images -->
          <div class="w-full lg:w-1/2 flex gap-6">
            <div class="w-1/2 pt-12">
              <img src="/images/Horse-Pro-Trailers-trailers-5-jpg.webp" alt="About Us Trailer 1" class="w-full h-full object-cover object-center shadow-lg hover:scale-105 transition-transform duration-500" />
            </div>
            <div class="w-1/2 pb-12">
              <img src="/images/Horse-Pro-Trailers-trailers-6-jpg.webp" alt="About Us Trailer 2" class="w-full h-full object-cover object-center shadow-lg hover:scale-105 transition-transform duration-500" />
            </div>
          </div>

          <!-- Right: Text -->
          <div class="w-full lg:w-1/2">
            <h2 class="text-[40px] md:text-[50px] font-serif font-bold text-gray-900 mb-6 leading-tight">About Us</h2>
            <div class="text-[17px] text-gray-600 leading-relaxed font-sans mb-8 space-y-4">
              <p>
                We are a family-owned business that specializes in custom trailers without the custom price. We pride ourselves on quality trailers and the ability to help our customers match their needs. We own and haul horses on a daily basis, so we know what it takes to make a trailer convenient and safe for all your hauling needs. From a convenient weekend bumper pull to a multi-horse with all of the live-in amenities of home, let us help you find what is right for you! At Horse Pro Trailers, we are here to provide our clients with quality horse trailers that both they and their horses will enjoy. It’s why we are in business!
              </p>
              <p>
                Thank You for trusting us with all of your horse trailer needs.
              </p>
            </div>
            <NuxtLink to="/about-us" class="inline-block bg-brand-darkblue text-white font-sans font-bold uppercase tracking-[2px] py-4 px-10 hover:bg-brand-yellow hover:text-black transition-colors text-[14px]">
              Learn More
            </NuxtLink>
          </div>

        </div>
      </div>
    </section>

    <!-- Section 6: Parts & Service -->
    <section class="py-10 bg-white">
      <div class="max-w-[1440px] mx-auto px-4 xl:px-8">
        <div class="relative bg-cover bg-center py-6 lg:py-8 shadow-xl overflow-hidden rounded-sm" style="background-image: url('/images/Horse-Pro-Trailers-Hero-Background-1-jpg.webp');">
          <div class="absolute inset-0 bg-black/20"></div>
          <div class="relative flex flex-col md:flex-row max-w-5xl mx-auto px-4">
            
            <!-- Parts Department -->
            <div class="w-full md:w-1/2 p-6 lg:p-10 flex flex-col justify-center items-start text-left bg-black/60 backdrop-blur-sm border-r border-white/10">
              <h3 class="text-[24px] md:text-[30px] font-serif font-bold mb-3 text-white leading-tight tracking-wide">Parts Department</h3>
              <p class="text-[15px] md:text-[16px] leading-relaxed mb-5 max-w-lg text-gray-200 font-sans">
                Horse Pro Trailers can get you parts and accessories so you can get the most out of your 4 Star, Cimarron Trailers, Merhow, Exiss, Delta, Adam, or Kiefer Trailer. If we don't have it in stock, our knowledgeable parts staff will find it for you.
              </p>
              <NuxtLink to="/parts" class="text-brand-yellow font-sans font-bold hover:text-white transition-colors text-[15px] tracking-wide">
                Learn More
              </NuxtLink>
            </div>

            <!-- Service Department -->
            <div class="w-full md:w-1/2 p-6 lg:p-10 flex flex-col justify-center items-start text-left bg-black/60 backdrop-blur-sm">
              <h3 class="text-[24px] md:text-[30px] font-serif font-bold mb-3 text-white leading-tight tracking-wide">Service Department</h3>
              <p class="text-[15px] md:text-[16px] leading-relaxed mb-5 max-w-lg text-gray-200 font-sans">
                We are proud to provide quality service in the Gainesville area. Our highly trained technicians are dedicated to maintaining and servicing your 4 Star, Cimarron Trailers, Merhow, Exiss, Delta, Adam, or Kiefer so you can get the most out of your purchase.
              </p>
              <NuxtLink to="/service" class="text-brand-yellow font-sans font-bold hover:text-white transition-colors text-[15px] tracking-wide">
                Learn More
              </NuxtLink>
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- Section 7: Reviews -->
    <section class="relative py-24 bg-cover bg-center" style="background-image: url('/images/Untitled-Instagram-Post-1.png');">
      <div class="absolute inset-0 bg-black/80"></div>
      <div class="relative max-w-[1440px] mx-auto px-4 xl:px-8 text-center">
        <h2 class="text-[40px] md:text-[50px] font-serif font-bold text-white mb-12 leading-tight">Reviews</h2>
        <div class="max-w-6xl mx-auto min-h-[350px]">
          <iframe 
            src="https://localimpact.com/embed/v2/2y30KhKIgsH7iTkM1vvq8lC8Aj4EFd7tXKnuNnJqBcc8TDAMKv" 
            style="width: 100%; height: 350px; border: none; overflow: hidden;" 
            scrolling="no" 
            title="Reviews">
          </iframe>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { useSupabaseClient, useSeoMeta } from '#imports';
import ProductCard from '~/components/inventory/ProductCard.vue';
import { ref, onMounted } from 'vue';

useSeoMeta({
  title: 'Horse Pro Trailers | Custom & Pre-Owned Horse Trailers in Gainesville, GA',
  description: 'Shop top-quality new and used horse trailers at Horse Pro Trailers. We carry 4-Star, Cimarron, Merhow, Exiss, and more. Visit us in Gainesville, GA!',
  ogTitle: 'Horse Pro Trailers | Custom & Pre-Owned Horse Trailers',
  ogDescription: 'Shop top-quality new and used horse trailers at Horse Pro Trailers. We carry 4-Star, Cimarron, Merhow, Exiss, and more.',
  ogImage: '/images/Horse-Pro-Trailers-Hero-Background-1-jpg.webp',
  twitterCard: 'summary_large_image',
})

const supabase = useSupabaseClient();
const latestProducts = ref([]);

onMounted(async () => {
  // Fetch latest 4 products, ordering by created_at or id descending
  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      slug,
      title,
      price,
      condition,
      product_images (
        url,
        is_primary
      )
    `)
    .order('created_at', { ascending: false })
    .limit(12);

  if (data) {
    latestProducts.value = data;
  }
});

const sliderRef = ref(null);
const activeSlide = ref(0);
const cardsPerView = ref(4);

onMounted(() => {
  const updateCardsPerView = () => {
    if (window.innerWidth >= 1024) cardsPerView.value = 4;
    else if (window.innerWidth >= 640) cardsPerView.value = 2;
    else cardsPerView.value = 1;
  };
  updateCardsPerView();
  window.addEventListener('resize', updateCardsPerView);
});

const numSlides = computed(() => Math.max(1, Math.ceil(latestProducts.value.length / cardsPerView.value)));

const handleScroll = () => {
  if (!sliderRef.value) return;
  const scrollLeft = sliderRef.value.scrollLeft;
  const slideWidth = sliderRef.value.clientWidth;
  activeSlide.value = Math.round(scrollLeft / slideWidth);
};

const scrollToSlide = (index) => {
  if (!sliderRef.value) return;
  const slideWidth = sliderRef.value.clientWidth;
  sliderRef.value.scrollTo({ left: index * slideWidth, behavior: 'smooth' });
};

</script>
