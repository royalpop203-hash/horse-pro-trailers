<template>
  <div class="flex min-h-screen bg-slate-50 font-sans">
    <!-- Sidebar -->
    <aside class="w-72 bg-brand-darkblue text-white flex flex-col h-screen sticky top-0 shadow-2xl z-20">
      <div class="p-8 pb-6 border-b border-white/10">
        <h2 class="text-2xl font-serif font-bold tracking-tight flex items-center gap-3">
          <div class="w-8 h-8 bg-brand-lightblue rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          Admin
        </h2>
      </div>
      <nav class="flex-1 p-4 flex flex-col gap-2">
        <NuxtLink to="/payment-methods" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-slate-300 hover:text-white hover:bg-white/5" active-class="!bg-brand-lightblue/20 !text-brand-lightblue font-semibold">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
          Payment Methods
        </NuxtLink>
        <NuxtLink to="/merchant-sync" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-slate-300 hover:text-white hover:bg-white/5" active-class="!bg-brand-lightblue/20 !text-brand-lightblue font-semibold">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          Merchant Sync
        </NuxtLink>
        <NuxtLink to="/email-notifications" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-slate-300 hover:text-white hover:bg-white/5" active-class="!bg-brand-lightblue/20 !text-brand-lightblue font-semibold">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          Email Notifications
        </NuxtLink>
      </nav>
      <div class="p-4 mt-auto border-t border-white/10">
        <button @click="handleLogout" class="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-medium text-slate-400 hover:text-red-400 bg-white/5 hover:bg-red-500/10 rounded-xl transition-all">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Disconnect
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-10 overflow-y-auto max-h-screen">
      <div class="max-w-2xl mx-auto">
        <header class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Payment Methods</h1>
            <p class="text-slate-500 mt-1">Configure how customers can send payment at checkout.</p>
          </div>
          <button @click="openAdd" class="flex items-center gap-2 px-5 py-2.5 bg-brand-darkblue text-white text-sm font-medium rounded-xl shadow-lg shadow-brand-darkblue/20 hover:bg-slate-800 transition-all hover:-translate-y-0.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            Add Method
          </button>
        </header>

        <div v-if="isLoading" class="flex items-center justify-center py-24 text-slate-400">
          <div class="animate-spin w-8 h-8 border-4 border-brand-lightblue border-t-transparent rounded-full mr-3"></div>
          Loading...
        </div>

        <div v-else-if="fetchError" class="bg-red-50 border border-red-100 rounded-2xl p-6 text-red-600">
          {{ fetchError }}
        </div>

        <div v-else-if="methods.length === 0" class="bg-white border border-slate-200/60 rounded-2xl p-12 text-center text-slate-400">
          <svg class="w-10 h-10 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
          No payment methods yet. Add one to get started.
        </div>

        <div v-else class="flex flex-col gap-4">
          <div v-for="m in methods" :key="m.id" class="bg-white border border-slate-200/60 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] p-6">
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-brand-lightblue">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">{{ m.label || m.method?.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) }}</h3>
                  <p class="text-xs text-slate-400 font-mono">{{ m.method }}</p>
                  <span
                    class="text-xs font-semibold px-2 py-0.5 rounded-full"
                    :class="m.available ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'"
                  >{{ m.available ? 'Active' : 'Inactive' }}</span>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button @click="openEdit(m)" class="p-2 text-brand-lightblue hover:text-brand-darkblue hover:bg-brand-lightblue/10 rounded-lg transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </button>
                <button @click="deleteMethod(m)" class="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3 text-sm">
              <div class="bg-slate-50 rounded-xl px-4 py-3">
                <p class="text-xs text-slate-400 font-medium mb-0.5">Recipient</p>
                <p class="text-slate-700 font-medium">{{ m.recipient_name || '—' }}</p>
              </div>
              <div class="bg-slate-50 rounded-xl px-4 py-3">
                <p class="text-xs text-slate-400 font-medium mb-0.5">Account / Identifier</p>
                <p class="text-slate-700 font-medium font-mono">{{ m.identifier || '—' }}</p>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span class="text-sm text-slate-500">Show at checkout</span>
              <button
                type="button"
                @click="toggleAvailable(m)"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
                :class="m.available ? 'bg-brand-lightblue' : 'bg-slate-200'"
              >
                <span
                  class="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform"
                  :class="m.available ? 'translate-x-6' : 'translate-x-1'"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Add / Edit Modal -->
    <transition enter-active-class="transition-opacity duration-200" leave-active-class="transition-opacity duration-150" enter-from-class="opacity-0" leave-to-class="opacity-0">
      <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4" @click.self="showForm = false">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
          <div class="px-8 py-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
            <h2 class="text-xl font-bold text-gray-900">{{ isEditing ? 'Edit Payment Method' : 'Add Payment Method' }}</h2>
            <button @click="showForm = false" class="text-slate-400 hover:text-slate-700 bg-white p-2 rounded-full shadow-sm transition-all">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          <form @submit.prevent="saveMethod" class="p-8 flex flex-col gap-5">
            <div class="space-y-1.5">
              <label class="block text-sm font-semibold text-slate-700">Method Key</label>
              <p class="text-xs text-slate-400">A unique identifier, e.g. <code class="bg-slate-100 px-1 rounded">bank_transfer</code>, <code class="bg-slate-100 px-1 rounded">zelle</code></p>
              <input v-model="formData.method" type="text" required :disabled="isEditing" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-brand-lightblue transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed" placeholder="bank_transfer" />
            </div>
            <div class="space-y-1.5">
              <label class="block text-sm font-semibold text-slate-700">Display Label</label>
              <p class="text-xs text-slate-400">What customers see at checkout, e.g. <code class="bg-slate-100 px-1 rounded">Bank Transfer</code>, <code class="bg-slate-100 px-1 rounded">Zelle</code></p>
              <input v-model="formData.label" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-brand-lightblue transition-all outline-none" placeholder="Bank Transfer" />
            </div>
            <div class="space-y-1.5">
              <label class="block text-sm font-semibold text-slate-700">Recipient Name</label>
              <input v-model="formData.recipient_name" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-brand-lightblue transition-all outline-none" placeholder="Horse Pro Trailers LLC" />
            </div>
            <div class="space-y-1.5">
              <label class="block text-sm font-semibold text-slate-700">Account / Identifier</label>
              <input v-model="formData.identifier" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-brand-lightblue transition-all outline-none" placeholder="Account number, phone, email…" />
            </div>
            <div class="flex items-center justify-between py-1">
              <div>
                <p class="text-sm font-semibold text-slate-700">Active at checkout</p>
                <p class="text-xs text-slate-400">Customers can select this method when ordering</p>
              </div>
              <button
                type="button"
                @click="formData.available = !formData.available"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                :class="formData.available ? 'bg-brand-lightblue' : 'bg-slate-200'"
              >
                <span class="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform" :class="formData.available ? 'translate-x-6' : 'translate-x-1'"></span>
              </button>
            </div>
            <p v-if="formError" class="text-red-500 text-sm">{{ formError }}</p>
            <div class="flex justify-end gap-3 pt-2 border-t border-slate-100 mt-2">
              <button type="button" @click="showForm = false" class="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">Cancel</button>
              <button type="submit" :disabled="isSaving" class="px-7 py-2.5 bg-brand-darkblue text-white text-sm font-medium rounded-xl shadow-lg shadow-brand-darkblue/20 hover:bg-slate-800 transition-all disabled:opacity-50">
                {{ isSaving ? 'Saving…' : (isEditing ? 'Save Changes' : 'Add Method') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAdminAuth } from '~/composables/useAdminAuth';

const router = useRouter();
const { isAuthenticated, supabaseUrl, supabaseKey, logout } = useAdminAuth();

const isLoading = ref(true);
const fetchError = ref(null);
const methods = ref([]);

const showForm = ref(false);
const isEditing = ref(false);
const isSaving = ref(false);
const formError = ref('');
const formData = ref({ method: '', recipient_name: '', identifier: '', available: true });

const authHeaders = () => ({
  'apikey': supabaseKey.value,
  'Authorization': `Bearer ${supabaseKey.value}`,
});

const load = async () => {
  try {
    const res = await $fetch(`${supabaseUrl.value}/rest/v1/payment_details?select=*`, {
      headers: authHeaders()
    });
    methods.value = res || [];
  } catch (e) {
    fetchError.value = e.message;
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  if (!isAuthenticated.value) { router.push('/login'); return; }
  await load();
});

const openAdd = () => {
  isEditing.value = false;
  formData.value = { method: '', label: '', recipient_name: '', identifier: '', available: true };
  formError.value = '';
  showForm.value = true;
};

const openEdit = (m) => {
  isEditing.value = true;
  formData.value = { ...m };
  formError.value = '';
  showForm.value = true;
};

const saveMethod = async () => {
  isSaving.value = true;
  formError.value = '';
  try {
    if (isEditing.value) {
      await $fetch(`${supabaseUrl.value}/rest/v1/payment_details?id=eq.${formData.value.id}`, {
        method: 'PATCH',
        headers: { ...authHeaders(), 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
        body: {
          label: formData.value.label || null,
          recipient_name: formData.value.recipient_name,
          identifier: formData.value.identifier,
          available: formData.value.available,
        },
      });
    } else {
      await $fetch(`${supabaseUrl.value}/rest/v1/payment_details`, {
        method: 'POST',
        headers: { ...authHeaders(), 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
        body: {
          method: formData.value.method,
          label: formData.value.label || null,
          recipient_name: formData.value.recipient_name,
          identifier: formData.value.identifier,
          available: formData.value.available,
        },
      });
    }
    showForm.value = false;
    await load();
  } catch (e) {
    formError.value = e.message;
  } finally {
    isSaving.value = false;
  }
};

const toggleAvailable = async (m) => {
  const updated = !m.available;
  m.available = updated;
  try {
    await $fetch(`${supabaseUrl.value}/rest/v1/payment_details?id=eq.${m.id}`, {
      method: 'PATCH',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
      body: { available: updated },
    });
  } catch (e) {
    m.available = !updated;
  }
};

const deleteMethod = async (m) => {
  if (!confirm(`Delete "${m.method?.replace(/_/g, ' ')}"? This cannot be undone.`)) return;
  try {
    await $fetch(`${supabaseUrl.value}/rest/v1/payment_details?id=eq.${m.id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    await load();
  } catch (e) {
    alert('Error deleting: ' + e.message);
  }
};

const handleLogout = () => { logout(); router.push('/login'); };
</script>
