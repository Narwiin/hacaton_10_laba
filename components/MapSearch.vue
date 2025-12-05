<template>
  <div class="absolute top-4 left-4 bg-[#120825]/80 backdrop-blur-xl p-3 rounded-xl w-72">

    <input
      v-model="query"
      placeholder="Поиск водоёмов..."
      class="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-indigo-200 
             placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40"
    />

    <div v-if="filtered.length" class="mt-2 bg-[#0e0720]/80 rounded-lg shadow-lg overflow-hidden">
      <button
        v-for="item in filtered"
        :key="item.id"
        @click="select(item)"
        class="block w-full text-left px-3 py-2 hover:bg-white/5 text-indigo-200"
      >
        {{ item.name }}
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from "vue"

const props = defineProps({
  lakes: Array
})

const emit = defineEmits(["select"])

const query = ref("")

const filtered = computed(() =>
  props.lakes.filter(l => l.name.toLowerCase().includes(query.value.toLowerCase()))
)

function select(item) {
  emit("select", item)
  query.value = ""
}
</script>
