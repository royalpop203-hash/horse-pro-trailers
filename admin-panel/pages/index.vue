<template>
  <div class="flex min-h-screen bg-slate-50 font-sans">
    <!-- Sidebar -->
    <aside class="w-72 bg-brand-darkblue text-white flex flex-col h-screen sticky top-0 shadow-2xl z-20">
      <div class="p-8 pb-6 border-b border-white/10">
        <h2 class="text-2xl font-serif font-bold tracking-tight flex items-center gap-3">
          <div class="w-8 h-8 bg-brand-lightblue rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
          </div>
          Admin
        </h2>
      </div>
      <nav class="flex-1 overflow-y-auto p-4 flex flex-col gap-2 scrollbar-thin scrollbar-thumb-white/20">
        <NuxtLink to="/" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-slate-300 hover:text-white hover:bg-white/5" exact-active-class="!bg-brand-lightblue/20 !text-brand-lightblue font-semibold">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          Schema Viewer
        </NuxtLink>
        
        <div v-if="schema" class="mt-8 mb-4">
          <h3 class="text-[11px] uppercase tracking-widest text-slate-500 mb-3 px-4 font-bold">Manage Tables</h3>
          <ul class="flex flex-col gap-1.5">
            <li v-for="table in tables" :key="table">
              <NuxtLink :to="`/table/${table}`" class="flex items-center justify-between px-4 py-2.5 rounded-xl transition-all text-sm text-slate-400 hover:text-white hover:bg-white/5 group" active-class="!bg-brand-lightblue/20 !text-brand-lightblue font-medium">
                <span class="capitalize">{{ table }}</span>
                <span class="w-1.5 h-1.5 rounded-full bg-brand-lightblue opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
      <div class="p-4 mt-auto border-t border-white/10">
        <button @click="handleLogout" class="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Disconnect
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-10 overflow-y-auto max-h-screen">
      <div class="max-w-7xl mx-auto">
        <div v-if="isLoading" class="flex flex-col items-center justify-center h-[60vh] text-slate-400">
          <div class="animate-spin w-12 h-12 border-4 border-brand-lightblue border-t-transparent rounded-full mb-6"></div>
          <p class="animate-pulse font-medium tracking-wide">Introspecting Schema...</p>
        </div>
        <div v-else-if="error" class="bg-red-50/50 border border-red-100 p-8 rounded-2xl max-w-2xl mx-auto mt-12 text-center shadow-sm">
          <div class="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Connection Refused</h3>
          <p class="text-gray-600 mb-8">{{ error }}</p>
          <button @click="handleLogout" class="px-6 py-3 bg-white border border-gray-200 shadow-sm rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors">Return to Login</button>
        </div>
        <div v-else-if="schema">
          <header class="mb-12">
            <h1 class="text-4xl font-bold text-gray-900 tracking-tight mb-3">Database Schema</h1>
            <p class="text-lg text-slate-500">Connected successfully. Select a table to manage your data dynamically.</p>
          </header>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="table in tables" :key="table" class="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer" @click="router.push(`/table/${table}`)">
              <div class="flex items-start justify-between mb-4">
                <div class="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-brand-lightblue group-hover:bg-brand-lightblue/10 transition-colors">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                </div>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                  {{ Object.keys(schema.definitions[table]?.properties || {}).length }} cols
                </span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-1 capitalize tracking-tight">{{ table }}</h3>
              <p class="text-sm text-slate-500 mb-6">Manage all entries in the {{ table }} table.</p>
              
              <div class="flex items-center text-brand-lightblue font-medium text-sm group-hover:text-brand-darkblue transition-colors">
                Manage Data 
                <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAdminAuth } from '~/composables/useAdminAuth';
import { useSchema } from '~/composables/useSchema';

const router = useRouter();
const { isAuthenticated, supabaseUrl, supabaseKey, logout } = useAdminAuth();
const { schema, isLoading, error, fetchSchema } = useSchema();

const tables = computed(() => {
  if (!schema.value || !schema.value.definitions) return [];
  // Filter out internal tables or composite types if necessary
  return Object.keys(schema.value.definitions).filter(key => 
    !key.startsWith('_') && schema.value.definitions[key].type === 'object'
  ).sort();
});

onMounted(() => {
  if (!isAuthenticated.value) {
    router.push('/login');
    return;
  }
  if (!schema.value) {
    fetchSchema(supabaseUrl.value, supabaseKey.value);
  }
});

const handleLogout = () => {
  logout();
  router.push('/login');
};
</script>
