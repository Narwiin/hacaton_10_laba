<!-- <template>
  <div class="min-h-screen bg-gray-50">
    
    <nav class="bg-blue-600 text-white shadow-lg">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-4">
            <h1 class="text-xl font-bold">Гидромониторинг СКО</h1>
          </div>
          
          
          <div class="hidden md:flex space-x-6">
            <NuxtLink to="/" class="hover:text-blue-200 transition">Главная</NuxtLink>
            <NuxtLink to="/inform" class="hover:text-blue-200 transition">Патогены</NuxtLink>
            <NuxtLink to="/lab3" class="hover:text-blue-200 transition">Уровень воды</NuxtLink>
            <NuxtLink to="/lab4" class="hover:text-blue-200 transition">Прозрачность</NuxtLink>
            <NuxtLink to="/lab5" class="hover:text-blue-200 transition">Температура</NuxtLink>
            <NuxtLink to="/lab6" class="hover:text-blue-200 transition">Электропроводность</NuxtLink>
          </div>

          
          <button class="md:hidden" @click="isMobileMenuOpen = !isMobileMenuOpen">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    :d="isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"/>
            </svg>
          </button>
        </div>

        
        <div v-if="isMobileMenuOpen" class="md:hidden py-4 border-t border-blue-500">
          <div class="flex flex-col space-y-4">
            <NuxtLink to="/" class="hover:text-blue-200 transition">Главная</NuxtLink>
            <NuxtLink to="/inform" class="hover:text-blue-200 transition">Патогены</NuxtLink>
            <NuxtLink to="/lab3" class="hover:text-blue-200 transition">Уровень воды</NuxtLink>
            <NuxtLink to="/lab4" class="hover:text-blue-200 transition">Прозрачность</NuxtLink>
            <NuxtLink to="/lab5" class="hover:text-blue-200 transition">Температура</NuxtLink>
            <NuxtLink to="/lab6" class="hover:text-blue-200 transition">Электропроводность</NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    
    <main>
      <slot />
    </main>

    
    <footer class="bg-gray-800 text-white py-8 mt-12">
      <div class="container mx-auto px-4">
        <div class="text-center">
          
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const isMobileMenuOpen = ref(false);
</script>

<style scoped>
.router-link-active {
  @apply text-blue-200 font-semibold;
}
</style> -->


<template>
  <div class="h-screen w-screen flex bg-[#04010a] text-white overflow-hidden">
    
   
    <aside
      class="w-72 bg-gradient-to-b from-[#120825] to-[#0a0420] border-r border-indigo-800/40 shadow-2xl flex flex-col p-6 space-y-8"
    >
      
      <div class="flex items-center space-x-3">
        <div class="w-14 h-14 bg-gradient-to-r from-fuchsia-600 to-indigo-600 rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg shadow-fuchsia-500/40">
          SKO 
        </div>
        <span class="text-2xl font-semibold tracking-wide text-indigo-300"></span>
      </div>

      
      <nav class="flex flex-col space-y-3 text-lg font-medium">
        <NuxtLink
          to="/"
          class="nav-item"
        >
          <span>🏠</span> <p>Dashboard</p>
        </NuxtLink>

        <NuxtLink
          to="/map"
          class="nav-item"
        >
          <span>🗺️</span> <p>Map</p>
        </NuxtLink>

        <NuxtLink
          to="/analytics"
          class="nav-item"
        >
          <span>📊</span> <p>Analytics</p>
        </NuxtLink>

        <NuxtLink
          to="/alerts"
          class="nav-item"
        >
          <span>🔔</span> <p>Alerts</p>
        </NuxtLink>

        <NuxtLink
          to="/citizen"
          class="nav-item"
        >
          <span>👥</span> <p>Citizen Reports</p>
        </NuxtLink>

        <NuxtLink
          to="/historical-data"
          class="nav-item"
        >
          <span>📚</span> <p>History</p>
        </NuxtLink>

        <NuxtLink
          to="/reports"
          class="nav-item"
        >
          <span>📄</span> <p>Reports</p>
        </NuxtLink>
      </nav>

      
      <div class="mt-auto text-sm text-indigo-400/80">
          
      </div>
    </aside>

    
    <main class="flex-1 overflow-y-auto p-10 bg-gradient-to-br from-[#0a0420] to-[#120825] relative">

      
      <div class="absolute inset-0 opacity-10 pointer-events-none">
        <div class="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(128,0,255,0.4),rgba(0,0,0,0))]"></div>
      </div>

      <slot />
    </main>
  </div>
</template>

<style scoped>
.nav-item {
  @apply flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10
         transition-all duration-200 hover:shadow-md cursor-pointer text-indigo-300;
}
.nav-item.router-link-active {
  @apply bg-indigo-600/40 text-white shadow-lg shadow-indigo-500/40;
}
</style>
