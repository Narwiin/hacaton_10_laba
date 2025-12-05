<template>
  <div class="p-6 bg-[#120825]/80 border border-indigo-700/40 rounded-2xl shadow-xl">
    <h2 class="text-lg font-semibold text-white mb-3">Импорт данных</h2>

    <input
      type="file"
      accept=".json,.csv"
      @change="handleFile"
      class="block w-full text-indigo-200 bg-white/5 border border-white/10 py-2 px-3 rounded-xl"
    />

    <p v-if="message" class="mt-3 text-sm text-green-400">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue"

const emit = defineEmits(["import"])
const message = ref("")

function handleFile(e) {
  const file = e.target.files[0]

  if (!file) return

  if (file.name.endsWith(".json")) {
    const reader = new FileReader()
    reader.onload = () => {
      emit("import", JSON.parse(reader.result))
      message.value = "JSON успешно импортирован!"
    }
    reader.readAsText(file)
  }

  else if (file.name.endsWith(".csv")) {
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        emit("import", result.data)
        message.value = "CSV успешно импортирован!"
      }
    })
  }
}
</script>
