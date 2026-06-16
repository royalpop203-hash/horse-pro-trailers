<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-serif font-bold text-brand-darkblue uppercase tracking-widest">Admin Portal</h1>
        <p class="text-gray-500 mt-2">Connect your Supabase instance</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Supabase Project URL</label>
          <input v-model="url" type="url" required class="w-full border border-gray-300 rounded p-3 focus:border-brand-darkblue focus:ring-1 focus:ring-brand-darkblue outline-none" placeholder="https://xyz.supabase.co" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Supabase Service Role Key</label>
          <input v-model="key" type="password" required class="w-full border border-gray-300 rounded p-3 focus:border-brand-darkblue focus:ring-1 focus:ring-brand-darkblue outline-none" placeholder="eyJh..." />
          <p class="text-xs text-gray-500 mt-1">Required for schema introspection and full access.</p>
        </div>
        
        <button type="submit" class="mt-4 bg-brand-darkblue text-white w-full py-4 uppercase font-bold tracking-wider hover:bg-opacity-90 transition-opacity rounded-sm shadow-sm">
          Connect Database
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
const router = useRouter();
const { login } = useAdminAuth();

const handleLogin = () => {
  login(url.value, key.value);
  router.push('/');
};
</script>
