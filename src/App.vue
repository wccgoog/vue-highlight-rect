<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="app">
    <h1>Vue 3 + Vite 项目</h1>
    <div class="card">
      <button type="button" @click="count++">计数器: {{ count }}</button>
      <p>
        编辑 <code>src/App.vue</code> 并保存以测试热更新。
      </p>
    </div>
    <p class="read-the-docs">
      点击 Vite 和 Vue 徽标了解更多信息
    </p>
  </div>
</template>

<style scoped>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.card {
  padding: 2em;
}

button {
  font-weight: bold;
  color: #42b883;
  background-color: #f9f9f9;
  border: 1px solid #42b883;
  border-radius: 8px;
  padding: 0.6em 1.2em;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  background-color: #42b883;
  color: white;
}

.read-the-docs {
  color: #63676a;
}
</style>