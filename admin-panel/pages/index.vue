<template>
  <div></div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAdminAuth } from '~/composables/useAdminAuth';

const router = useRouter();
const { isAuthenticated } = useAdminAuth();

onMounted(() => {
  if (!isAuthenticated.value) {
    router.push('/login');
  } else {
    router.push('/payment-methods');
  }
});
</script>
