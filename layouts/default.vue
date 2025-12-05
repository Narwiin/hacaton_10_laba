<template>
  <div class="min-h-[100vh] flex flex-col bg-gradient-to-br from-[#0a0420] via-[#120825] to-[#1a0b35] text-white">

    <!-- MOBILE HEADER -->
    <header
      class="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#120825] to-[#1a0b35] 
      border-b border-indigo-800/40 backdrop-blur-xl shadow-xl">
      <div class="flex items-center justify-between px-5 py-3">

        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-600 to-indigo-600 shadow-lg
          shadow-fuchsia-500/40 ring-1 ring-white/10 flex items-center justify-center">
            <img src="/logo.png" class="w-12 h-12 rounded-xl object-cover"/>
          </div>
          <div>
            <h1 class="text-sm font-bold bg-gradient-to-r from-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
              Water Intelligence
            </h1>
            <p class="text-xs text-indigo-300/60">Real-time Monitoring</p>
          </div>
        </div>

        <!-- Mobile Burger -->
        <button @click="toggleMobile" class="w-12 h-12 rounded-2xl bg-indigo-800/30 border border-indigo-700/40
          shadow-lg hover:bg-indigo-700/40 transition">
          <div class="relative w-7 h-6">
            <span :class="line1" class="line"></span>
            <span :class="line2" class="line"></span>
            <span :class="line3" class="line"></span>
          </div>
        </button>

      </div>
    </header>

    <!-- MOBILE MENU -->
    <transition name="slide-down">
      <nav
        v-if="mobileOpen"
        class="lg:hidden pt-20 pb-4 px-4 space-y-2 bg-gradient-to-b from-[#120825] to-[#1a0b35] 
        shadow-2xl border-b border-indigo-800/40">
        
        <!-- Navigation Items -->
        <NuxtLink to="/" class="mobile-item" @click="toggleMobile">🏠 Dashboard</NuxtLink>
        <NuxtLink to="/map" class="mobile-item" @click="toggleMobile">🗺️ Interactive Map</NuxtLink>
        <NuxtLink to="/analytics" class="mobile-item" @click="toggleMobile">📊 Analytics</NuxtLink>
        <NuxtLink to="/alerts" class="mobile-item" @click="toggleMobile">🔔 Alerts</NuxtLink>
        <NuxtLink to="/citizen" class="mobile-item" @click="toggleMobile">👥 Citizen Reports</NuxtLink>
        <NuxtLink to="/historical-data" class="mobile-item" @click="toggleMobile">📚 Historical Data</NuxtLink>
        <NuxtLink to="/reports" class="mobile-item" @click="toggleMobile">📄 Reports</NuxtLink>
        <NuxtLink to="/profile" class="mobile-item" @click="toggleMobile">👤 Profile</NuxtLink>
        <NuxtLink to="/region-stats" class="mobile-item" @click="toggleMobile">📊 Region Stats</NuxtLink>
        <NuxtLink to="/login" class="mobile-item" @click="toggleMobile">🔑 Login</NuxtLink>
      </nav>
    </transition>

    <!-- DESKTOP MODE -->
    <div class="hidden lg:flex flex-1">

      <!-- DESKTOP TOP HEADER -->
      <header class="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-[#120825]/80 to-[#1a0b35]/80 
        backdrop-blur-xl border-b border-indigo-800/40 py-3 px-6">
        <div class="flex items-center justify-between">

          <div class="flex items-center gap-4">
            <!-- Logo -->
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-600 to-indigo-600 shadow-lg
              shadow-fuchsia-500/30 ring-1 ring-white/10 flex items-center justify-center">
              <img src="/logo.png" class="w-14 h-14 rounded-xl object-cover"/>
            </div>

            <div class="mt-1">
              <span class="text-indigo-300/70 text-sm">Petropavl, Kazakhstan</span>
              <div class="flex items-center gap-2 text-green-400 text-xs">
                <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                ONLINE
              </div>
            </div>
          </div>

          <!-- Burger for sidebar -->
          <button @click="sidebarOpen = !sidebarOpen"
            class="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-800/90 to-fuchsia-800/90 p-3 shadow-lg 
              border border-indigo-700/50 hover:border-cyan-400/50 transition hover:scale-105">

            <div class="flex flex-col w-6 h-6 justify-center space-y-1.5">
              <span :class="desk1" class="desk-line"></span>
              <span :class="desk2" class="desk-line"></span>
              <span :class="desk3" class="desk-line"></span>
            </div>
          </button>

        </div>
      </header>

      <!-- SIDEBAR -->
      <transition name="slide">
        <aside
          v-if="sidebarOpen"
          class="w-80 h-[100vh] fixed left-0 top-[5rem] bottom-0 overflow-y-auto
          bg-gradient-to-b from-[#120825] to-[#1a0b35]
          border-r border-indigo-800/40 shadow-2xl p-6">

          <!-- Status Widget -->
          <div class="mb-8 bg-gradient-to-r from-indigo-900/30 to-fuchsia-900/30 rounded-xl p-4 border border-indigo-800/50">
            <h3 class="text-sm font-semibold text-indigo-200 mb-3">System Status</h3>
            <div class="text-sm space-y-2">
              <div class="flex justify-between text-indigo-300/70">
                <span>Last Update</span>
                <span class="font-mono text-white">{{ lastUpdateTime }}</span>
              </div>
            </div>
          </div>

          <!-- Navigation -->
          <div class="flex flex-col gap-2">
            <NuxtLink to="/" class="desk-item" :class="{ active: $route.path === '/' }">
              🏠 Dashboard
            </NuxtLink>
            <NuxtLink to="/map" class="desk-item" :class="{ active: $route.path === '/map' }">
              🗺️ Map
            </NuxtLink>
            <NuxtLink to="/analytics" class="desk-item" :class="{ active: $route.path === '/analytics' }">
              📊 Analytics
            </NuxtLink>
            <NuxtLink to="/alerts" class="desk-item">
              🔔 Alerts
            </NuxtLink>
            <NuxtLink to="/citizen" class="desk-item">
              👥 Citizen Reports
            </NuxtLink>
            <NuxtLink to="/reports" class="desk-item">
              📄 Reports
            </NuxtLink>
            <NuxtLink to="/region-stats" class="desk-item">
              📊 Region Stats
            </NuxtLink>
            <NuxtLink to="/profile" class="desk-item">👤 Profile</NuxtLink>
            <NuxtLink to="/login" class="desk-item">🔑 Login</NuxtLink>
          </div>

        </aside>
      </transition>

      <!-- MAIN CONTENT -->
      <main class="flex-1 ml-80 mt-[5rem] p-8 overflow-y-auto relative min-h-[100vh]">

        <!-- Background Soft Blurs -->
        <div class="absolute inset-0 opacity-10 pointer-events-none">
          <div class="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500/10 blur-3xl"></div>
          <div class="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 blur-3xl"></div>
        </div>

        <!-- Page content -->
        <div class="relative z-10">
          <slot/>
        </div>

      </main>

    </div>

    <!-- MOBILE MAIN CONTENT -->
    <main v-if="!mobileOpen" class="lg:hidden pt-24 pb-8 px-4 min-h-[100vh]">
      <slot/>
    </main>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// State
const mobileOpen = ref(false)
const sidebarOpen = ref(true)
const lastUpdateTime = ref('--:--')

// Mobile toggles
function toggleMobile() {
  mobileOpen.value = !mobileOpen.value
}

// Burger animations
const line1 = computed(() => mobileOpen.value ? "top-1/2 rotate-45" : "top-0")
const line2 = computed(() => mobileOpen.value ? "opacity-0" : "top-1/2 -translate-y-1/2")
const line3 = computed(() => mobileOpen.value ? "top-1/2 -rotate-45" : "bottom-0")

const desk1 = computed(() => sidebarOpen.value ? "" : "rotate-45 translate-y-2")
const desk2 = computed(() => sidebarOpen.value ? "" : "opacity-0")
const desk3 = computed(() => sidebarOpen.value ? "" : "-rotate-45 -translate-y-2")

// Update time every minute
function updateTime() {
  const now = new Date()
  lastUpdateTime.value = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

onMounted(() => {
  updateTime()
  const interval = setInterval(updateTime, 60000)
  onUnmounted(() => clearInterval(interval))
})
</script>

<style scoped>
/* Shared Styles */
.mobile-item {
  @apply flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/10;
}
.desk-item {
  @apply flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/10;
}
.desk-item.active {
  @apply bg-indigo-800/40 border-indigo-700/50 shadow-lg shadow-indigo-500/20;
}

/* Burger Lines */
.line {
  @apply absolute left-0 w-7 h-0.5 bg-indigo-300 rounded-full transition-all duration-300;
}
.desk-line {
  @apply w-6 h-0.5 bg-gradient-to-r from-cyan-300 to-fuchsia-300 rounded-full transition-all duration-300;
}

/* Animations */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all .3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-enter-active,
.slide-leave-active {
  transition: all .3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
