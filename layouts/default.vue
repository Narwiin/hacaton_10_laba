<!-- <template>
  <div class="min-h-screen bg-gradient-to-br from-[#0a0420] via-[#120825] to-[#1a0b35] text-white relative">

    
    <header class="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#120825] to-[#1a0b35] border-b border-indigo-800/40 shadow-xl backdrop-blur-xl">
      <div class="flex items-center justify-between px-5 py-3">
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-600 to-indigo-600 shadow-lg shadow-fuchsia-500/40 ring-1 ring-white/10 flex items-center justify-center">
            <img src="/logo.png" class="w-10 h-10 rounded-xl"/>
          </div>
        </div>

        
         <button @click="toggleMobile" class="w-12 h-12 rounded-2xl bg-indigo-800/30 border border-indigo-700/40 shadow-lg hover:bg-indigo-700/40 transition mr-4">
          <div class="relative w-7 h-6">
            <span :class="line1" class="line"></span>
            <span :class="line2" class="line"></span>
            <span :class="line3" class="line"></span>
          </div>
        </button>
      </div>
    </header>

    
    <transition name="slide-down">
      <nav
        v-if="mobileOpen"
        class="lg:hidden pt-20 pb-4 px-4 space-y-2 bg-gradient-to-b from-[#120825] to-[#1a0b35] shadow-2xl border-b border-indigo-800/40"
      >
        <NuxtLink to="/" class="mobile-item" @click="toggleMobile">🏠 Dashboard</NuxtLink>
        <NuxtLink to="/map" class="mobile-item" @click="toggleMobile">🗺️ Map</NuxtLink>
        <NuxtLink to="/analytics" class="mobile-item" @click="toggleMobile">📊 Analytics</NuxtLink>
        <NuxtLink to="/alerts" class="mobile-item" @click="toggleMobile">🔔 Alerts</NuxtLink>
        <NuxtLink to="/citizen" class="mobile-item" @click="toggleMobile">👥 Citizen Reports</NuxtLink>
        <NuxtLink to="/historical-data" class="mobile-item" @click="toggleMobile">📚 Historical Data</NuxtLink>
        <NuxtLink to="/reports" class="mobile-item" @click="toggleMobile">📄 Reports</NuxtLink>
        <NuxtLink to="/profile" class="mobile-item" @click="toggleMobile">👤 Profile</NuxtLink>
        <NuxtLink to="/login" class="mobile-item" @click="toggleMobile"> Login</NuxtLink>
        <NuxtLink to="/register" class="mobile-item" @click="toggleMobile"> Register</NuxtLink>
      </nav>
    </transition>

    
    <div class="hidden lg:flex h-screen">

      
      <button @click="sidebarOpen = !sidebarOpen"
        class="fixed top-6 left-6 z-50 bg-gradient-to-br from-indigo-900/90 to-fuchsia-900/90 p-4 rounded-2xl shadow-2xl backdrop-blur-xl border border-indigo-700/50 hover:border-cyan-400/50 transition hover:scale-105">
        
        <div class="flex flex-col w-6 h-6 justify-center space-y-1.5">
          <span :class="desk1" class="desk-line"></span>
          <span :class="desk2" class="desk-line"></span>
          <span :class="desk3" class="desk-line"></span>
        </div>

      </button>

      
      <transition name="slide">
        <aside v-if="sidebarOpen" class="w-80 h-full bg-gradient-to-b from-[#120825] to-[#1a0b35] border-r border-indigo-800/40 shadow-2xl p-6 flex flex-col">

          
          <div class="flex items-center space-x-4 mb-6">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 flex items-center justify-center shadow-lg">
              <img src="/logo.png" class="w-14 h-14 rounded-xl"/>
            </div>
            <div>
              <p class="text-sm text-indigo-300/70">Real-time Monitoring</p>
              <span class="flex items-center text-green-400 text-xs mt-1">
                <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>ONLINE</span>
              </span>
            </div>
          </div>

          
          <div class="flex flex-col space-y-2">

            <NuxtLink to="/" class="desk-item">🏠 Dashboard</NuxtLink>
            <NuxtLink to="/map" class="desk-item">🗺️ Interactive Map</NuxtLink>
            <NuxtLink to="/analytics" class="desk-item">📊 Analytics</NuxtLink>
            <NuxtLink to="/alerts" class="desk-item">🔔 Alerts</NuxtLink>
            <NuxtLink to="/citizen" class="desk-item">👥 Citizen Reports</NuxtLink>
            <NuxtLink to="/historical-data" class="desk-item">📚 Historical Data</NuxtLink>
            <NuxtLink to="/reports" class="desk-item">📄 Reports</NuxtLink>
            <NuxtLink to="/profile" class="mobile-item" @click="toggleMobile">👤 Profile</NuxtLink>
            <NuxtLink to="/login" class="mobile-item" @click="toggleMobile"> Login</NuxtLink>
            <NuxtLink to="/register" class="mobile-item" @click="toggleMobile"> Register</NuxtLink>
          </div>

        </aside>
      </transition>

      
      <main class="flex-1 overflow-y-auto p-8 relative">
        <div class="absolute inset-0 opacity-10 pointer-events-none">
          <div class="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500/10 blur-3xl"></div>
          <div class="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 blur-3xl"></div>
        </div>

        <div class="relative z-10">
          <slot/>
        </div>
      </main>

    </div>

    
    <main v-if="!mobileOpen" class="lg:hidden pt-20 pb-8 px-4 min-h-screen">
      <slot/>
    </main>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const mobileOpen = ref(false)
