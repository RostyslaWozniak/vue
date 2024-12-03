<script setup lang="ts">
import { defineProps } from "vue";
import { RouterLink } from "vue-router";

defineProps({
  path: { type: String, required: true },
});
</script>

<template>
  <section>
    <div class="container m-auto px-6 py-6">
      <RouterLink
        :to="path"
        class="flex items-center text-green-500 hover:text-green-600"
      >
        <i class="pi pi-arrow-circle-left mr-2"></i> Back to Job Listings
      </RouterLink>
    </div>
  </section>
</template>
