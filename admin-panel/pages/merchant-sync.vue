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
          <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Merchant Sync</h1>
          <p class="text-slate-500 mt-1">Push all active inventory to Google Merchant Center.</p>
        </header>

        <div class="bg-white border border-slate-200/60 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] p-8 mb-6">
          <div class="flex items-start gap-4 mb-6">
            <div class="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-brand-lightblue shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            </div>
            <div>
              <h2 class="text-lg font-semibold text-gray-900 mb-1">Sync All Products</h2>
              <p class="text-sm text-slate-500">This will upload your entire product catalog to Google Merchant Center. Products marked as available will appear as "in stock". This may take a moment depending on how many listings you have.</p>
            </div>
          </div>

          <button @click="runSync" :disabled="isSyncing" class="flex items-center gap-2 px-8 py-3 bg-brand-darkblue text-white font-medium rounded-xl shadow-lg shadow-brand-darkblue/20 hover:bg-slate-800 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0">
            <svg v-if="isSyncing" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            {{ isSyncing ? 'Syncing…' : 'Sync Now' }}
          </button>
        </div>

        <!-- Results -->
        <div v-if="syncError" class="bg-red-50 border border-red-100 rounded-2xl p-6 text-red-600 text-sm">
          {{ syncError }}
        </div>

        <div v-if="syncResult" class="bg-white border border-slate-200/60 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] p-8">
          <div class="flex items-center gap-6 mb-6">
            <div class="text-center">
              <div class="text-3xl font-bold text-green-600">{{ syncResult.syncedCount }}</div>
              <div class="text-xs text-slate-500 font-medium uppercase tracking-wide mt-1">Synced</div>
            </div>
            <div class="w-px h-12 bg-slate-200"></div>
            <div class="text-center">
              <div class="text-3xl font-bold" :class="syncResult.failedCount > 0 ? 'text-red-500' : 'text-slate-300'">{{ syncResult.failedCount }}</div>
              <div class="text-xs text-slate-500 font-medium uppercase tracking-wide mt-1">Failed</div>
            </div>
          </div>

          <div v-if="syncResult.results && syncResult.results.length > 0">
            <button @click="showDetails = !showDetails" class="text-sm text-brand-lightblue font-medium hover:underline mb-3">
              {{ showDetails ? 'Hide' : 'Show' }} details ({{ syncResult.results.length }} products)
            </button>
            <div v-if="showDetails" class="divide-y divide-slate-100 max-h-96 overflow-y-auto rounded-xl border border-slate-100">
              <div v-for="r in syncResult.results" :key="r.id" class="flex items-center justify-between px-4 py-3 text-sm">
                <span class="text-slate-600 font-mono text-xs truncate max-w-xs">{{ r.id }}</span>
                <span :class="r.status === 'success' ? 'text-green-600 bg-green-50' : 'text-red-500 bg-red-50'" class="px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ml-3">
                  {{ r.status === 'success' ? 'OK' : r.error || 'Error' }}
                </span>
              </div>
            </div>
          </div>
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
const { isAuthenticated, webAppUrl, logout } = useAdminAuth();

const isSyncing = ref(false);
const syncError = ref(null);
const syncResult = ref(null);
const showDetails = ref(false);

onMounted(() => {
  if (!isAuthenticated.value) { router.push('/login'); }
});

const runSync = async () => {
  isSyncing.value = true;
  syncError.value = null;
  syncResult.value = null;
  showDetails.value = false;
  try {
    const base = (webAppUrl.value || '').replace(/\/$/, '');
    const res = await $fetch(`${base}/api/merchant/sync-all`, { method: 'POST' });
    syncResult.value = res;
  } catch (e) {
    syncError.value = e.message || 'Sync failed. Check the web app URL and try again.';
  } finally {
    isSyncing.value = false;
  }
};

const handleLogout = () => { logout(); router.push('/login'); };
</script>
