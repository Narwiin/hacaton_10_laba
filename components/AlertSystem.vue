<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-2xl font-bold mb-4">🔔 Система оповещений</h2>
    
    <div v-if="alerts.length === 0" class="text-center py-8 text-gray-500">
      ✅ Все показатели в норме
    </div>

    <div v-else class="space-y-3">
      <div 
        v-for="alert in alerts" 
        :key="alert.id"
        :class="[
          'p-4 rounded-lg border-l-4',
          alert.type === 'critical' ? 'bg-red-50 border-red-500' :
          alert.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
          'bg-blue-50 border-blue-500'
        ]"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-semibold">{{ alert.title }}</h3>
            <p class="text-sm text-gray-600 mt-1">{{ alert.message }}</p>
            <p class="text-xs text-gray-500 mt-2">{{ alert.location }} • {{ alert.time }}</p>
          </div>
          <button @click="dismissAlert(alert.id)" class="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>
      </div>
    </div>

    <!-- Кнопка для тестирования (можно удалить) -->
    <button 
      @click="addTestAlert"
      class="mt-4 bg-gray-500 text-white px-4 py-2 rounded text-sm hover:bg-gray-600"
    >
      Тестовое оповещение
    </button>
  </div>
</template>

<script setup lang="ts">
interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  location: string;
  time: string;
}

const alerts = ref<Alert[]>([
  {
    id: '1',
    type: 'critical',
    title: 'Высокий уровень бактерий',
    message: 'Обнаружено превышение нормы кишечной палочки в 3 раза',
    location: 'Озеро Пёстрое',
    time: '2 часа назад'
  },
  {
    id: '2',
    type: 'warning', 
    title: 'Низкая прозрачность воды',
    message: 'Прозрачность снизилась до 45% от нормы',
    location: 'Река Ишим',
    time: '5 часов назад'
  }
]);

const dismissAlert = (id: string) => {
  alerts.value = alerts.value.filter(alert => alert.id !== id);
};

const addTestAlert = () => {
  alerts.value.push({
    id: Date.now().toString(),
    type: 'info',
    title: 'Тестовое оповещение',
    message: 'Это тестовое сообщение для проверки системы',
    location: 'Тестовый объект',
    time: 'Только что'
  });
};
</script>