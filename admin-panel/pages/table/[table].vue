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
            <li v-for="t in tablesList" :key="t">
              <NuxtLink :to="`/table/${t}`" class="flex items-center justify-between px-4 py-2.5 rounded-xl transition-all text-sm text-slate-400 hover:text-white hover:bg-white/5 group" active-class="!bg-brand-lightblue/20 !text-brand-lightblue font-medium">
                <span class="capitalize">{{ t }}</span>
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
    <main class="flex-1 p-10 overflow-y-auto relative w-full max-w-[calc(100vw-18rem)]">
      <div class="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] border border-slate-200/60">
        <h1 class="text-3xl font-bold text-gray-900 capitalize tracking-tight flex items-center gap-3">
          <div class="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-brand-lightblue">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
          </div>
          {{ tableName }}
        </h1>
        <button @click="openCreateForm" class="flex items-center gap-2 bg-brand-darkblue text-white px-6 py-3 rounded-xl shadow-lg shadow-brand-darkblue/20 hover:bg-slate-800 hover:-translate-y-0.5 active:translate-y-0 transition-all font-semibold">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          Add New Entry
        </button>
      </div>

      <!-- Data Table -->
      <div v-if="isLoadingData" class="flex flex-col items-center justify-center py-32 text-slate-400">
        <div class="animate-spin w-10 h-10 border-4 border-brand-lightblue border-t-transparent rounded-full mb-4"></div>
        Fetching records...
      </div>
      <div v-else-if="errorData" class="text-red-500 py-8 text-center bg-red-50 rounded-2xl border border-red-100">
        {{ errorData }}
      </div>
      <div v-else class="bg-white border border-slate-200/60 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm whitespace-nowrap">
            <thead class="bg-slate-50/80 text-slate-500 uppercase text-xs tracking-wider border-b border-slate-200">
              <tr>
                <th v-for="col in columns" :key="col" class="px-6 py-4 font-semibold">{{ col.replace(/_/g, ' ') }}</th>
                <th class="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-if="data.length === 0">
                <td :colspan="columns.length + 1" class="px-6 py-16 text-center text-slate-400 text-base">
                  <svg class="w-12 h-12 mx-auto text-slate-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                  No records found in this table.
                </td>
              </tr>
              <tr v-for="(row, idx) in data" :key="row.id || idx" class="hover:bg-slate-50/80 transition-colors group">
                <td v-for="col in columns" :key="col" class="px-6 py-5 max-w-xs truncate text-slate-700">
                  <span v-if="typeof row[col] === 'boolean'" :class="row[col] ? 'text-green-600 bg-green-100 px-2.5 py-1 rounded-full text-xs font-semibold' : 'text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full text-xs font-semibold'">
                    {{ formatValue(row[col]) }}
                  </span>
                  <span v-else>
                    {{ formatValue(row[col]) }}
                  </span>
                </td>
                <td class="px-6 py-5 text-right space-x-3">
                  <button @click="openEditForm(row)" class="text-brand-lightblue hover:text-brand-darkblue font-medium transition-colors p-2 hover:bg-brand-lightblue/10 rounded-lg">
                    Edit
                  </button>
                  <button @click="deleteRow(row.id || row[columns[0]])" class="text-red-400 hover:text-red-600 font-medium transition-colors p-2 hover:bg-red-50 rounded-lg">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- Modal Form (Animated Overlay) -->
    <transition enter-active-class="transition-opacity duration-300" leave-active-class="transition-opacity duration-200" enter-from-class="opacity-0" leave-to-class="opacity-0">
      <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4" @click.self="showForm = false">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden transform transition-all">
          <div class="px-8 py-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
            <h2 class="text-2xl font-bold text-gray-900 tracking-tight">{{ isEditing ? 'Edit Record' : 'Create Record' }}</h2>
            <button @click="showForm = false" class="text-slate-400 hover:text-slate-700 bg-white p-2 rounded-full shadow-sm hover:shadow transition-all">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          <div class="p-8 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-200">
            <form @submit.prevent="saveRecord" class="flex flex-col gap-6">
              <div v-for="col in editableColumns" :key="col">
                <label class="block text-sm font-semibold text-slate-700 mb-2 capitalize">{{ col.replace(/_/g, ' ') }}</label>
                <textarea v-if="schemaDef?.properties[col]?.type === 'string' && schemaDef?.properties[col]?.maxLength > 200" v-model="formData[col]" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:bg-white focus:ring-2 focus:ring-brand-lightblue focus:border-brand-lightblue transition-all outline-none" rows="3"></textarea>
                <input v-else-if="schemaDef?.properties[col]?.type === 'number' || schemaDef?.properties[col]?.type === 'integer'" v-model.number="formData[col]" type="number" step="any" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:bg-white focus:ring-2 focus:ring-brand-lightblue focus:border-brand-lightblue transition-all outline-none" />
                <select v-else-if="schemaDef?.properties[col]?.type === 'boolean'" v-model="formData[col]" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:bg-white focus:ring-2 focus:ring-brand-lightblue focus:border-brand-lightblue transition-all outline-none">
                  <option :value="true">True</option>
                  <option :value="false">False</option>
                </select>
                <input v-else v-model="formData[col]" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:bg-white focus:ring-2 focus:ring-brand-lightblue focus:border-brand-lightblue transition-all outline-none" />
              </div>
              <div class="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
                <button type="button" @click="showForm = false" class="px-6 py-3 font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">Cancel</button>
                <button type="submit" class="px-8 py-3 bg-brand-darkblue text-white font-medium rounded-xl shadow-lg shadow-brand-darkblue/20 hover:bg-slate-800 transition-all hover:-translate-y-0.5 active:translate-y-0">{{ isEditing ? 'Save Changes' : 'Create Record' }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAdminAuth } from '~/composables/useAdminAuth';
