<script setup>
import { ref, reactive, nextTick } from 'vue'
import HighlightRect from './components/HighlightRect.vue'

// 静态高亮区域参数
const staticHighlight = reactive({
  top: 20,
  right: 30,
  bottom: 40,
  left: 25,
  opacity: 0.7,
  color: '#000000',
  zIndex: 1
})

// 动态高亮区域配置
const dynamicRegions = ref([
  {
    top: 10,
    right: 60,
    bottom: 60,
    left: 10,
    duration: 3000
  },
  {
    top: 50,
    right: 20,
    bottom: 20,
    left: 50,
    duration: 3000
  },
  {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30,
    duration: 3000
  }
])

// 控制面板参数
const controlPanel = reactive({
  showStatic: true,
  showDynamic: false,
  dynamicAutoPlay: false
})

// 组件引用
const dynamicHighlightRef = ref(null)

// 控制方法
const startDynamic = () => {
  console.log('startDynamic')
  // 确保动态高亮组件被渲染
  controlPanel.showDynamic = true
  
  // 使用 nextTick 确保组件已经渲染
  nextTick(() => {
    console.log(dynamicHighlightRef.value)
    if (dynamicHighlightRef.value) {
      dynamicHighlightRef.value.start()
    }
  })
  controlPanel.dynamicAutoPlay = true
}

const stopDynamic = () => {
  if (dynamicHighlightRef.value) {
    dynamicHighlightRef.value.stop()
  }
  controlPanel.dynamicAutoPlay = false
}

const onDynamicFinish = () => {
  console.log('动态高亮演示完成')
  controlPanel.dynamicAutoPlay = false
}

// 更新动态区域配置
const updateRegions = () => {
  if (dynamicHighlightRef.value) {
    dynamicHighlightRef.value.updateRegions(dynamicRegions.value)
  }
}
</script>

