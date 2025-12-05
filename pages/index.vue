<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0a0120] via-[#120246] to-[#000b33] text-white p-8">
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

      
      <div class="col-span-2 bg-[#1a1f3c] border border-[#4f3b78] rounded-2xl p-4 shadow-2xl">
        <div class="text-xl mb-3 font-semibold text-purple-300">Карта Петропавловска</div>

        <LMap :zoom="13" :center="coords" class="h-[400px] rounded-xl overflow-hidden shadow-lg">
          <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          
          <LMarker
            v-for="item in waterBodies"
            :key="item.id"
            :lat-lng="item.coords"
          >
            <LPopup>
              <div class="text-black">
                <b>{{ item.name }}</b><br />
                Температура: {{ item.temp }}°C <br />
                Ветер: {{ item.wind }} м/с <br />
                Влажность: {{ item.humidity }}%
              </div>
            </LPopup>
          </LMarker>
        </LMap>
      </div>

      
      <div class="space-y-6">

        
        <div class="p-6 rounded-2xl bg-gradient-to-br from-purple-700/30 to-blue-700/30 border border-purple-600/40 shadow-xl backdrop-blur-xl">
          <div class="text-lg font-semibold text-purple-300">🌡 Температура</div>
          <div class="text-4xl font-bold mt-2">{{ mainTemp }}°C</div>
          <div class="text-sm mt-1 text-gray-300">Средняя по водоёмам</div>
        </div>

        
        <div class="p-6 rounded-2xl bg-gradient-to-br from-blue-700/30 to-indigo-700/30 border border-blue-600/40 shadow-xl backdrop-blur-xl">
          <div class="text-lg font-semibold text-blue-300">💨 Скорость ветра</div>
          <div class="text-4xl font-bold mt-2">{{ mainWind }} м/с</div>
          <div class="text-sm mt-1 text-gray-300">Средняя по водоёмам</div>
        </div>

        
        <div class="p-6 rounded-2xl bg-gradient-to-br from-cyan-700/30 to-purple-700/30 border border-cyan-600/40 shadow-xl backdrop-blur-xl">
          <div class="text-lg font-semibold text-cyan-300">💧 Влажность</div>
          <div class="text-4xl font-bold mt-2">{{ mainHumidity }}%</div>
          <div class="text-sm mt-1 text-gray-300">Средняя по водоёмам</div>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

// Центр Петропавловска
const coords = ref([54.87, 69.15]);

// Демонстрационные данные
const waterBodies = ref([
  { id: 1, name: "Озеро Пёстрое", coords: [54.88, 69.17], temp: 6, wind: 5, humidity: 73 },
  { id: 2, name: "Река Ишим", coords: [54.85, 69.14], temp: 5, wind: 4, humidity: 70 },
  { id: 3, name: "Озеро Комендантское", coords: [54.90, 69.20], temp: 7, wind: 3, humidity: 76 }
]);

// Средние показатели
const mainTemp = computed(() =>
  Math.round(waterBodies.value.reduce((a, b) => a + b.temp, 0) / waterBodies.value.length)
);

const mainWind = computed(() =>
  Math.round(waterBodies.value.reduce((a, b) => a + b.wind, 0) / waterBodies.value.length)
);

const mainHumidity = computed(() =>
  Math.round(waterBodies.value.reduce((a, b) => a + b.humidity, 0) / waterBodies.value.length)
);
</script>

<style scoped>

.leaflet-container {
  background: transparent !important;
}

</style>
