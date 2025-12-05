<template>
  <div class="p-6 bg-[#120825]/80 border border-indigo-700/40 rounded-2xl shadow-xl">
    <h2 class="text-lg font-semibold text-white mb-3">Экспорт данных</h2>

    <button @click="exportJSON" class="export-btn">Экспорт JSON</button>
    <button @click="exportCSV" class="export-btn">Экспорт CSV</button>
  </div>
</template>

<script setup>
import Papa from "papaparse"

const props = defineProps({
  data: Array
})

function exportJSON() {
  const blob = new Blob([JSON.stringify(props.data, null, 2)], { type: "application/json" })
  save(blob, "export.json")
}

function exportCSV() {
  const csv = Papa.unparse(props.data)
  const blob = new Blob([csv], { type: "text/csv" })
  save(blob, "export.csv")
}

function save(blob, filename) {
  const a = document.createElement("a")
  a.href = URL.createObjectURL(blob)
  a.download = filename
  a.click()
}
</script>

<style scoped>
.export-btn {
  @apply w-full py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 
         text-indigo-200 transition mb-2;
}
</style>
