<template>
  <div class="min-h-screen px-6 py-10 bg-gradient-to-br from-[#0a0420] via-[#120825] to-[#1a0b35] relative text-white">

    <!-- DECOR -->
    <div class="absolute inset-0 opacity-20 pointer-events-none">
      <div class="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500/20 blur-[140px]"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 blur-[140px]"></div>
    </div>

    <div class="relative z-10 max-w-4xl mx-auto">

      <!-- HEADER -->
      <h1 class="text-3xl font-bold mb-6 text-indigo-200">Profile</h1>

      <!-- USER CARD -->
      <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 flex flex-col lg:flex-row gap-8">

        <!-- PHOTO -->
        <div class="flex flex-col items-center lg:w-1/3">
          <div
            class="w-40 h-40 rounded-full bg-gradient-to-br from-fuchsia-600 to-indigo-600 
                   shadow-lg shadow-indigo-500/40 flex items-center justify-center overflow-hidden"
          >
            <img 
              :src="avatar" 
              alt="avatar"
              class="w-full h-full object-cover"
            />
          </div>

          <button 
            @click="changeAvatar"
            class="mt-4 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm
                   hover:bg-white/20 transition"
          >
            Change Avatar
          </button>
        </div>

        <!-- INFO -->
        <div class="flex-1 space-y-6">

          <!-- NAME + EMAIL -->
          <div>
            <p class="text-xl font-semibold text-indigo-200">{{ name }}</p>
            <p class="text-sm text-indigo-300/60">{{ email }}</p>
          </div>

          <!-- QUICK STATS -->
          <div class="grid grid-cols-3 gap-4">
            <div class="stat">
              <p class="stat-number">24</p>
              <p class="stat-label">Reports</p>
            </div>

            <div class="stat">
              <p class="stat-number">7</p>
              <p class="stat-label">Lakes Saved</p>
            </div>

            <div class="stat">
              <p class="stat-number">5★</p>
              <p class="stat-label">Rating</p>
            </div>
          </div>

          <!-- SETTINGS -->
          <div class="space-y-4">
            <h2 class="text-lg font-medium text-indigo-200">Settings</h2>

            <button class="setting-btn">Update Personal Info</button>
            <button class="setting-btn">Change Password</button>
            <button class="setting-btn">Notifications</button>
            <button class="setting-btn bg-red-600/30 text-red-300 border-red-500/40 hover:bg-red-600/40">
              Log Out
            </button>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>


<script setup>
import { ref } from 'vue'

const name = ref("Nariman Suleimenov")
const email = ref("nariman@example.com")
const avatar = ref("https://i.pravatar.cc/300")

function changeAvatar() {
  const newLink = prompt("Paste image URL:")
  if (newLink) avatar.value = newLink
}
</script>


<style scoped>
.stat {
  @apply bg-white/5 border border-white/10 rounded-xl p-4 text-center backdrop-blur-xl;
}
.stat-number {
  @apply text-2xl font-bold text-indigo-200;
}
.stat-label {
  @apply text-xs text-indigo-300/70;
}

.setting-btn {
  @apply w-full block text-left px-4 py-3 rounded-xl 
         bg-white/10 border border-white/20 text-indigo-200
         hover:bg-white/20 transition;
}
</style>
