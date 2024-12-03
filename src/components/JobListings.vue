<script setup lang="ts">
import { reactive, defineProps, onMounted } from "vue";
import axios from "axios";
import { RouterLink } from "vue-router";
import JobListing from "@/components/JobListing.vue";
import { wait } from "@/utils/wait";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import type { Job } from "@/types";

type State = {
  jobs: Job[];
  isLoading: boolean;
};

defineProps({
  limit: Number,
  showBtn: {
    type: Boolean,
    default: false,
  },
});
const state: State = reactive({
  jobs: [],
  isLoading: true,
});

onMounted(async () => {
  try {
    await wait();
    const { data } = await axios.get("/api/jobs");
    state.jobs = data;
  } catch (err) {
    console.error((err as Error).message);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl mx-auto lg:container">
      <h2 class="mb-6 text-center text-3xl font-bold text-green-500">
        Browse Jobs
      </h2>
      <div v-if="state.isLoading" class="text-center text-gray-500">
        <PulseLoader />
      </div>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <JobListing
          v-for="job in state.jobs.slice(0, limit ?? state.jobs.length)"
          :key="job.id"
          :job="job"
        />
      </div>
    </div>
  </section>
  <section v-if="showBtn" class="m-auto my-10 max-w-lg px-6">
    <RouterLink
      to="/jobs"
      class="block rounded-xl bg-black px-6 py-4 text-center text-white hover:bg-gray-700"
      >View All Jobs</RouterLink
    >
  </section>
</template>
