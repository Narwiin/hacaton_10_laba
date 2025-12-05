<template>
  <div class="space-y-8">

    <!-- HEADER -->
    <h1 class="text-3xl font-bold text-white">Статистика по регионам</h1>

    <!-- REGION SELECTOR -->
    <div class="bg-[#120825]/60 backdrop-blur-xl p-6 rounded-2xl border border-indigo-700/40 shadow-xl">
      <label class="block mb-2 text-indigo-300 text-sm">Выберите регион</label>

      <select
        v-model="selectedRegion"
        class="w-72 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-indigo-200 
               focus:ring-2 focus:ring-fuchsia-500/40 transition"
      >
        <option v-for="r in regions" :key="r.id" :value="r.id">
          {{ r.name }}
        </option>
      </select>
    </div>

    <!-- KEY METRICS -->
    <div class="grid lg:grid-cols-3 gap-6">

      <div class="metric-card">
        <p class="metric-label">Средняя температура</p>
        <p class="metric-value">{{ stats.temp }}°C</p>
        <p class="metric-sub">По региону</p>
      </div>

      <div class="metric-card">
        <p class="metric-label">Средний уровень кислорода</p>
        <p class="metric-value">{{ stats.oxygen }} mg/L</p>
        <p class="metric-sub">По региону</p>
      </div>

      <div class="metric-card">
        <p class="metric-label">Индекс загрязнения</p>
        <p class="metric-value">{{ stats.pollution }}%</p>
        <p class="metric-sub">По региону</p>
      </div>

    </div>

    <!-- TREND CHART -->
    <div class="bg-[#120825]/60 backdrop-blur-xl p-6 rounded-2xl border border-indigo-700/40 shadow-xl">
      <h2 class="text-xl font-semibold text-indigo-200 mb-4">Изменения качества воды</h2>

      <WaterQualityChart :data="trend" />
    </div>

    <!-- LAKE TABLE -->
    <div class="bg-[#120825]/60 backdrop-blur-xl p-6 rounded-2xl border border-indigo-700/40 shadow-xl">
      <h2 class="text-xl text-indigo-200 mb-4">Водоёмы региона</h2>

      <table class="w-full text-left text-indigo-200">
        <thead>
          <tr class="border-b border-indigo-700/40 text-indigo-300">
            <th class="py-2">Название</th>
            <th class="py-2">Темп.</th>
            <th class="py-2">Кислород</th>
            <th class="py-2">Загрязнение</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="lake in regionLakes"
            :key="lake.id"
            class="border-b border-white/5 hover:bg-white/5 transition"
          >
            <td class="py-3">{{ lake.name }}</td>
            <td>{{ lake.temp }}°C</td>
            <td>{{ lake.oxygen }} mg/L</td>
            <td :class="pollutionColor(lake.pollution)">
              {{ lake.pollution }}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MINI HEATMAP -->
    <div class="bg-[#120825]/60 backdrop-blur-xl p-6 rounded-2xl border border-indigo-700/40 shadow-xl">
      <h2 class="text-xl text-indigo-200 mb-4">Тепловая карта загрязнения</h2>

      <div class="w-full h-[380px] rounded-xl overflow-hidden">
        <WaterHeatmap :points="heatmapPoints" />
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import WaterQualityChart from "~/components/WaterQualityChart.vue"
import WaterHeatmap from "~/components/WaterHeatmap.vue"

// Mock region list
const regions = [
  { id: "sko", name: "Северо-Казахстанская область" },
  { id: "ako", name: "Акмолинская область" },
  { id: "pavlodar", name: "Павлодарская область" }
]

const selectedRegion = ref("sko")

// Fake dataset per region — replace with API request later
const regionData = {
  sko: {
    lakes: [
      { id: 1, name: "Пёстрое", temp: 12.5, oxygen: 6.2, pollution: 22, lat: 54.88, lng: 69.15 },
      { id: 2, name: "Большой Талдык", temp: 11.8, oxygen: 5.9, pollution: 30, lat: 54.90, lng: 69.17 }
    ],
    trend: [12, 14, 13, 15, 17, 16, 18, 14, 13],
  },
  ako: {
    lakes: [
      { id: 3, name: "Щучье", temp: 10.5, oxygen: 7.1, pollution: 18, lat: 52.95, lng: 70.25 }
    ],
    trend: [10, 11, 12, 13, 12, 14, 15],
  },
  pavlodar: {
    lakes: [
      { id: 4, name: "Жасыбай", temp: 14.3, oxygen: 8.0, pollution: 10, lat: 51.40, lng: 76.35 }
    ],
    trend: [14, 14.5, 15, 15.5, 14.9],
  }
}

const regionLakes = computed(() => regionData[selectedRegion.value].lakes)
const trend = computed(() => regionData[selectedRegion.value].trend)

// Summary stats
const stats = computed(() => {
  const lakes = regionLakes.value
  return {
    temp: avg(lakes.map(l => l.temp)),
    oxygen: avg(lakes.map(l => l.oxygen)),
    pollution: avg(lakes.map(l => l.pollution)),
  }
})

function avg(arr) {
  return (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1)
}

// Heatmap points formatted for WaterHeatmap.vue
const heatmapPoints = computed(() =>
  regionLakes.value.map(l => ({
    lat: l.lat,
    lng: l.lng,
    intensity: l.pollution / 100
  }))
)

function pollutionColor(v) {
  return v > 70
    ? "text-red-400"
    : v > 40
    ? "text-yellow-400"
    : "text-green-400"
}
</script>

<style scoped>
.metric-card {
  @apply p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-xl;
}
.metric-label {
  @apply text-indigo-300 text-sm mb-1;
}
.metric-value {
  @apply text-3xl font-bold text-white;
}
.metric-sub {
  @apply text-indigo-400 text-sm;
}
</style>
