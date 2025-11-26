<template>
  <div class="h-96 rounded-lg overflow-hidden">
    <LMap :zoom="12" :center="[54.87, 69.15]" class="h-full w-full">
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      
      <LMarker 
        v-for="water in waterBodies" 
        :key="water.id" 
        :lat-lng="water.coords"
        :icon="getMarkerIcon(water.quality)"
      >
        <LPopup>
          <div class="p-2">
            <h3 class="font-bold text-lg">{{ water.name }}</h3>
            <p class="text-sm text-gray-600">Индекс качества: {{ water.quality }}%</p>
            <div class="mt-2 space-y-1">
              <p>💧 Температура: {{ water.temperature }}°C</p>
              <p>🦠 Бактерии: {{ water.bacteria }}%</p>
              <p>🎯 Прозрачность: {{ water.clarity }}%</p>
            </div>
            <button 
              @click="$router.push(`/analytics?water=${water.id}`)"
              class="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
            >
              Подробнее
            </button>
          </div>
        </LPopup>
      </LMarker>
    </LMap>
  </div>
</template>

<script setup lang="ts">
import L from 'leaflet';

interface WaterBody {
  id: string;
  name: string;
  coords: [number, number];
  quality: number;
  temperature: number;
  bacteria: number;
  clarity: number;
}

const waterBodies: WaterBody[] = [
  {
    id: '1',
    name: 'Озеро Пёстрое',
    coords: [54.88, 69.12],
    quality: 85,
    temperature: 18.5,
    bacteria: 12,
    clarity: 78
  },
  {
    id: '2', 
    name: 'Река Ишим',
    coords: [54.86, 69.18],
    quality: 65,
    temperature: 16.2,
    bacteria: 45,
    clarity: 62
  },
  // Добавь больше водоёмов...
];

const getMarkerIcon = (quality: number) => {
  const color = quality > 80 ? 'green' : quality > 60 ? 'orange' : 'red';
  return L.divIcon({
    html: `<div class="w-6 h-6 bg-${color}-500 rounded-full border-2 border-white shadow-lg"></div>`,
    className: 'water-marker',
    iconSize: [24, 24]
  });
};
</script>