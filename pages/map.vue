<template>
  <div class="min-h-screen bg-[#090018] text-white p-6">

    <!-- Заголовок -->
    <h1 class="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
      🌍 Интерактивная карта водоёмов
    </h1>

    <!-- Панель фильтров -->
    <div class="flex flex-wrap justify-center gap-4 mb-6">
      <button
        v-for="f in filters"
        :key="f.value"
        @click="activeFilter = f.value"
        :class="[
          'px-6 py-2 rounded-xl text-lg font-semibold border transition',
          activeFilter === f.value
            ? 'bg-purple-600 border-purple-400 shadow-lg shadow-purple-500/40'
            : 'bg-[#12002a] border-purple-800 hover:bg-purple-800/40'
        ]"
      >
        {{ f.label }}
      </button>
    </div>

    <!-- Карта -->
    <div class="w-full h-[75vh] overflow-hidden rounded-2xl shadow-xl shadow-purple-500/30 border border-purple-700">
      <LMap :zoom="12" :center="[54.87, 69.15]" class="h-full w-full">
        <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <!-- Кластеры -->
        <LMarkerCluster>
          <LMarker
            v-for="w in filteredWaterBodies"
            :key="w.id"
            :lat-lng="w.coords"
            :icon="getMarkerIcon(w)"
          >
            <LPopup>
              <div class="p-3 text-black">
                <h2 class="font-bold text-lg">{{ w.name }}</h2>
                <p class="text-sm mt-2"><b>Температура:</b> {{ w.temperature }} °C</p>
                <p class="text-sm"><b>Ветер:</b> {{ w.wind }} м/с</p>
                <p class="text-sm"><b>Влажность:</b> {{ w.humidity }}%</p>

                <p class="mt-2 text-sm">
                  <b>Индекс чистоты:</b>
                  <span :class="{
                    'text-green-600': w.status === 'good',
                    'text-yellow-400': w.status === 'medium',
                    'text-red-500': w.status === 'danger'
                  }">
                    {{ w.statusLabel }}
                  </span>
                </p>
              </div>
            </LPopup>
          </LMarker>
        </LMarkerCluster>
      </LMap>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Leaflet
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

// MarkerCluster - правильные импорты
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

// Иконки
import L from "leaflet";

// Для кластеризации используем компонент из vue-leaflet или создаем свой
// Данные водоёмов
const waterBodies = ref([
  {
    id: 1,
    name: "Озеро Пёстрое",
    coords: [54.892, 69.165],
    temperature: 12,
    wind: 3,
    humidity: 76,
    status: "good",
    statusLabel: "Хорошая"
  },
  {
    id: 2,
    name: "Река Ишим",
    coords: [54.88, 69.10],
    temperature: 9,
    wind: 8,
    humidity: 82,
    status: "medium",
    statusLabel: "Средняя"
  },
  {
    id: 3,
    name: "Озеро Большое",
    coords: [54.89, 69.22],
    temperature: 7,
    wind: 12,
    humidity: 88,
    status: "danger",
    statusLabel: "Опасная"
  }
]);

// Фильтры
const filters = [
  { label: "Все", value: "all" },
  { label: "Хорошие", value: "good" },
  { label: "Средние", value: "medium" },
  { label: "Опасные", value: "danger" }
];

const activeFilter = ref("all");

// Фильтрация данных
const filteredWaterBodies = computed(() =>
  activeFilter.value === "all"
    ? waterBodies.value
    : waterBodies.value.filter((w) => w.status === activeFilter.value)
);

// Настройка кастомных неоновых иконок
const getMarkerIcon = (w) => {
  const color =
    w.status === "good"
      ? "#10B981" // green
      : w.status === "medium"
      ? "#F59E0B" // yellow
      : "#EF4444"; // red

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        width: 20px;
        height: 20px;
        background: ${color};
        border-radius: 50%;
        box-shadow: 0 0 12px ${color};
        border: 2px solid white;
      "></div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};
</script>

<style>
/* Исправляет белый фон Leaflet */
.leaflet-container {
  background: #090018 !important;
}
</style>
