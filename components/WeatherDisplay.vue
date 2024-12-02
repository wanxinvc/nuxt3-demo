<script setup lang="ts">
import { onMounted } from 'vue'
import { useWeatherStore } from '~/store/weather'
import { storeToRefs } from 'pinia'

const weatherStore = useWeatherStore()
const { temperature, condition, city, loading } = storeToRefs(weatherStore)

// 在服务端渲染时初始化数据
callOnce(() => {
    weatherStore.initFromCookie()
})

onMounted(() => {
  weatherStore.fetchWeather()
})

const getWeatherIcon = (condition: string) => {
  const iconMap: Record<string, string> = {
    'Clear': 'i-weather-sunny',
    'Clouds': 'i-weather-cloudy',
    'Rain': 'i-weather-rainy',
    'Mist': 'i-weather-fog',
  }
  return iconMap[condition] || 'i-weather-cloudy'
}
</script>

<template>
  <div class="flex flex-col items-center p-4">
    <div v-if="loading" class="flex items-center justify-center">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
    
    <template v-else>
      <div class="flex items-center gap-4">
        <div :class="getWeatherIcon(condition)" class="text-4xl"></div>
        <div class="text-6xl font-bold">
          {{ temperature }}°C
        </div>
      </div>
      <div class="mt-2 text-gray-600">
        {{ city }} | {{ condition }}
      </div>
    </template>
  </div>
</template> 