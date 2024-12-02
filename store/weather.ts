import { defineStore } from 'pinia'
import { useCookie } from 'nuxt/app'

interface WeatherData {
  temperature: number
  condition: string
  city: string
  timestamp: number
}

interface WeatherState extends WeatherData {
  loading: boolean
  error: string | null
}

const INITIAL_STATE: WeatherState = {
  temperature: 0,
  condition: '',
  city: 'Basel',
  timestamp: 0,
  loading: false,
  error: null
}

export const useWeatherStore = defineStore('weather', {
  state: (): WeatherState => ({
    ...INITIAL_STATE
  }),

  actions: {
    initFromCookie() {
      const weatherCookie = useCookie('weather-data').value
      if (weatherCookie) {
        try {
          const data = typeof weatherCookie === 'string' 
            ? JSON.parse(weatherCookie) 
            : weatherCookie
          this.$patch({
            temperature: data.temperature,
            condition: data.condition,
            city: data.city,
            timestamp: data.timestamp
          })
        } catch (e) {
          console.error('Failed to parse weather cookie:', e)
        }
      }
    },

    updateCookie() {
      const weatherCookie = useCookie('weather-data', {
        maxAge: 1800, // 30分钟
        path: '/'
      })
      const data: WeatherData = {
        temperature: this.temperature,
        condition: this.condition,
        city: this.city,
        timestamp: Date.now()
      }
      weatherCookie.value = JSON.stringify(data)
    },

    async fetchWeather() {
      const weatherCookie = useCookie('weather-data').value
      if (weatherCookie) {
        try {
          const data = typeof weatherCookie === 'string' 
            ? JSON.parse(weatherCookie) 
            : weatherCookie
            this.initFromCookie()
        } catch (e) {
          console.error('Failed to parse weather cookie:', e)
        }
    } else {

        this.loading = true
    }
      
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=3978da9f7417a95247e8f31df0cf1f27`
        )
        if (!response.ok) {
          throw new Error('Weather API request failed')
        }
        const data = await response.json()
        
        this.$patch({
          temperature: Math.round(data.main.temp),
          condition: data.weather[0].main,
          error: null
        })
        
        this.updateCookie()
      } catch (error) {
        this.error = '获取天气数据失败'
      } finally {
        this.loading = false
      }
    }
  }
}) 