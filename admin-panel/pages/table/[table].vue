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
            <li v-for="t in tablesList" :key="t">
              <NuxtLink :to="`/table/${t}`" class="block px-4 py-2 rounded transition-colors hover:bg-white/5 text-sm" active-class="bg-white/10 font-medium">
                {{ t }}
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
    <main class="flex-1 p-8 overflow-y-auto relative w-full max-w-[calc(100vw-16rem)]">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 capitalize">{{ tableName }}</h1>
        <button @click="openCreateForm" class="bg-brand-darkblue text-white px-4 py-2 rounded shadow hover:bg-opacity-90 transition-opacity font-semibold">
          + Add New
        </button>
      </div>

      <!-- Data Table -->
      <div v-if="isLoadingData" class="text-gray-500 py-8">Loading data...</div>
      <div v-else-if="errorData" class="text-red-500 py-8">{{ errorData }}</div>
      <div v-else class="bg-white border border-gray-200 rounded shadow-sm overflow-x-auto">
        <table class="w-full text-left text-sm whitespace-nowrap">
          <thead class="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th v-for="col in columns" :key="col" class="px-6 py-3 font-semibold">{{ col }}</th>
              <th class="px-6 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-if="data.length === 0">
              <td :colspan="columns.length + 1" class="px-6 py-8 text-center text-gray-500">No records found.</td>
            </tr>
            <tr v-for="row in data" :key="row.id" class="hover:bg-gray-50">
              <td v-for="col in columns" :key="col" class="px-6 py-4 max-w-xs truncate">
                {{ formatValue(row[col]) }}
              </td>
              <td class="px-6 py-4 text-right">
                <button @click="openEditForm(row)" class="text-brand-lightblue hover:underline mr-4">Edit</button>
                <button @click="deleteRow(row.id)" class="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>

    <!-- Modal Form -->
    <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" @click.self="showForm = false">
      <div class="bg-white rounded shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div class="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 class="text-xl font-bold capitalize">{{ isEditing ? 'Edit' : 'Add' }} {{ tableName }}</h2>
          <button @click="showForm = false" class="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        </div>
        <div class="p-6 overflow-y-auto flex-1">
          <form @submit.prevent="saveRecord" class="flex flex-col gap-4">
            <div v-for="col in editableColumns" :key="col">
              <label class="block text-sm font-semibold text-gray-700 mb-1 capitalize">{{ col.replace(/_/g, ' ') }}</label>
              <textarea v-if="schemaDef?.properties[col]?.type === 'string' && schemaDef?.properties[col]?.maxLength > 200" v-model="formData[col]" class="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-brand-darkblue outline-none" rows="3"></textarea>
              <input v-else-if="schemaDef?.properties[col]?.type === 'number' || schemaDef?.properties[col]?.type === 'integer'" v-model.number="formData[col]" type="number" step="any" class="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-brand-darkblue outline-none" />
              <select v-else-if="schemaDef?.properties[col]?.type === 'boolean'" v-model="formData[col]" class="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-brand-darkblue outline-none">
                <option :value="true">True</option>
                <option :value="false">False</option>
              </select>
              <input v-else v-model="formData[col]" type="text" class="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-brand-darkblue outline-none" />
            </div>
            <div class="mt-4 flex justify-end gap-2">
              <button type="button" @click="showForm = false" class="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">Cancel</button>
              <button type="submit" class="px-4 py-2 bg-brand-darkblue text-white rounded hover:bg-opacity-90">{{ isEditing ? 'Update' : 'Save' }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
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
