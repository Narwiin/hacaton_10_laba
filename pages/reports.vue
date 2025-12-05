<template>
  <div class="p-10 text-white min-h-screen bg-gradient-to-br from-[#0a0014] via-[#140035] to-[#1a0060]">

    <!-- Title -->
    <h1 class="text-4xl font-bold mb-6 text-center neon">
       Water Quality Reports
    </h1>

    <!-- Generate PDF button -->
    <div class="flex justify-center mb-8">
      <button
        @click="generatePDF"
        class="px-6 py-3 bg-purple-600 hover:bg-purple-700 transition rounded-xl shadow-lg font-semibold"
      >
        📥 Download Report (PDF)
      </button>
    </div>

    <!-- The report content (converted to PDF) -->
    <div
      ref="reportRef"
      class="bg-black/40 border border-purple-600 rounded-2xl p-8 shadow-2xl max-w-4xl mx-auto"
    >
      <h2 class="text-3xl font-bold mb-4 text-purple-300">Water Quality — Summary Report</h2>

      <p class="text-gray-300 mb-6">
        Отчёт автоматически сформирован системой мониторинга водоёмов города Петропавловск.
        Данные представлены в виде сводной таблицы и визуальной информации.
      </p>

      <!-- Table -->
      <h3 class="text-xl font-bold mb-2 text-blue-300">📊 Параметры</h3>
      <table class="w-full border border-purple-700 rounded overflow-hidden">
        <thead class="bg-purple-700/40">
          <tr>
            <th class="p-3 border border-purple-600">Водоём</th>
            <th class="p-3 border border-purple-600">Температура</th>
            <th class="p-3 border border-purple-600">Бактерии</th>
            <th class="p-3 border border-purple-600">Кислород</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, i) in waterData" :key="i" class="text-center">
            <td class="p-3 border border-purple-700">{{ item.name }}</td>
            <td class="p-3 border border-purple-700">{{ item.temp }} °C</td>
            <td class="p-3 border border-purple-700">{{ item.bacteria }}%</td>
            <td class="p-3 border border-purple-700">{{ item.oxygen }} mg/L</td>
          </tr>
        </tbody>
      </table>

      <!-- Weather Impact -->
      <div class="mt-8">
        <h3 class="text-xl font-bold text-blue-300 mb-3">🌦 Влияние погоды</h3>
        <p class="text-gray-300">
          Погодные условия оказывают влияние на качество воды. В отчёте учитываются ветер, осадки и
          температура воздуха.
        </p>
      </div>

      <!-- Footer -->
      
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// ref to report block
const reportRef = ref(null);

// Example water data
const waterData = ref([
  { name: "Озеро Пёстрое", temp: 18, bacteria: 42, oxygen: 6.8 },
  { name: "Река Ишим", temp: 16, bacteria: 63, oxygen: 5.2 },
  { name: "Озеро Каменное", temp: 20, bacteria: 30, oxygen: 7.1 },
]);

// Generate PDF
const generatePDF = async () => {
  // Динамический импорт для избежания SSR проблем
  const html2canvas = (await import('html2canvas')).default;
  const jsPDF = (await import('jspdf')).default;

  const element = reportRef.value;

  // Создаем canvas из HTML
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false
  });

  const imgData = canvas.toDataURL('image/png');
  
  // Создаем PDF
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgWidth = 210; // A4 width in mm
  const pageHeight = 295; // A4 height in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  // Добавляем новые страницы если контент не помещается
  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save('Water_Quality_Report.pdf');
};
</script>

<style scoped>
.neon {
  text-shadow: 0 0 10px #9d4bff, 0 0 20px #7a2bff, 0 0 40px #5d1cff;
}
</style>