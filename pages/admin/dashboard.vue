<template>
  <div class="p-6 lg:p-10 min-h-screen text-white relative bg-gradient-to-br from-[#0a0420] via-[#120825] to-[#1a0b35]">

    <!-- BG DECOR -->
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <div class="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500/20 blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 blur-3xl"></div>
    </div>

    <div class="relative z-10 max-w-6xl mx-auto">

      <!-- HEADER -->
      <div class="flex items-center justify-between mb-10">
        <div>
          <h1 class="text-3xl font-bold text-indigo-200">Admin Dashboard</h1>
          <p class="text-indigo-300/70">Manage lakes, alerts and reports.</p>
        </div>

        <NuxtLink
          to="/admin/add-lake"
          class="px-5 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 shadow-lg shadow-fuchsia-500/30 hover:opacity-90 transition font-semibold"
        >
          + Add Lake
        </NuxtLink>
      </div>

      <!-- STATS CARDS -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div class="stat-card">
          <p class="stat-title">Total Lakes</p>
          <p class="stat-value">{{ lakes.length }}</p>
        </div>

        <div class="stat-card">
          <p class="stat-title">Active Alerts</p>
          <p class="stat-value">{{ alerts }}</p>
        </div>

        <div class="stat-card">
          <p class="stat-title">User Reports</p>
          <p class="stat-value">{{ reports }}</p>
        </div>

      </div>

      <!-- TABLE -->
      <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6">

        <h2 class="text-xl font-semibold text-indigo-200 mb-4">All Lakes</h2>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">

            <thead>
              <tr class="text-indigo-300/70 border-b border-white/10">
                <th class="table-th">Image</th>
                <th class="table-th">Name</th>
                <th class="table-th">Type</th>
                <th class="table-th">Coordinates</th>
                <th class="table-th text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr 
                v-for="lake in lakes"
                :key="lake.id"
                class="hover:bg-white/5 transition border-b border-white/5"
              >
                <td class="table-td">
                  <img 
                    :src="lake.image || defaultImg"
                    class="w-14 h-14 rounded-xl object-cover border border-white/10"
                  />
                </td>

                <td class="table-td font-medium text-indigo-200">
                  {{ lake.name }}
                </td>

                <td class="table-td text-indigo-300">
                  {{ lake.type }}
                </td>

                <td class="table-td text-indigo-300/70 text-sm">
                  {{ lake.lat }}, {{ lake.lng }}
                </td>

                <td class="table-td text-center">
                  <NuxtLink
                    :to="`/admin/edit-lake/${lake.id}`"
                    class="action-btn"
                  >
                    ✏️ Edit
                  </NuxtLink>
                </td>

              </tr>
            </tbody>

          </table>
        </div>

      </div>

    </div>

  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'

const lakes = ref([])
const alerts = ref(3)
const reports = ref(12)

const defaultImg = "/logo.png" // fallback

// Load lakes list
onMounted(async () => {
  try {
    const data = await $fetch('/api/water')
    lakes.value = data
  } catch (err) {
    console.error("Failed to load lakes:", err)
  }
})
</script>


<style scoped>
.stat-card {
  @apply p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl 
         shadow-xl text-center;
}
.stat-title {
  @apply text-indigo-300/70 text-sm mb-1;
}
.stat-value {
  @apply text-3xl font-bold text-indigo-200;
}

.table-th {
  @apply px-4 py-3 text-sm font-semibold uppercase tracking-wide;
}
.table-td {
  @apply px-4 py-4 align-middle;
}

.action-btn {
  @apply px-3 py-2 rounded-lg bg-indigo-800/40 border border-indigo-700/50 
         text-indigo-200 hover:bg-indigo-700/40 transition;
}
</style>
