<template>
  <div class="min-h-screen flex items-center justify-center px-6 
              bg-gradient-to-br from-[#0a0420] via-[#120825] to-[#1a0b35] relative">

    <!-- BG DECORATION -->
    <div class="absolute inset-0 opacity-20 pointer-events-none">
      <div class="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500/20 blur-[140px]"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 blur-[140px]"></div>
    </div>

    <!-- REGISTER CARD -->
    <div 
      class="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl
             border border-white/10 rounded-3xl shadow-2xl p-8">

      <!-- LOGO -->
      <div class="flex flex-col items-center mb-8">
        <div 
          class="w-20 h-20 rounded-2xl bg-gradient-to-br from-fuchsia-600 to-indigo-600
                 shadow-lg shadow-indigo-500/40 flex items-center justify-center">
          <img src="/logo.png" class="w-16 h-16 rounded-xl" alt="logo" />
        </div>
        <h1 class="mt-4 text-2xl font-bold text-indigo-200">Create Account</h1>
        <p class="text-indigo-300/70 text-sm">Join the monitoring system</p>
      </div>

      <!-- FORM -->
      <form @submit.prevent="registerUser" class="space-y-5">

        <!-- NAME -->
        <div>
          <label class="block mb-1 text-indigo-300/80 text-sm">Full Name</label>
          <input 
            v-model="name"
            type="text"
            required
            class="field"
            placeholder="Your name"
          />
        </div>

        <!-- EMAIL -->
        <div>
          <label class="block mb-1 text-indigo-300/80 text-sm">Email</label>
          <input 
            v-model="email"
            type="email"
            required
            class="field"
            placeholder="you@example.com"
          />
        </div>

        <!-- PASSWORD -->
        <div>
          <label class="block mb-1 text-indigo-300/80 text-sm">Password</label>
          <input 
            v-model="password"
            type="password"
            required
            minlength="6"
            class="field"
            placeholder="••••••••"
          />
        </div>

        <!-- CONFIRM PASSWORD -->
        <div>
          <label class="block mb-1 text-indigo-300/80 text-sm">Confirm Password</label>
          <input 
            v-model="confirmPassword"
            type="password"
            required
            class="field"
            placeholder="••••••••"
          />
        </div>

        <!-- ERROR MESSAGE -->
        <p v-if="error" class="text-red-400 text-sm text-center">{{ error }}</p>

        <!-- SUBMIT BUTTON -->
        <button
          type="submit"
          class="w-full py-3 rounded-xl text-center font-semibold
                 bg-gradient-to-r from-fuchsia-600 to-indigo-600 
                 hover:opacity-90 transition shadow-lg shadow-fuchsia-500/40"
        >
          Register
        </button>

      </form>

      <!-- FOOTER -->
      <div class="mt-6 text-center text-indigo-300/80 text-sm">
        Already have an account?
        <NuxtLink 
          to="/login" 
          class="text-fuchsia-400 hover:text-fuchsia-300 underline"
        >Log In</NuxtLink>
      </div>

    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

function registerUser() {
  error.value = ''

  if (!name.value.trim()) {
    error.value = 'Please enter your full name.'
    return
  }

  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters.'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.'
    return
  }

  // 🔥 Тут можно подключить backend регистрации
  // await $fetch('/api/register', { method: 'POST', body: {...} })

  navigateTo('/login')
}
</script>


<style scoped>
.field {
  @apply w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 
         text-white placeholder-indigo-300/40 focus:outline-none 
         focus:border-fuchsia-400/70 transition;
}

input::placeholder {
  color: rgba(199, 210, 254, 0.3);
}
</style>