<template>
  <div class="app">
    <h1>HighlightRect 组件示例</h1>
    
    <div class="demo-container">
      <!-- 静态高亮示例 -->
      <div class="demo-section">
        <h2>静态高亮区域</h2>
        <div class="highlight-demo">
          <div class="demo-content">
            <div class="card">
              <h3>这是一个卡片</h3>
              <p>这里是卡片的内容，展示了静态高亮区域的效果。</p>
              <button>示例按钮</button>
            </div>
            <div class="card">
              <h3>另一个卡片</h3>
              <p>这里是另一个卡片的内容。</p>
              <button>示例按钮</button>
            </div>
            <div class="card">
              <h3>第三个卡片</h3>
              <p>这里是第三个卡片的内容。</p>
              <button>示例按钮</button>
            </div>
          </div>
          
          <!-- 静态高亮组件 -->
          <HighlightRect
            v-if="controlPanel.showStatic"
            :top="staticHighlight.top"
            :right="staticHighlight.right"
            :bottom="staticHighlight.bottom"
            :left="staticHighlight.left"
            :opacity="staticHighlight.opacity"
            :color="staticHighlight.color"
            :z-index="staticHighlight.zIndex"
          />
        </div>
      </div>
      
      <!-- 动态高亮示例 -->
      <div class="demo-section">
        <h2>动态高亮区域</h2>
        <div class="highlight-demo">
          <div class="demo-content">
            <div class="card" id="card1">
              <h3>第一个区域</h3>
              <p>这是第一个高亮区域的内容。</p>
              <button>区域1按钮</button>
            </div>
            <div class="card" id="card2">
              <h3>第二个区域</h3>
              <p>这是第二个高亮区域的内容。</p>
              <button>区域2按钮</button>
            </div>
            <div class="card" id="card3">
              <h3>第三个区域</h3>
              <p>这是第三个高亮区域的内容。</p>
              <button>区域3按钮</button>
            </div>
          </div>
          
          <!-- 动态高亮组件 -->
          <HighlightRect
            v-if="controlPanel.showDynamic"
            ref="dynamicHighlightRef"
            :use-dynamic="true"
            :regions="dynamicRegions"
            :opacity="0.7"
            color="#000033"
            :z-index="2"
            @finish="onDynamicFinish"
          />
        </div>
        
        <div class="dynamic-controls">
          <button @click="startDynamic" :disabled="controlPanel.dynamicAutoPlay">
            开始动态演示
          </button>
          <button @click="stopDynamic" :disabled="!controlPanel.dynamicAutoPlay">
            停止动态演示
          </button>
        </div>
      </div>
    </div>
    
    <!-- 控制面板 -->
    <div class="control-panel">
      <h2>控制面板</h2>
      
      <div class="control-section">
        <h3>显示控制</h3>
        <label>
          <input type="checkbox" v-model="controlPanel.showStatic" />
          显示静态高亮
        </label>
        <label>
          <input type="checkbox" v-model="controlPanel.showDynamic" />
          显示动态高亮
        </label>
      </div>
      
      <div class="control-section">
        <h3>静态高亮参数</h3>
        <div class="control-group">
          <label>上边距: {{ staticHighlight.top }}%</label>
          <input type="range" min="0" max="100" v-model="staticHighlight.top" />
        </div>
        <div class="control-group">
          <label>右边距: {{ staticHighlight.right }}%</label>
          <input type="range" min="0" max="100" v-model="staticHighlight.right" />
        </div>
        <div class="control-group">
          <label>下边距: {{ staticHighlight.bottom }}%</label>
          <input type="range" min="0" max="100" v-model="staticHighlight.bottom" />
        </div>
        <div class="control-group">
          <label>左边距: {{ staticHighlight.left }}%</label>
          <input type="range" min="0" max="100" v-model="staticHighlight.left" />
        </div>
        <div class="control-group">
          <label>透明度: {{ staticHighlight.opacity }}</label>
          <input type="range" min="0" max="1" step="0.1" v-model="staticHighlight.opacity" />
        </div>
        <div class="control-group">
          <label>颜色:</label>
          <input type="color" v-model="staticHighlight.color" />
        </div>
      </div>
      
      <div class="control-section">
        <h3>动态高亮区域配置</h3>
        <div v-for="(region, index) in dynamicRegions" :key="index" class="region-config">
          <h4>区域 {{ index + 1 }}</h4>
          <div class="control-group">
            <label>上边距: {{ region.top }}%</label>
            <input type="range" min="0" max="100" v-model="region.top" />
          </div>
          <div class="control-group">
            <label>右边距: {{ region.right }}%</label>
            <input type="range" min="0" max="100" v-model="region.right" />
          </div>
          <div class="control-group">
            <label>下边距: {{ region.bottom }}%</label>
            <input type="range" min="0" max="100" v-model="region.bottom" />
          </div>
          <div class="control-group">
            <label>左边距: {{ region.left }}%</label>
            <input type="range" min="0" max="100" v-model="region.left" />
          </div>
          <div class="control-group">
            <label>持续时间: {{ region.duration }}ms</label>
            <input type="range" min="1000" max="10000" step="500" v-model="region.duration" />
          </div>
        </div>
        <button @click="updateRegions" class="update-btn">更新动态区域</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #42b883;
  margin-bottom: 30px;
}

h2 {
  color: #2c3e50;
  border-bottom: 2px solid #42b883;
  padding-bottom: 10px;
  margin-top: 30px;
}

.demo-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 40px;
}

.demo-section {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background-color: #f9f9f9;
}

.highlight-demo {
  position: relative;
  height: 300px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 20px;
}

.demo-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  height: 100%;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card h3 {
  margin-top: 0;
  color: #42b883;
}

.card button {
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.card button:hover {
  background-color: #369870;
}

.dynamic-controls {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  justify-content: center;
}

.dynamic-controls button {
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dynamic-controls button:hover:not(:disabled) {
  background-color: #369870;
}

.dynamic-controls button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.control-panel {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background-color: #f5f5f5;
}

.control-section {
  margin-bottom: 30px;
}

.control-section h3 {
  color: #42b883;
  margin-bottom: 15px;
}

.control-group {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.control-group label {
  min-width: 120px;
}

.control-group input[type="range"] {
  flex: 1;
}

.control-group input[type="color"] {
  width: 50px;
  height: 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.control-section label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  cursor: pointer;
}

.region-config {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: white;
}

.region-config h4 {
  margin-top: 0;
  color: #2c3e50;
}

.update-btn {
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
}

.update-btn:hover {
  background-color: #369870;
}
</style>