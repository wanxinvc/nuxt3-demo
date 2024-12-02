<script setup lang="ts">
import WeatherDisplay from '~/components/WeatherDisplay.vue'
</script>

<template>
  <div class="min-h-screen bg-yellow-300">
    <div class="container mx-auto p-4">
      
      <div class="mt-8">
        <h1 class="text-3xl font-bold">Welcome</h1>
        <p class="mt-4">
          You have reached the landing page of the Logoipsum company. Now, let's get started!
        </p>
        
        <WeatherDisplay class="mt-8" />
      </div>
    </div>
  </div>
</template>
