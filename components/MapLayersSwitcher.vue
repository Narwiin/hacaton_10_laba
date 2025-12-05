<template>
  <div
    class="absolute top-4 right-4 bg-[#120825]/80 backdrop-blur-xl rounded-xl p-3 shadow-xl border border-indigo-700/40 space-y-2 w-44"
  >
    <h3 class="text-sm text-indigo-300 mb-1">Картографические слои</h3>

    <button
      v-for="layer in layers"
      :key="layer.id"
      @click="$emit('changeLayer', layer.id)"
      class="w-full p-2 rounded-lg text-sm transition 
             bg-white/5 hover:bg-white/10 border border-white/10 text-indigo-200"
    >
      {{ layer.name }}
    </button>
  </div>
</template>

<script setup>
const layers = [
  { id: "osm", name: "OpenStreetMap" },
  { id: "satellite", name: "Спутник" },
  { id: "dark", name: "Тёмная карта" }
]
</script>
