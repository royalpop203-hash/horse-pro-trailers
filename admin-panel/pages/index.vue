<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="w-64 bg-brand-darkblue text-white flex flex-col h-screen sticky top-0">
      <div class="p-6">
        <h2 class="text-2xl font-serif font-bold tracking-wider uppercase">Admin</h2>
      </div>
      <nav class="flex-1 overflow-y-auto px-4 flex flex-col gap-2">
        <NuxtLink to="/" class="block px-4 py-2 rounded transition-colors font-medium hover:bg-white/10" exact-active-class="bg-white/10">
          Schema Viewer
        </NuxtLink>
        
        <div v-if="schema" class="mt-6 mb-4">
          <h3 class="text-xs uppercase tracking-wider text-white/50 mb-2 px-4 font-bold">Tables</h3>
          <ul class="flex flex-col gap-1">
            <li v-for="table in tables" :key="table">
              <NuxtLink :to="`/table/${table}`" class="block px-4 py-2 rounded transition-colors hover:bg-white/5 text-sm" active-class="bg-white/10 font-medium">
                {{ table }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
      <div class="p-4 mt-auto border-t border-white/10">
        <button @click="handleLogout" class="w-full py-2 text-center text-sm text-white/70 hover:text-white border border-white/20 rounded transition-colors">
          Disconnect
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8 overflow-y-auto">
      <div v-if="isLoading" class="text-center py-12 text-gray-500">
        <div class="animate-spin w-8 h-8 border-4 border-brand-darkblue border-t-transparent rounded-full mx-auto mb-4"></div>
        Loading schema...
      </div>
      <div v-else-if="error" class="bg-red-50 text-red-800 p-6 rounded-md">
        <h3 class="font-bold mb-2">Connection Error</h3>
        <p>{{ error }}</p>
        <button @click="handleLogout" class="mt-4 underline text-sm">Return to Login</button>
      </div>
      <div v-else-if="schema">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Database Schema</h1>
        <p class="text-gray-500 mb-8">Successfully connected. Select a table from the sidebar to manage its data.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div v-for="table in tables" :key="table" class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 class="text-xl font-bold text-brand-darkblue mb-2 capitalize">{{ table }}</h3>
            <p class="text-sm text-gray-500 mb-4">{{ Object.keys(schema.definitions[table]?.properties || {}).length }} columns</p>
            <NuxtLink :to="`/table/${table}`" class="text-brand-lightblue font-medium hover:underline text-sm">
              Manage Data &rarr;
            </NuxtLink>
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
