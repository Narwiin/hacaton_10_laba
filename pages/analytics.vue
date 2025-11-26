<template>
  <div class="p-8 text-white min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#0f0f24] to-[#1a1a35]">

    <!-- Заголовок -->
    <h1 class="text-4xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
      Аналитика качества воды
    </h1>

    <!-- Фильтры -->
    <div class="flex gap-4 mb-8">
      <select v-model="selectedWater" class="px-4 py-2 bg-[#111827] text-white rounded-xl border border-purple-600">
        <option disabled value="">Выберите водоём</option>
        <option v-for="w in waterBodies" :key="w.id">{{ w.name }}</option>
      </select>

      <select v-model="selectedRange" class="px-4 py-2 bg-[#111827] text-white rounded-xl border border-purple-600">
        <option value="7">7 дней</option>
        <option value="30">30 дней</option>
        <option value="90">90 дней</option>
      </select>
    </div>

    <!-- Карточки статистики -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

      <div class="p-6 rounded-2xl bg-[#141428] border border-purple-700 shadow-lg shadow-purple-900/50">
        <p class="text-gray-400">Средняя температура</p>
        <h2 class="text-3xl font-bold text-purple-300">{{ avgTemp }}°C</h2>
      </div>

      <div class="p-6 rounded-2xl bg-[#141428] border border-blue-700 shadow-lg shadow-blue-900/50">
        <p class="text-gray-400">Уровень кислорода</p>
        <h2 class="text-3xl font-bold text-blue-300">{{ avgOxygen }} mg/L</h2>
      </div>

      <div class="p-6 rounded-2xl bg-[#141428] border border-pink-700 shadow-lg shadow-pink-900/50">
        <p class="text-gray-400">Индекс загрязнения</p>
        <h2 class="text-3xl font-bold text-pink-300">{{ pollutionIndex }}%</h2>
      </div>

    </div>

    <!-- График -->
    <div class="bg-[#141428] border border-purple-700 shadow-xl shadow-purple-900/40 p-6 rounded-2xl">
      <canvas ref="chartCanvas" height="120"></canvas>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Chart from "chart.js/auto";


const waterBodies = [
  { id: 1, name: "Озеро Пёстрое" },
  { id: 2, name: "Река Ишим" },
  { id: 3, name: "Озеро Боровое" },
  { id: 4, name: "Озеро Солёное" }
];


const selectedWater = ref("");
const selectedRange = ref(30);

const avgTemp = ref(12.5);
const avgOxygen = ref(6.2);
const pollutionIndex = ref(22);

const chartCanvas = ref(null);
let chart;


function generateData(days) {
  return Array.from({ length: days }, () => 10 + Math.random() * 10);
}


function buildChart() {
  const labels = Array.from({ length: selectedRange.value }, (_, i) => `День ${i + 1}`);
  const data = generateData(selectedRange.value);

  if (chart) chart.destroy();

  chart = new Chart(chartCanvas.value, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Температура воды",
          data,
          borderColor: "#a855f7",
          backgroundColor: "rgba(168, 85, 247, 0.2)",
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 0
        }
      ]
    },
    options: {
      plugins: {
        legend: { labels: { color: "white" } }
      },
      scales: {
        x: { ticks: { color: "#a3a3ff" } },
        y: { ticks: { color: "#a3a3ff" } }
      }
    }
  });
}


// Следим за изменениями
// ———————————————————————————————
watch([selectedWater, selectedRange], () => {
  buildChart();
});


onMounted(() => {
  selectedWater.value = waterBodies[0].name;
  buildChart();
});
</script>
