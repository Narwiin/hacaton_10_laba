<template>
  <div class="bg-[#120825]/80 backdrop-blur-xl border border-indigo-700/40 p-6 rounded-2xl shadow-xl">
    <h2 class="text-xl text-white mb-4 font-semibold">Сравнение водоёмов</h2>

    <div class="grid grid-cols-2 gap-4">
      <div v-for="lake in lakes" :key="lake.id" class="p-4 bg-white/5 rounded-xl border border-white/10">
        <h3 class="text-indigo-200 font-medium mb-2">{{ lake.name }}</h3>

        <p>🌡 Температура: <span class="text-white">{{ lake.temp }}°C</span></p>
        <p>💧 Кислород: <span class="text-white">{{ lake.oxygen }} mg/L</span></p>
        <p>🧪 Загрязнение: <span :class="colorClass(lake.pollution)">{{ lake.pollution }}%</span></p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  lakes: Array
})

function colorClass(v) {
  return v > 70 ? "text-red-400" : v > 40 ? "text-yellow-400" : "text-green-400"
}
</script>
