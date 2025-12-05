<template>
  <div class="absolute bottom-4 left-4 bg-[#120825]/80 backdrop-blur-xl p-4 rounded-xl shadow-xl border border-indigo-700/40 w-52">
    <h3 class="text-sm text-indigo-300 mb-2">Уровень загрязнения</h3>

    <div v-for="item in list" :key="item.label" class="flex items-center space-x-2 mb-1">
      <div :style="{ background: item.color }" class="w-4 h-4 rounded-full"></div>
      <span class="text-indigo-200 text-sm">{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup>
const list = [
  { color: "#4ade80", label: "Низкий" },
  { color: "#facc15", label: "Средний" },
  { color: "#fb923c", label: "Высокий" },
  { color: "#ef4444", label: "Опасно" }
]
</script>
