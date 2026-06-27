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
        <header class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Payment Methods</h1>
          <p class="text-slate-500 mt-1">Configure bank transfer details shown to customers at checkout.</p>
        </header>

        <div v-if="isLoading" class="flex items-center justify-center py-24 text-slate-400">
          <div class="animate-spin w-8 h-8 border-4 border-brand-lightblue border-t-transparent rounded-full mr-3"></div>
          Loading...
        </div>

        <div v-else-if="error" class="bg-red-50 border border-red-100 rounded-2xl p-6 text-red-600">
          {{ error }}
        </div>

        <div v-else class="bg-white border border-slate-200/60 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] p-8">
          <form @submit.prevent="save" class="flex flex-col gap-6">
            <div v-for="field in editableFields" :key="field" class="space-y-1.5">
              <label class="block text-sm font-semibold text-slate-700 capitalize">{{ field.replace(/_/g, ' ') }}</label>
              <input v-model="formData[field]" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-brand-lightblue focus:border-brand-lightblue transition-all outline-none" />
            </div>

            <div class="flex items-center gap-4 pt-2">
              <button type="submit" :disabled="isSaving" class="px-8 py-3 bg-brand-darkblue text-white font-medium rounded-xl shadow-lg shadow-brand-darkblue/20 hover:bg-slate-800 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0">
                {{ isSaving ? 'Saving…' : 'Save Changes' }}
              </button>
              <span v-if="savedMessage" class="text-green-600 text-sm font-medium">{{ savedMessage }}</span>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAdminAuth } from '~/composables/useAdminAuth';

const router = useRouter();
const { isAuthenticated, supabaseUrl, supabaseKey, logout } = useAdminAuth();

const isLoading = ref(true);
const isSaving = ref(false);
const error = ref(null);
const savedMessage = ref('');
const formData = ref({});
const editableFields = ref([]);
const recordId = ref(null);

const authHeaders = () => ({
  'apikey': supabaseKey.value,
  'Authorization': `Bearer ${supabaseKey.value}`,
});

onMounted(async () => {
  if (!isAuthenticated.value) { router.push('/login'); return; }
  try {
    const res = await $fetch(`${supabaseUrl.value}/rest/v1/payment_details?select=*&limit=1`, {
      headers: authHeaders()
    });
    if (res && res.length > 0) {
      const row = res[0];
      recordId.value = row.id;
      editableFields.value = Object.keys(row).filter(k => !['id', 'created_at', 'updated_at'].includes(k));
      editableFields.value.forEach(f => { formData.value[f] = row[f] ?? ''; });
    }
  } catch (e) {
    error.value = e.message;
  } finally {
    isLoading.value = false;
  }
});

const save = async () => {
  isSaving.value = true;
  savedMessage.value = '';
  try {
    await $fetch(`${supabaseUrl.value}/rest/v1/payment_details?id=eq.${recordId.value}`, {
      method: 'PATCH',
      headers: { ...authHeaders(), 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
      body: formData.value,
    });
    savedMessage.value = 'Saved successfully.';
    setTimeout(() => { savedMessage.value = ''; }, 3000);
  } catch (e) {
    savedMessage.value = 'Error: ' + e.message;
  } finally {
    isSaving.value = false;
  }
};

const handleLogout = () => { logout(); router.push('/login'); };
</script>