const sidebarOpen = ref(true)

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value
}

const line1 = computed(() => mobileOpen.value ? "top-1/2 rotate-45" : "top-0")
const line2 = computed(() => mobileOpen.value ? "opacity-0" : "top-1/2 -translate-y-1/2")
const line3 = computed(() => mobileOpen.value ? "top-1/2 -rotate-45" : "bottom-0")

const desk1 = computed(() => sidebarOpen.value ? "" : "rotate-45 translate-y-2")
const desk2 = computed(() => sidebarOpen.value ? "" : "opacity-0")
const desk3 = computed(() => sidebarOpen.value ? "" : "-rotate-45 -translate-y-2")
</script>

<style scoped>
.mobile-item {
  @apply flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition text-indigo-200 border border-white/10;
}
.desk-item {
  @apply p-3 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/10;
}
.line {
  @apply absolute left-0 w-7 h-0.5 bg-indigo-300 rounded-full transition-all;
}
.desk-line {
  @apply block w-6 h-0.5 bg-gradient-to-r from-cyan-300 to-fuchsia-300 rounded-full transition-all;
}
</style> -->

<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0a0420] via-[#120825] to-[#1a0b35] text-white relative">

    <!-- MOBILE HEADER -->
    <header class="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#120825] to-[#1a0b35] border-b border-indigo-800/40 shadow-xl backdrop-blur-xl">
      <div class="flex items-center justify-between px-5 py-3">
        <div class="flex items-center space-x-3">
          <!-- Увеличенный логотип для мобильной версии -->
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-600 to-indigo-600 shadow-lg shadow-fuchsia-500/40 ring-1 ring-white/10 flex items-center justify-center">
            <img src="/logo.png" class="w-12 h-12 rounded-xl object-cover"/>
          </div>
          <div>
            <h1 class="text-sm font-bold bg-gradient-to-r from-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
              Water Intelligence
            </h1>
            <p class="text-xs text-indigo-300/60">Real-time Monitoring</p>
          </div>
        </div>

        <!-- BURGER -->
        <button @click="toggleMobile"
          class="w-12 h-12 rounded-2xl bg-indigo-800/30 border border-indigo-700/40 shadow-lg hover:bg-indigo-700/40 transition">
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
        class="lg:hidden pt-20 pb-4 px-4 space-y-2 bg-gradient-to-b from-[#120825] to-[#1a0b35] shadow-2xl border-b border-indigo-800/40"
      >
        <NuxtLink to="/" class="mobile-item" @click="toggleMobile">🏠 Dashboard</NuxtLink>
        <NuxtLink to="/map" class="mobile-item" @click="toggleMobile">🗺️ Interactive Map</NuxtLink>
        <NuxtLink to="/analytics" class="mobile-item" @click="toggleMobile">📊 Analytics</NuxtLink>
        <NuxtLink to="/alerts" class="mobile-item" @click="toggleMobile">🔔 Alerts</NuxtLink>
        <NuxtLink to="/citizen" class="mobile-item" @click="toggleMobile">👥 Citizen Reports</NuxtLink>
        <NuxtLink to="/historical-data" class="mobile-item" @click="toggleMobile">📚 Historical Data</NuxtLink>
        <NuxtLink to="/reports" class="mobile-item" @click="toggleMobile">📄 Reports</NuxtLink>
        <NuxtLink to="/profile" class="mobile-item" @click="toggleMobile">👤 Profile</NuxtLink>
        <NuxtLink to="/login" class="mobile-item" @click="toggleMobile"> Login</NuxtLink>
        <NuxtLink to="/region-stats" class="mobile-item" @click="toggleMobile"> region-stats</NuxtLink>
      </nav>
    </transition>

    <!-- DESKTOP LAYOUT -->
    <div class="hidden lg:flex h-screen">

      <!-- DESKTOP HEADER WITH LOGO AND BURGER -->
      <div class="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-[#120825]/80 to-[#1a0b35]/80 backdrop-blur-xl border-b border-indigo-800/40 py-3 px-6">
        <div class="flex items-center justify-between">
          <!-- LEFT: Увеличенный логотип + заголовок -->
          <div class="flex items-center space-x-4">
            <!-- Увеличенный логотип для десктопа -->
            <div class="w-15 h-17 rounded-2xl bg-gradient-to-br from-fuchsia-600 to-indigo-600 shadow-lg shadow-fuchsia-500/30 ring-1 ring-white/10 flex items-center justify-center">
              <img src="/logo.png" class="w-16 h-16 rounded-xl object-cover"/>
            </div>
            <div>
              <div class="flex items-center gap-2 text-sm mt-1">
                <span class="text-indigo-300/70">Petropavl, Kazakhstan</span>
                <span class="flex items-center gap-1 text-green-400">
                  <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span class="font-medium">ONLINE</span>
                </span>
              </div>
            </div>
          </div>

          <!-- RIGHT: BURGER BUTTON -->
          <button @click="sidebarOpen = !sidebarOpen"
            class="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-800/90 to-fuchsia-800/90 p-3 shadow-lg backdrop-blur-xl border border-indigo-700/50 hover:border-cyan-400/50 transition hover:scale-105">
            
            <div class="flex flex-col w-6 h-6 justify-center space-y-1.5">
              <span :class="desk1" class="desk-line"></span>
              <span :class="desk2" class="desk-line"></span>
              <span :class="desk3" class="desk-line"></span>
            </div>

          </button>
        </div>
      </div>

      <!-- SIDEBAR -->
      <transition name="slide">
        <aside v-if="sidebarOpen" class="w-80 h-full bg-gradient-to-b from-[#120825] to-[#1a0b35] border-r border-indigo-800/40 shadow-2xl p-6 flex flex-col mt-20">

          <!-- Увеличенный логотип в боковой панели -->
          

          <!-- STATS WIDGET -->
          <div class="mb-8 bg-gradient-to-r from-indigo-900/30 to-fuchsia-900/30 rounded-xl p-4 border border-indigo-800/50">
            <h3 class="text-sm font-semibold text-indigo-200 mb-3">System Status</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between text-sm">
                <span class="text-indigo-300/70">Active Stations</span>
                <span class="font-bold text-white">24/7</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-indigo-300/70">Last Update</span>
                <span class="font-mono text-white">{{ lastUpdateTime }}</span>
              </div>
            </div>
          </div>

          <!-- NAVIGATION -->
          <h3 class="text-sm font-semibold text-indigo-200 mb-3">Navigation</h3>
          <div class="flex flex-col space-y-2">
            <NuxtLink to="/" class="desk-item" :class="{ 'active': $route.path === '/' }">
              <span class="text-lg">🏠</span>
              <div class="flex-1">
                <p class="font-medium">Dashboard</p>
                <p class="text-xs text-indigo-300/50">Overview & Statistics</p>
              </div>
              <div v-if="$route.path === '/'" class="w-2 h-2 bg-fuchsia-400 rounded-full animate-pulse"></div>
            </NuxtLink>

            <NuxtLink to="/map" class="desk-item" :class="{ 'active': $route.path === '/map' }">
              <span class="text-lg">🗺️</span>
              <div class="flex-1">
                <p class="font-medium">Interactive Map</p>
                <p class="text-xs text-indigo-300/50">Real-time Monitoring</p>
              </div>
            </NuxtLink>

            <NuxtLink to="/analytics" class="desk-item" :class="{ 'active': $route.path === '/analytics' }">
              <span class="text-lg">📊</span>
              <div class="flex-1">
                <p class="font-medium">Analytics</p>
                <p class="text-xs text-indigo-300/50">Data Analysis</p>
              </div>
            </NuxtLink>

            <div class="h-px bg-gradient-to-r from-transparent via-indigo-700/30 to-transparent my-2"></div>

            <NuxtLink to="/alerts" class="desk-item" :class="{ 'active': $route.path === '/alerts' }">
              <span class="text-lg">🔔</span>
              <div class="flex-1">
                <p class="font-medium">Alerts</p>
                <p class="text-xs text-indigo-300/50">Notifications</p>
              </div>
              <div class="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded-full">3 new</div>
            </NuxtLink>

            <NuxtLink to="/citizen" class="desk-item" :class="{ 'active': $route.path === '/citizen' }">
              <span class="text-lg">👥</span>
              <div class="flex-1">
                <p class="font-medium">Citizen Reports</p>
                <p class="text-xs text-indigo-300/50">Community Input</p>
              </div>
            </NuxtLink>

            <NuxtLink to="/reports" class="desk-item" :class="{ 'active': $route.path === '/reports' }">
              <span class="text-lg">📄</span>
              <div class="flex-1">
                <p class="font-medium">Reports</p>
                <p class="text-xs text-indigo-300/50">Documents & Exports</p>
              </div>
            </NuxtLink>

            <NuxtLink to="/region-stats" class="desk-item" :class="{ 'active': $route.path === '/region-stats' }">
              <span class="text-lg">👤</span>
              <div class="flex-1">
                <p class="font-medium">регион статус</p>
                <p class="text-xs text-indigo-300/50">Account Settings</p>
              </div>
            </NuxtLink>


            

            <NuxtLink to="/profile" class="desk-item" :class="{ 'active': $route.path === '/profile' }">
              <span class="text-lg">👤</span>
              <div class="flex-1">
                <p class="font-medium">Profile</p>
                <p class="text-xs text-indigo-300/50">Account Settings</p>
              </div>
            </NuxtLink>

            <NuxtLink to="/login" class="desk-item" :class="{ 'active': $route.path === '/login' }">
              <span class="text-lg">🔑</span>
              <div class="flex-1">
                <p class="font-medium">Login</p>
                <p class="text-xs text-indigo-300/50">Sign in to account</p>
              </div>
            </NuxtLink>
          </div>

          <!-- USER PROFILE -->
          <div class="mt-auto pt-6 border-t border-indigo-800/40">
            <div class="flex items-center space-x-3 p-3 rounded-xl bg-indigo-900/20 hover:bg-indigo-800/30 transition-all">
              <div class="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 flex items-center justify-center">
                <span class="text-lg">👤</span>
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium">System Admin</p>
                <p class="text-xs text-indigo-300/70">Last login: {{ lastUpdateTime }}</p>
              </div>
            </div>
          </div>

        </aside>
      </transition>

      <!-- MAIN CONTENT -->
      <main class="flex-1 overflow-y-auto p-8 relative mt-20">
        <div class="absolute inset-0 opacity-10 pointer-events-none">
          <div class="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500/10 blur-3xl"></div>
          <div class="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 blur-3xl"></div>
        </div>

        <div class="relative z-10">
          <slot/>
        </div>
      </main>

    </div>

    <!-- MOBILE MAIN CONTENT -->
    <div v-if="!mobileOpen" class="lg:hidden pt-24 pb-8 px-4 min-h-screen">
      <slot/>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const mobileOpen = ref(false)
const sidebarOpen = ref(true)
const lastUpdateTime = ref('--:--')

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value
}

