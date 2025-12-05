<template>
  <div class="p-6 lg:p-10 min-h-screen text-white relative bg-gradient-to-br from-[#0a0420] via-[#120825] to-[#1a0b35]">

    <!-- BACKGROUND DECOR -->
    <div class="absolute inset-0 pointer-events-none opacity-10">
      <div class="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500/20 blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 blur-3xl"></div>
    </div>

    <div class="relative z-10 max-w-3xl mx-auto">

      <!-- HEADER -->
      <div class="mb-10">
        <h1 class="text-3xl font-bold text-indigo-200">Edit Lake</h1>
        <p class="text-indigo-300/70">Modify the lake information and save changes.</p>
      </div>

      <!-- LOADING -->
      <div 
        v-if="loading"
        class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-10 text-center"
      >
        <p class="text-indigo-300">Loading lake data...</p>
      </div>

      <!-- FORM CARD -->
      <div 
        v-else
        class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8"
      >

        <form @submit.prevent="updateLake" class="space-y-6">

          <!-- NAME -->
          <div>
            <label class="form-label">Lake Name</label>
            <input 
              v-model="form.name" 
              type="text"
              required
              class="form-input"
            />
          </div>

          <!-- TYPE -->
          <div>
            <label class="form-label">Type</label>
            <select 
              v-model="form.type" 
              required
              class="form-input"
            >
              <option disabled value="">Select type</option>
              <option>Lake</option>
              <option>River</option>
              <option>Pond</option>
              <option>Reservoir</option>
            </select>
          </div>

          <!-- COORDINATES -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label class="form-label">Latitude</label>
              <input
                v-model="form.lat"
                type="number"
                step="0.000001"
                required
                class="form-input"
              />
            </div>
            <div>
              <label class="form-label">Longitude</label>
              <input
                v-model="form.lng"
                type="number"
                step="0.000001"
                required
                class="form-input"
              />
            </div>
          </div>

          <!-- DESCRIPTION -->
          <div>
            <label class="form-label">Description</label>
            <textarea
              v-model="form.description"
              rows="4"
              class="form-input resize-none"
            ></textarea>
          </div>

          <!-- IMAGE -->
          <div>
            <label class="form-label">Photo URL</label>
            <input
              v-model="form.image"
              type="url"
              class="form-input"
            />
          </div>

          <!-- ERROR -->
          <p v-if="error" class="text-red-400 text-sm text-center">{{ error }}</p>

          <!-- SUBMIT -->
          <button 
            type="submit"
            class="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 
                   font-semibold hover:opacity-90 transition shadow-lg shadow-fuchsia-500/40"
          >
            Save Changes
          </button>

        </form>

      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const lakeId = route.params.id // /admin/edit-lake/[id].vue (если ты сделаешь динамический)

const loading = ref(true)
const error = ref('')
const form = ref({
  name: '',
  type: '',
  lat: '',
  lng: '',
  description: '',
  image: ''
})

// LOAD LAKE DATA
onMounted(async () => {
  try {
    const data = await $fetch(`/api/water?id=${lakeId}`)
    form.value = data
  } catch (err) {
    error.value = 'Failed to load lake data.'
  } finally {
    loading.value = false
  }
})

// UPDATE LAKE
async function updateLake() {
  error.value = ''

  try {
    await $fetch('/api/water', {
      method: 'PATCH',
      body: { id: lakeId, ...form.value }
    })

    alert("Lake updated successfully!")
    navigateTo('/admin/dashboard')

  } catch (err) {
    error.value = "Error while saving changes."
  }
}
</script>


<style scoped>
.form-label {
  @apply block mb-1 text-indigo-300/80 text-sm;
}

.form-input {
  @apply w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 
         text-white placeholder-indigo-300/40 focus:outline-none 
         focus:border-fuchsia-400/70 transition;
}

.form-input::placeholder {
  color: rgba(199, 210, 254, 0.3);
}
</style>
