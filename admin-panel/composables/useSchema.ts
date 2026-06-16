import { useState } from '#app';

export const useSchema = () => {
  const schema = useState<any>('db-schema', () => null);
  const isLoading = useState('db-schema-loading', () => false);
  const error = useState('db-schema-error', () => null);

  const fetchSchema = async (supabaseUrl: string, supabaseKey: string) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await $fetch(`${supabaseUrl}/rest/v1/?apikey=${supabaseKey}`);
      schema.value = response;
    } catch (e: any) {
      error.value = e.message || 'Failed to fetch schema. Check credentials.';
    } finally {
      isLoading.value = false;
    }
  };

  return { schema, isLoading, error, fetchSchema };
};
