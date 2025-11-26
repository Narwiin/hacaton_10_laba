<template>
  <div 
    :class="[
      'rounded-lg shadow-lg p-6 transition transform hover:scale-105',
      colorClasses[color]
    ]"
  >
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium opacity-80">{{ title }}</p>
        <p class="text-3xl font-bold mt-2">{{ value }}</p>
      </div>
      <div class="text-3xl">
        {{ icon }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  value: string | number;
  icon: string;
  color: 'blue' | 'red' | 'green' | 'purple';
}

defineProps<Props>();

const colorClasses = {
  blue: 'bg-blue-500 text-white',
  red: 'bg-red-500 text-white', 
  green: 'bg-green-500 text-white',
  purple: 'bg-purple-500 text-white'
};
</script>