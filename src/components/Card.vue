<script setup lang="ts">
import { defineProps } from "vue";
defineProps({
  bg: {
    type: String,
    default: "bg-gray-100",
  },
});
</script>

<template>
  <div :class="`rounded-lg ${bg} p-6 shadow-md`">
    <slot></slot>
  </div>
</template>
