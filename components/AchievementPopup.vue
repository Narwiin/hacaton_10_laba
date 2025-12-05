<template>
  <div
    v-if="visible"
    class="fixed top-6 right-6 bg-gradient-to-br from-fuchsia-600 to-indigo-600 text-white 
           px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl animate-pop"
  >
    <h3 class="font-bold text-lg">🏆 Достижение получено!</h3>
    <p class="text-sm mt-1">{{ text }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  visible: Boolean,
  text: String
})
</script>

<style scoped>
@keyframes pop {
  0% { transform: scale(.7); opacity: 0; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); }
}
.animate-pop { animation: pop .35s ease-out; }
</style>
