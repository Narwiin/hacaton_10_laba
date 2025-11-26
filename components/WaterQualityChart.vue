<template>
  <div class="h-64">
    <!-- Простой график на CSS (можно заменить на Chart.js) -->
    <div class="flex items-end justify-between h-48 space-x-2">
      <div 
        v-for="(point, index) in chartData" 
        :key="index"
        class="flex-1 flex flex-col items-center"
      >
        <div 
          class="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600"
          :style="{ height: point.value + '%' }"
        ></div>
        <span class="text-xs mt-2 text-gray-600">{{ point.label }}</span>
      </div>
    </div>
    
    <div class="flex justify-between mt-4 text-sm text-gray-600">
      <span>Неделя 1</span>
      <span>Неделя 2</span>
      <span>Неделя 3</span>
      <span>Неделя 4</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const chartData = [
  { label: 'Пн', value: 75 },
  { label: 'Вт', value: 82 },
  { label: 'Ср', value: 68 },
  { label: 'Чт', value: 79 },
  { label: 'Пт', value: 85 },
  { label: 'Сб', value: 72 },
  { label: 'Вс', value: 88 }
];
</script>