const line1 = computed(() => mobileOpen.value ? "top-1/2 rotate-45" : "top-0")
const line2 = computed(() => mobileOpen.value ? "opacity-0" : "top-1/2 -translate-y-1/2")
const line3 = computed(() => mobileOpen.value ? "top-1/2 -rotate-45" : "bottom-0")

const desk1 = computed(() => sidebarOpen.value ? "" : "rotate-45 translate-y-2")
const desk2 = computed(() => sidebarOpen.value ? "" : "opacity-0")
const desk3 = computed(() => sidebarOpen.value ? "" : "-rotate-45 -translate-y-2")

// Update time
function updateTime() {
  const now = new Date()
  lastUpdateTime.value = now.toLocaleTimeString('en-GB', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  })
}

onMounted(() => {
  updateTime()
  const interval = setInterval(updateTime, 60000) // Update every minute
  
  onUnmounted(() => {
    clearInterval(interval)
  })
})
</script>

<style scoped>
/* Mobile Navigation Items */
.mobile-item {
  @apply flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition text-indigo-200 border border-white/10;
}

/* Desktop Navigation Items */
.desk-item {
  @apply flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/10;
}

.desk-item.active {
  @apply bg-indigo-800/40 border-indigo-700/50 shadow-lg shadow-indigo-500/20;
}

/* Burger lines */
.line {
  @apply absolute left-0 w-7 h-0.5 bg-indigo-300 rounded-full transition-all duration-300;
}

.desk-line {
  @apply block w-6 h-0.5 bg-gradient-to-r from-cyan-300 to-fuchsia-300 rounded-full transition-all duration-300;
}

/* Animations */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Gradient Text */
.gradient-text {
  @apply bg-gradient-to-r from-fuchsia-300 to-indigo-300 bg-clip-text text-transparent;
}
</style>
