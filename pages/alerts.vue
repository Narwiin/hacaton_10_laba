<template>
  <div class="min-h-screen p-10 bg-gradient-to-br from-[#0a0018] to-[#12003a] text-white">

    <!-- Title -->
    <h1 class="text-4xl font-bold mb-6 neon-text">⚠ Система Оповещений</h1>
    <p class="text-gray-300 mb-10">Мониторинг качества воды — реальное время</p>

    <!-- Filters -->
    <div class="flex flex-wrap gap-4 mb-8">
      <button
        v-for="f in filterList"
        :key="f.id"
        @click="currentFilter = f.id"
        class="px-5 py-2 rounded-lg font-medium border transition-all"
        :class="currentFilter === f.id 
          ? 'bg-purple-600 border-purple-400 shadow-lg shadow-purple-600/40' 
          : 'bg-gray-800 border-gray-700 hover:bg-gray-700'"
      >
        {{ f.label }}
      </button>
    </div>

    <!-- Alerts List -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="alert in filteredAlerts"
        :key="alert.id"
        class="p-5 rounded-xl border shadow-md backdrop-blur bg-white/5 transition-all hover:scale-[1.02]"
        :class="{
          'border-yellow-400 shadow-yellow-500/30': alert.type === 'warning',
          'border-red-500 shadow-red-600/40': alert.type === 'danger',
          'border-blue-400 shadow-blue-500/30': alert.type === 'info'
        }"
      >
        <div class="flex justify-between items-center mb-3">
          <h2 class="text-xl font-semibold">
            {{ alert.title }}
          </h2>

          <span
            class="px-3 py-1 rounded-full text-xs font-bold"
            :class="{
              'bg-red-600': alert.type === 'danger',
              'bg-yellow-500 text-black': alert.type === 'warning',
              'bg-blue-600': alert.type === 'info'
            }"
          >
            {{ alert.type.toUpperCase() }}
          </span>
        </div>

        <p class="text-gray-300 text-sm mb-4">
          {{ alert.message }}
        </p>

        <div class="text-sm text-purple-300 flex items-center gap-1">
          📍 {{ alert.location }}
        </div>

        <div class="mt-3 text-sm text-cyan-300">
          {{ alert.parameter }}: <strong>{{ alert.value }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

/* 🔥 MOCK ALERTS — эти данные позже можно заменять API */
const alerts = ref([
  {
    id: 1,
    type: "danger",
    title: "Опасный уровень бактерий",
    message: "Наблюдается резкое повышение бактерий в воде.",
    location: "Озеро Пёстрое",
    parameter: "Бактерии",
    value: "85%"
  },
  {
    id: 2,
    type: "warning",
    title: "Низкий уровень кислорода",
    message: "Рекомендуется не купаться в данном водоёме.",
    location: "Река Ишим",
    parameter: "Кислород",
    value: "2.1 мг/л"
  },
  {
    id: 3,
    type: "info",
    title: "Плановые измерения завершены",
    message: "Данные обновлены успешно.",
    location: "Озеро Карагандык",
    parameter: "Состояние",
    value: "OK"
  },
  {
    id: 4,
    type: "danger",
    title: "Сильное загрязнение",
    message: "Обнаружено превышение тяжёлых металлов.",
    location: "Река Есиль",
    parameter: "Металлы",
    value: "34 mg/l"
  }
]);

/* 🔍 Фильтры */
const filterList = [
  { id: "all", label: "Все" },
  { id: "danger", label: "🚨 Опасные" },
  { id: "warning", label: "⚠ Предупреждения" },
  { id: "info", label: "ℹ Информация" },
];

const currentFilter = ref("all");

/* 🎯 Фильтрованные уведомления */
const filteredAlerts = computed(() => {
  if (currentFilter.value === "all") return alerts.value;
  return alerts.value.filter(a => a.type === currentFilter.value);
});
</script>

<style scoped>
.neon-text {
  text-shadow: 0 0 10px #a855f7, 0 0 20px #a855f7, 0 0 40px #6b21a8;
}
</style>
