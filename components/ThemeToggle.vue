<template>
  <button
    class="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition"
    @click="toggle"
  >
    <span v-if="dark">🌞 Светлая тема</span>
    <span v-else>🌙 Тёмная тема</span>
  </button>
</template>

<script setup>
import { ref, watch } from "vue"

const dark = ref(true)

watch(dark, () => {
  document.documentElement.classList.toggle("dark", dark.value)
})

function toggle() {
  dark.value = !dark.value
}
</script>
