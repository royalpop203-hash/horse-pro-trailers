<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-4 font-sans relative overflow-hidden">
    <div class="absolute -top-40 -right-40 w-96 h-96 bg-brand-lightblue/10 rounded-full blur-3xl"></div>
    <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-darkblue/5 rounded-full blur-3xl"></div>

    <div class="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/50 w-full max-w-lg z-10">
      <div class="text-center mb-10">
        <div class="w-16 h-16 bg-brand-darkblue rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-brand-darkblue/20 transform -rotate-6">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <h1 class="text-3xl font-serif font-bold text-gray-900 tracking-tight">Admin Portal</h1>
        <p class="text-gray-500 mt-2 text-sm">Connect your Supabase instance securely</p>
      </div>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-6">
        <div class="space-y-1.5">
          <label class="block text-sm font-medium text-gray-700">Project URL</label>
          <input v-model="url" type="url" required class="w-full border-0 bg-gray-50/50 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-brand-lightblue transition-all shadow-inner placeholder-gray-400" placeholder="https://xyz.supabase.co" />
        </div>
        <div class="space-y-1.5">
          <label class="block text-sm font-medium text-gray-700">Service Role Key</label>
          <input v-model="key" type="password" required class="w-full border-0 bg-gray-50/50 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-brand-lightblue transition-all shadow-inner placeholder-gray-400" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." />
        </div>
        <div class="space-y-1.5">
          <label class="block text-sm font-medium text-gray-700">Web App URL</label>
          <input v-model="appUrl" type="url" required class="w-full border-0 bg-gray-50/50 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-brand-lightblue transition-all shadow-inner placeholder-gray-400" placeholder="https://horseprotrailersltd.com" />
        </div>

        <button type="submit" class="mt-4 bg-brand-darkblue text-white w-full py-4 rounded-xl font-medium tracking-wide hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md">
          Connect
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAdminAuth } from '~/composables/useAdminAuth';

const url = ref('');
const key = ref('');
const appUrl = ref('');
const router = useRouter();
const { login } = useAdminAuth();

const handleLogin = () => {
  login(url.value, key.value, appUrl.value);
  router.push('/');
};
</script>
