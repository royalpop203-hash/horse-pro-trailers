<template>
  <div class="bg-[#f8fafc] min-h-screen font-sans">
    
    <!-- Hero Section -->
    <div class="relative bg-[#2d3940] py-24 overflow-hidden">
      <!-- Subtle background pattern/gradient -->
      <div class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      <div class="relative max-w-[1440px] mx-auto px-4 xl:px-8 text-center">
        <h1 class="text-5xl md:text-6xl font-serif font-bold text-white tracking-wide drop-shadow-md mb-4">
          Let's Connect
        </h1>
        <p class="text-[#a0aec0] text-lg md:text-xl max-w-2xl mx-auto font-light">
          Have questions about our inventory or services? Our team is ready to help you find exactly what you need.
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-[1440px] mx-auto px-4 xl:px-8 py-20 -mt-10 relative z-10">
      <div class="flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        <!-- Left Column: Form Card -->
        <div class="w-full lg:w-3/5">
          <div class="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 md:p-12 border border-gray-100">
            <h2 class="text-3xl font-serif font-bold text-[#1a202c] mb-2">Send a Message</h2>
            <p class="text-gray-500 mb-8 font-light">Fill out the form below and we'll get back to you as soon as possible.</p>
            
            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- First Name -->
                <div class="group">
                  <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-[#2ea3f2]">First Name *</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    v-model="form.firstName"
                    required
                    class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 shadow-sm"
                    placeholder="John"
                  />
                </div>
                
                <!-- Last Name -->
                <div class="group">
                  <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-blue-500">Last Name *</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    v-model="form.lastName"
                    required
                    class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 shadow-sm"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Email -->
                <div class="group">
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-blue-500">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="form.email"
                    required
                    class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 shadow-sm"
                    placeholder="john@example.com"
                  />
                </div>

                <!-- Phone -->
                <div class="group">
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-blue-500">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    v-model="form.phone"
                    class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 shadow-sm"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <!-- Message -->
              <div class="group">
                <label for="message" class="block text-sm font-medium text-gray-700 mb-2 transition-colors group-focus-within:text-blue-500">Message *</label>
                <textarea 
                  id="message" 
                  v-model="form.message"
                  required
                  rows="4"
                  class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 resize-y shadow-sm"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <!-- Submit Button -->
              <div class="pt-2">
                <button 
                  type="submit" 
                  style="background-color: #2ea3f2; color: #ffffff; padding: 12px 40px;"
                  class="w-full md:w-auto font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#2ea3f2]/50 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2"
                  :disabled="isSubmitting"
                >
                  <span v-if="!isSubmitting">Send Message</span>
                  <span v-else>Sending...</span>
                  <svg v-if="!isSubmitting" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                  <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </button>
              </div>
              
              <!-- Status Messages -->
              <transition
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <div v-if="submitSuccess" class="p-4 rounded-xl bg-green-50 text-green-800 border border-green-200 flex items-center gap-3 mt-4">
                  <div class="bg-green-100 p-1.5 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <p class="text-sm font-medium">Thank you for getting in touch! We will get back to you shortly.</p>
                </div>
              </transition>
            </form>
          </div>
        </div>

        <!-- Right Column: Contact Details -->
        <div class="w-full lg:w-2/5 pt-8 lg:pt-12">
          <div>
            
            <!-- Phone -->
            <div class="flex items-start group" style="margin-bottom: 40px; gap: 24px;">
              <div class="w-14 h-14 rounded-2xl bg-[#2d3940]/5 text-[#2ea3f2] flex items-center justify-center shrink-0 group-hover:bg-[#2ea3f2] group-hover:text-white transition-colors duration-300 shadow-sm border border-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div style="padding-top: 4px;">
                <h5 class="text-xl font-bold text-[#1a202c] mb-2 font-serif">Phone</h5>
                <p class="text-gray-600 text-lg leading-relaxed group-hover:text-[#2ea3f2] transition-colors">(281) 779-6484</p>
              </div>
            </div>

            <!-- Email -->
            <div class="flex items-start group" style="margin-bottom: 40px; gap: 24px;">
              <div class="w-14 h-14 rounded-2xl bg-[#2d3940]/5 text-[#2ea3f2] flex items-center justify-center shrink-0 group-hover:bg-[#2ea3f2] group-hover:text-white transition-colors duration-300 shadow-sm border border-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div style="padding-top: 4px;">
                <h5 class="text-xl font-bold text-[#1a202c] mb-2 font-serif">Email</h5>
                <div class="text-gray-600 text-lg leading-relaxed flex flex-col" style="gap: 8px;">
                  <a href="mailto:brandon@horseprotrailersltd.com" class="hover:text-[#2ea3f2] transition-colors">brandon@horseprotrailersltd.com</a>
                  <a href="mailto:jeff@horseprotrailersltd.com" class="hover:text-[#2ea3f2] transition-colors">jeff@horseprotrailersltd.com</a>
                </div>
              </div>
            </div>

            <!-- Location -->
            <div class="flex items-start group" style="margin-bottom: 40px; gap: 24px;">
              <div class="w-14 h-14 rounded-2xl bg-[#2d3940]/5 text-[#2ea3f2] flex items-center justify-center shrink-0 group-hover:bg-[#2ea3f2] group-hover:text-white transition-colors duration-300 shadow-sm border border-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div style="padding-top: 4px;">
                <h5 class="text-xl font-bold text-[#1a202c] mb-2 font-serif">Location</h5>
                <p class="text-gray-600 text-lg leading-relaxed">6830 Browns Bridge Rd, <br> Gainesville, GA 30506</p>
              </div>
            </div>

            <!-- Hours -->
            <div class="flex items-start group" style="margin-bottom: 20px; gap: 24px;">
              <div class="w-14 h-14 rounded-2xl bg-[#2d3940]/5 text-[#2ea3f2] flex items-center justify-center shrink-0 group-hover:bg-[#2ea3f2] group-hover:text-white transition-colors duration-300 shadow-sm border border-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div style="padding-top: 4px; width: 100%;">
                <h5 class="text-xl font-bold text-[#1a202c] mb-3 font-serif">Hours</h5>
                <ul class="text-gray-600 text-base leading-relaxed">
                  <li class="flex justify-between" style="max-width: 280px; margin-bottom: 8px;"><span>Sunday:</span> <span>Closed</span></li>
                  <li class="flex justify-between" style="max-width: 280px; margin-bottom: 8px;"><span>Monday:</span> <span>Closed</span></li>
                  <li class="flex justify-between" style="max-width: 280px; margin-bottom: 8px;"><span>Tuesday:</span> <span>9:00 AM - 4:00 PM</span></li>
                  <li class="flex justify-between" style="max-width: 280px; margin-bottom: 8px;"><span>Wednesday:</span> <span>9:00 AM - 4:00 PM</span></li>
                  <li class="flex justify-between" style="max-width: 280px; margin-bottom: 8px;"><span>Thursday:</span> <span>9:00 AM - 4:00 PM</span></li>
                  <li class="flex justify-between" style="max-width: 280px; margin-bottom: 8px;"><span>Friday:</span> <span>9:00 AM - 4:00 PM</span></li>
                  <li class="flex justify-between font-medium text-gray-800" style="max-width: 280px;"><span>Saturday:</span> <span>9:00 AM - 2:00 PM</span></li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- Map Section -->
    <div class="w-full relative mt-8">
      <div class="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#f8fafc] to-transparent pointer-events-none z-10"></div>
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3298.048628336297!2d-84.01979232447454!3d34.24730277308425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f58c20fc751c51%3A0xe09e7ee857b5fa7d!2sHorse%20Pro%20Trailers!5e0!3m2!1sen!2sua!4v1706854338326!5m2!1sen!2sua" 
        width="100%" 
        height="400" 
        class="border-0 shadow-inner filter grayscale-[20%] contrast-[110%]"
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useHead } from '#imports'

useHead({
  title: 'Contact Us - Horse Pro Trailers'
})

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)

const submitForm = async () => {
  if (isSubmitting.value) return;
  
  isSubmitting.value = true;
  
  try {
    const response = await $fetch('/api/inquiries', {
      method: 'POST',
      body: {
        name: `${form.value.firstName} ${form.value.lastName}`.trim(),
        email: form.value.email,
        phone: form.value.phone,
        message: form.value.message,
        type: 'General'
      }
    });

    if (response.success) {
      // Reset form
      form.value = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      };
      
      submitSuccess.value = true;
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        submitSuccess.value = false;
      }, 5000);
    }
  } catch (err) {
    console.error('Failed to submit inquiry:', err);
    alert('An error occurred. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
}
</script>
