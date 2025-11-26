<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-2xl font-bold mb-4">👥 Сообщить о проблеме</h2>
    
    <form @submit.prevent="submitReport" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Выберите водоём</label>
        <select v-model="form.waterBody" class="w-full p-3 border border-gray-300 rounded-lg">
          <option value="">Выберите водоём...</option>
          <option v-for="water in waterBodies" :key="water.id" :value="water.id">
            {{ water.name }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Тип проблемы</label>
        <select v-model="form.problemType" class="w-full p-3 border border-gray-300 rounded-lg">
          <option value="pollution">Загрязнение</option>
          <option value="odor">Неприятный запах</option>
          <option value="waste">Мусор</option>
          <option value="fish_death">Гибель рыбы</option>
          <option value="other">Другое</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Описание проблемы</label>
        <textarea 
          v-model="form.description"
          rows="4"
          class="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Опишите проблему подробнее..."
        ></textarea>
      </div>

      <button 
        type="submit"
        :disabled="!form.waterBody || !form.description"
        class="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition"
      >
        📨 Отправить сообщение
      </button>
    </form>

    <div v-if="submitted" class="mt-4 p-3 bg-green-50 text-green-700 rounded-lg">
      ✅ Спасибо! Ваше сообщение отправлено и будет рассмотрено
    </div>
  </div>
</template>

<script setup lang="ts">
interface ReportForm {
  waterBody: string;
  problemType: string;
  description: string;
}

const form = ref<ReportForm>({
  waterBody: '',
  problemType: 'pollution',
  description: ''
});

const submitted = ref(false);

const waterBodies = [
  { id: '1', name: 'Озеро Пёстрое' },
  { id: '2', name: 'Река Ишим' },
  { id: '3', name: 'Озеро Солёное' }
];

const submitReport = async () => {
  console.log('Отправка отчета:', form.value);
  submitted.value = true;
  
  // Сброс формы через 3 секунды
  setTimeout(() => {
    form.value = {
      waterBody: '',
      problemType: 'pollution', 
      description: ''
    };
    submitted.value = false;
  }, 3000);
};
</script>