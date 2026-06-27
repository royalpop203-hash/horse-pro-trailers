import { useCookie } from '#app';
import { computed } from 'vue';

export const useAdminAuth = () => {
  const supabaseUrl = useCookie('admin-supabase-url', { maxAge: 60 * 60 * 24 * 30 });
  const supabaseKey = useCookie('admin-supabase-key', { maxAge: 60 * 60 * 24 * 30 });
  const webAppUrl = useCookie('admin-webapp-url', { maxAge: 60 * 60 * 24 * 30 });

  const isAuthenticated = computed(() => !!supabaseUrl.value && !!supabaseKey.value);

  const login = (url: string, key: string, appUrl: string) => {
    supabaseUrl.value = url;
    supabaseKey.value = key;
    webAppUrl.value = appUrl;
  };

  const logout = () => {
    supabaseUrl.value = null;
    supabaseKey.value = null;
    webAppUrl.value = null;
  };

  return { supabaseUrl, supabaseKey, webAppUrl, isAuthenticated, login, logout };
};
