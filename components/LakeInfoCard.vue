<template>
  <div
    class="absolute bottom-6 right-6 w-80 bg-[#120825]/90 backdrop-blur-xl border border-indigo-700/40 
           rounded-2xl shadow-xl p-5 text-indigo-200 animate-fade-up"
    v-if="lake"
  >
    <h2 class="text-xl font-semibold text-white">{{ lake.name }}</h2>

    <p class="mt-2 text-indigo-300 text-sm">
      Координаты: {{ lake.lat.toFixed(4) }}, {{ lake.lng.toFixed(4) }}
    </p>

    <div class="mt-4 space-y-2">
      <p>🌡 Температура: <span class="text-white">{{ lake.temp }}°C</span></p>
      <p>🧪 Загрязнение: <span :class="colorClass(lake.pollution)">{{ lake.pollution }}%</span></p>
      <p>💧 Кислород: <span class="text-white">{{ lake.oxygen }} mg/L</span></p>
    </div>

    <button
      @click="$emit('close')"
      class="mt-5 w-full px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition"
    >
      Закрыть
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  lake: Object
})

function colorClass(value) {
  if (value < 30) return "text-green-400"
  if (value < 60) return "text-yellow-400"
  if (value < 80) return "text-orange-400"
  return "text-red-500"
}
</script>

<style scoped>
@keyframes fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-up { animation: fade-up .3s ease-out; }
</style>
