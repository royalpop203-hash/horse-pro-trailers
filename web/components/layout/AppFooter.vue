<template>
  <footer class="bg-gray-900 text-gray-300 py-12 border-t-4 border-brand-red">
    <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h4 class="text-xl font-heading font-bold text-white uppercase tracking-wider mb-4">Horse Pro Trailers</h4>
        <p class="text-sm font-light">
          Your trusted source for premium horse trailers in Gainesville, GA.
        </p>
      </div>
      <div>
        <h4 class="text-xl font-heading font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
        <ul class="space-y-2 text-sm font-light">
          <li><NuxtLink to="/inventory" class="hover:text-brand-red transition-colors">Inventory</NuxtLink></li>
          <li><a href="#" class="hover:text-brand-red transition-colors">Financing</a></li>
          <li><NuxtLink to="/contact-us" class="hover:text-brand-red transition-colors">Contact</NuxtLink></li>
        </ul>
      </div>
      <div>
        <h4 class="text-xl font-heading font-bold text-white uppercase tracking-wider mb-4">Contact</h4>
        <address class="not-italic text-sm font-light space-y-2">
          <p>123 Trailer Way<br/>Gainesville, GA 30501</p>
          <p>Phone: (800) 555-1234</p>
          <p>Email: sales@horseprotrailersltd.com</p>
        </address>
      </div>
    </div>
    <div class="container mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-sm text-center font-light">
      &copy; {{ new Date().getFullYear() }} Horse Pro Trailers. All rights reserved.
    </div>
  </footer>
</template>
