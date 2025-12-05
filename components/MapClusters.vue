<template>
  <!-- client-only, потому что Leaflet использует window/document -->
  <client-only>
    <div ref="mapContainer" class="w-full h-full" />
  </client-only>
</template>

<script setup>
import { onMounted, ref, watch, onBeforeUnmount } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css' // на всякий — но мы уже добавили в nuxt.config.ts

const props = defineProps({
  // Ожидаем массив объектов: { id, name, lat, lng, type, level }
  points: {
    type: Array,
    default: () => []
  },
  center: {
    type: Object,
    default: () => ({ lat: 54.8766, lng: 69.1606 }) // Petropavl как пример
  },
  zoom: {
    type: Number,
    default: 11
  }
})

const mapContainer = ref(null)
let map = null
let markersLayer = null
let markerCluster = null
let markerIcon = null

onMounted( async () => {
  // Динамически импортируем плагин — чтобы не ломалось на SSR
  const MarkerCluster = (await import('leaflet.markercluster')).default

  // Иконка (фикс для иконок Leaflet при билдe)
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  })

  map = L.map(mapContainer.value).setView([props.center.lat, props.center.lng], props.zoom)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  // создаём кластер
  markerCluster = MarkerCluster()

  // функция создания маркера
  const createMarker = (p) => {
    const m = L.marker([p.lat, p.lng])
    m.bindTooltip(p.name || 'Водоём')
    m.bindPopup(`<strong>${p.name || 'Водоём'}</strong><br/>Тип: ${p.type || '—'}<br/>Уровень: ${p.level || '—'}`)
    return m
  }

  // добавляем все маркеры
  props.points.forEach(p => {
    markerCluster.addLayer(createMarker(p))
  })

  markerCluster.addTo(map)
  markersLayer = markerCluster

  // контрол для зума по кластеру — поставим по центру
  L.control.scale().addTo(map)
})

// реактивное обновление точек
watch(() => props.points, (newPoints) => {
  if (!markerCluster || !map) return
  markerCluster.clearLayers()
  newPoints.forEach(p => {
    const m = L.marker([p.lat, p.lng])
    m.bindTooltip(p.name || 'Водоём')
    m.bindPopup(`<strong>${p.name || 'Водоём'}</strong><br/>Тип: ${p.type || '—'}<br/>Уровень: ${p.level || '—'}`)
    markerCluster.addLayer(m)
  })
})

onBeforeUnmount(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<style scoped>
/* контейнер обязательно задаёт высоту */
div[ref="mapContainer"] {
  width: 100%;
  height: 100%;
}
</style>
