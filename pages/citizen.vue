<template>
  <div class="p-8 min-h-screen bg-gradient-to-br from-[#0d0b1f] via-[#120b2e] to-[#1a0f3d] text-white">

    <!-- Заголовок -->
    <h1 class="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
       Citizen Reports
    </h1>

    <!-- Форма добавления отчёта -->
    <div class="bg-[#1a1530] p-6 rounded-2xl shadow-xl border border-purple-700/40 mb-10">
      <h2 class="text-2xl font-semibold mb-4 text-purple-300">Добавить новый отчёт</h2>

      <form @submit.prevent="submitReport" class="grid gap-4">

        <input
          v-model="report.name"
          type="text"
          placeholder="Ваше имя"
          required
          class="p-3 rounded-lg bg-[#0f0a1f] border border-purple-600/40 focus:border-purple-400 outline-none"
        />

        <input
          v-model="report.location"
          type="text"
          placeholder="Локация (например: озеро Пестрое)"
          required
          class="p-3 rounded-lg bg-[#0f0a1f] border border-purple-600/40 focus:border-blue-400 outline-none"
        />

        <textarea
          v-model="report.description"
          rows="3"
          placeholder="Опишите проблему"
          required
          class="p-3 rounded-lg bg-[#0f0a1f] border border-purple-600/40 focus:border-purple-400 outline-none"
        ></textarea>

        <!-- Фото -->
        <div>
          <label class="text-purple-300">Фото (необязательно)</label>
          <input
            @change="onFileSelect"
            type="file"
            accept="image/*"
            class="mt-2 file:bg-purple-700 file:text-white file:rounded-xl file:px-4 file:py-2 file:border-0"
          />
        </div>

        <button
          type="submit"
          class="mt-3 py-3 px-5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition font-bold"
        >
          Отправить отчёт
        </button>
      </form>
    </div>

    <!-- Список отчётов -->
    <h2 class="text-3xl font-bold mb-5 text-blue-300">Последние отчёты</h2>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="r in reports"
        :key="r.id"
        class="bg-[#16112b] rounded-2xl p-5 border border-purple-700/30 shadow-lg hover:shadow-purple-700/40 transition"
      >
        <h3 class="text-xl font-semibold text-purple-300">{{ r.location }}</h3>
        <p class="text-sm text-gray-400 mt-1">Автор: {{ r.name }}</p>

        <p class="mt-3 text-gray-300">{{ r.description }}</p>

        <!-- Фото -->
        <img
          v-if="r.photo"
          :src="r.photo"
          class="w-full h-40 object-cover rounded-xl mt-4 border border-purple-600/40"
        />

        <p class="text-xs text-gray-500 mt-3">Отчёт №{{ r.id }}</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

// список всех отчётов
const reports = ref([])

// форма
const report = ref({
  name: "",
  location: "",
  description: "",
  photo: null
})

// загрузка локальных данных
onMounted(() => {
  const saved = localStorage.getItem("citizen-reports")
  if (saved) reports.value = JSON.parse(saved)
})

// загрузка фото
const onFileSelect = (e) => {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    report.value.photo = reader.result
  }
  reader.readAsDataURL(file)
}

// отправка отчёта
const submitReport = () => {

  const newReport = {
    id: Date.now(),
    ...report.value
  }

  reports.value.unshift(newReport)
  localStorage.setItem("citizen-reports", JSON.stringify(reports.value))

  // очистить форму
  report.value = { name: "", location: "", description: "", photo: null }
  alert("Отчёт успешно отправлен!")
}
</script>

<style scoped>
/* Тонкая неоновая подсветка */
input, textarea {
  transition: 0.2s;
}
input:focus, textarea:focus {
  box-shadow: 0 0 10px #7a27ff80;
}
</style>
