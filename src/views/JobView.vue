<script setup lang="ts">
import axios, { AxiosError } from "axios";
import { reactive, onMounted } from "vue";
import { useRouter, RouterLink, useRoute } from "vue-router";
import { wait } from "@/utils/wait";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import BackButton from "@/components/BackButton.vue";
import { useToast } from "vue-toastification";
import type { Job } from "@/types";

type State = {
  job: Job | null;
  isLoading: boolean;
};

const toast = useToast();

const router = useRouter();

// get id from url
const route = useRoute();
const jobId = route.params.id;

const state: State = reactive({
  job: null,
  isLoading: true,
});

async function deleteJob() {
  try {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (!confirm) return;
    await axios.delete(`/api/jobs/${jobId}`);
    toast.success("Job deleted successfully");
    router.push("/jobs");
  } catch (err) {
    toast.error("Failed to delete job");
    console.error("Error deliting job: ", (err as Error).message);
  }
}

onMounted(async () => {
  try {
    await wait();
    const { data } = await axios.get(`/api/jobs/${jobId}`);
    state.job = data;
  } catch (err) {
    if ((err as AxiosError).status === 404) {
      router.push(`/not-found?job-id=${jobId}`);
    }
    console.error("Error fetching job: ", (err as Error).message);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <BackButton path="/jobs" />
  <section class="bg-green-50">
    <div class="container m-auto px-6 py-10">
      <div v-if="state.isLoading" class="text-center text-gray-500">
        <PulseLoader />
      </div>
      <div
        v-if="state.job"
        class="grid w-full grid-cols-1 gap-6 md:grid-cols-70/30"
      >
        <main>
          <div
            class="rounded-lg bg-white p-6 text-center shadow-md md:text-left"
          >
            <div class="mb-4 text-gray-500">{{ state.job.type }}</div>
            <h1 class="mb-4 text-3xl font-bold">{{ state.job.title }}</h1>
            <div
              class="align-center mb-4 flex justify-center gap-4 text-gray-500 md:justify-start"
            >
              <i class="pi pi-map-marker text-2xl text-orange-700"></i>
              <p class="text-orange-700">{{ state.job.location }}</p>
            </div>
          </div>

          <div class="mt-6 rounded-lg bg-white p-6 shadow-md">
            <h3 class="mb-6 text-lg font-bold text-green-800">
              Job Description
            </h3>

            <p class="mb-4">
              {{ state.job.description }}
            </p>

            <h3 class="mb-2 text-lg font-bold text-green-800">Salary</h3>

            <p class="mb-4">{{ state.job.salary }} / Year</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside>
          <!-- Company Info -->
          <div class="rounded-lg bg-white p-6 shadow-md">
            <h3 class="mb-6 text-xl font-bold">Company Info</h3>

            <h2 class="text-2xl">{{ state.job.company.name }}</h2>

            <p class="my-2">
              {{ state.job.company.description }}
            </p>

            <hr class="my-4" />

            <h3 class="text-xl">Contact Email:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">
              {{ state.job.company.contactEmail }}
            </p>

            <h3 class="text-xl">Contact Phone:</h3>

            <p class="my-2 bg-green-100 p-2 font-bold">
              {{ state.job.company.contactPhone }}
            </p>
          </div>

          <!-- Manage -->
          <div class="mt-6 rounded-lg bg-white p-6 shadow-md">
            <h3 class="mb-6 text-xl font-bold">Manage Job</h3>
            <RouterLink
              :to="`/jobs/edit/${jobId}`"
              class="focus:shadow-outline mt-4 block w-full rounded-full bg-green-500 px-4 py-2 text-center font-bold text-white hover:bg-green-600 focus:outline-none"
              >Edit Job</RouterLink
            >
            <button
              @click="deleteJob"
              class="focus:shadow-outline mt-4 block w-full rounded-full bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600 focus:outline-none"
            >
              Delete Job
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>
