export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: [
    'leaflet/dist/leaflet.css',
    '~/assets/css/style.css'
  ],
  devtools: { enabled: true },
  build: { transpile: ['@vue-leaflet/vue-leaflet'] },
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt']
})