<template>
  <div class="w-full h-[70vh] rounded-lg overflow-hidden shadow-lg">
    <MapClusters :points="points" :center="center" :zoom="zoom" />
  </div>
</template>

<script setup>
import MapClusters from '@/components/MapClusters.vue'

const center = { lat: 54.8766, lng: 69.1606 } // Петропавл
const zoom = 11

// Пример данных — положи реальный список из своего JSON/DB.
// Используй координаты нескольких водоемов вокруг Петропавловска
const points = [
  { id: 1, name: 'Озеро Белое', lat: 54.8766, lng: 69.1606, type: 'Озеро', level: 'Нормальный' },
  { id: 2, name: 'Река Ишим (точка 1)', lat: 54.8840, lng: 69.1700, type: 'Река', level: 'Средний' },
  { id: 3, name: 'Пруд Урочище', lat: 54.8700, lng: 69.1500, type: 'Пруд', level: 'Низкий' },
  // добавь остальные водоёмы (можешь импортировать CSV и заполнить)
]
</script>

<style scoped>
/* при необходимости */
</style>