import { useSchema } from '~/composables/useSchema';

const route = useRoute();
const router = useRouter();
const tableName = route.params.table;

const { isAuthenticated, supabaseUrl, supabaseKey, logout } = useAdminAuth();
const { schema, fetchSchema } = useSchema();

const tablesList = computed(() => {
  if (!schema.value || !schema.value.definitions) return [];
  return Object.keys(schema.value.definitions).filter(key => 
    !key.startsWith('_') && schema.value.definitions[key].type === 'object'
  ).sort();
});

const schemaDef = computed(() => {
  if (!schema.value || !schema.value.definitions) return null;
  return schema.value.definitions[tableName];
});

const columns = computed(() => {
  if (!schemaDef.value) return [];
  return Object.keys(schemaDef.value.properties);
});

const editableColumns = computed(() => {
  // Hide auto-generated columns like id, created_at
  return columns.value.filter(c => c !== 'id' && c !== 'created_at' && c !== 'updated_at');
});

const data = ref([]);
const isLoadingData = ref(false);
const errorData = ref(null);

const showForm = ref(false);
const isEditing = ref(false);
const formData = ref({});

const formatValue = (val) => {
  if (val === null || val === undefined) return '-';
  if (typeof val === 'boolean') return val ? 'Yes' : 'No';
  if (typeof val === 'object') return JSON.stringify(val);
  const str = String(val);
  return str.length > 50 ? str.substring(0, 50) + '...' : str;
};

const fetchData = async () => {
  isLoadingData.value = true;
  errorData.value = null;
  try {
    const res = await $fetch(`${supabaseUrl.value}/rest/v1/${tableName}?select=*`, {
      headers: {
        'apikey': supabaseKey.value,
        'Authorization': `Bearer ${supabaseKey.value}`
      }
    });
    data.value = res;
  } catch (e) {
    errorData.value = e.message;
  } finally {
    isLoadingData.value = false;
  }
};

const openCreateForm = () => {
  isEditing.value = false;
  formData.value = {};
  showForm.value = true;
};

const openEditForm = (row) => {
  isEditing.value = true;
  formData.value = { ...row };
  showForm.value = true;
};

const saveRecord = async () => {
  try {
    const method = isEditing.value ? 'PATCH' : 'POST';
    const url = isEditing.value 
      ? `${supabaseUrl.value}/rest/v1/${tableName}?id=eq.${formData.value.id}`
      : `${supabaseUrl.value}/rest/v1/${tableName}`;
    
    const payload = { ...formData.value };
    if (!isEditing.value) {
      delete payload.id;
      delete payload.created_at;
      delete payload.updated_at;
    }

    await $fetch(url, {
      method,
      headers: {
        'apikey': supabaseKey.value,
        'Authorization': `Bearer ${supabaseKey.value}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: payload
    });
    
    showForm.value = false;
    fetchData(); // reload
  } catch (e) {
    alert('Error saving record: ' + e.message);
  }
};

const deleteRow = async (id) => {
  if (!confirm('Are you sure you want to delete this record?')) return;
  try {
    await $fetch(`${supabaseUrl.value}/rest/v1/${tableName}?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        'apikey': supabaseKey.value,
        'Authorization': `Bearer ${supabaseKey.value}`
      }
    });
    fetchData();
  } catch(e) {
    alert('Error deleting record: ' + e.message);
  }
};

onMounted(async () => {
  if (!isAuthenticated.value) {
    router.push('/login');
    return;
  }
  if (!schema.value) {
    await fetchSchema(supabaseUrl.value, supabaseKey.value);
  }
  fetchData();
});

watch(() => route.params.table, () => {
  fetchData();
});

const handleLogout = () => {
  logout();
  router.push('/login');
};
</script>
