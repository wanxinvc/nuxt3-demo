<script setup>
import { ref } from 'vue'

// ref - 页面刷新时会重置
const countRef = ref(0)

const router = useRouter()
const countState = useState('count', () => 0)

callOnce(() => {
  countState.value = 5
  ref.value = 4
})

// useState - 页面刷新时会保持状态

const incrementRef = () => {
  countRef.value++
}

const incrementState = () => {
  countState.value++
}

// 用于演示页面刷新效果
const refreshPage = () => {
  router.push('/demo2')
}
</script>

<template>
  <div class="p-4">
    <h2 class="text-xl mb-4">Ref vs useState Demo</h2>
    
    <div class="mb-6">
      <p>Ref计数: {{ countRef }}</p>
      <button 
        class="bg-blue-500 text-white px-4 py-2 rounded"
        @click="incrementRef"
      >
        增加 Ref
      </button>
    </div>

    <div class="mb-6">
      <p>State计数: {{ countState }}</p>
      <button 
        class="bg-green-500 text-white px-4 py-2 rounded"
        @click="incrementState"
      >
        增加 State
      </button>
    </div>

    <button 
      class="bg-gray-500 text-white px-4 py-2 rounded"
      @click="refreshPage"
    >
      刷新页面
    </button>
  </div>
</template> 