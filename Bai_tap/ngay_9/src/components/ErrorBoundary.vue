<template>
  <slot v-if="!error" />
  <div v-else>Something went wrong. Please try again.</div>
</template>

<script>
export default {
  data: () => ({ error: null }),
  errorCaptured(err) {
    this.error = err;
    return false;
  },
};
</script>
