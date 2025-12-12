# HighlightRect 组件使用手册

## 概述

`HighlightRect` 是一个用于大屏展示的高亮矩形组件，可以通过遮罩效果突出显示屏幕的特定区域。组件支持静态高亮和动态切换高亮区域两种模式，并配有炫酷的角标装饰和底部流光线条效果。

## 功能特性

- 🎯 **区域高亮**：通过遮罩层突出显示指定区域
- 🎨 **视觉效果**：带有发光效果、角标动画和流光线条
- 🔄 **动态切换**：支持多个区域按顺序自动切换
- 🎛️ **灵活配置**：可自定义颜色、透明度、位置等参数
- 📱 **响应式**：基于百分比的定位，适配不同屏幕尺寸

## 基本用法

### 静态高亮

```vue
<template>
  <div class="screen-container">
    <!-- 其他内容 -->
    <HighlightRect
      :top="20"
      :right="30"
      :bottom="25"
      :left="15"
      :opacity="0.7"
      color="#000000"
    />
  </div>
</template>

<script setup>
import HighlightRect from './HighlightRect.vue'
</script>
```

### 动态高亮

```vue
<template>
  <div class="screen-container">
    <!-- 其他内容 -->
    <HighlightRect
      :useDynamic="true"
      :regions="highlightRegions"
      @finish="onHighlightFinish"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HighlightRect from './HighlightRect.vue'

const highlightRegions = ref([
  {
    top: 10,
    right: 20,
    bottom: 30,
    left: 15,
    duration: 3000
  },
  {
    top: 40,
    right: 25,
    bottom: 20,
    left: 30,
    duration: 2000
  }
])

const onHighlightFinish = () => {
  console.log('高亮动画完成')
}
</script>
```

## Props 参数

| 参数 | 类型 | 默认值 | 说明 | 验证规则 |
|------|------|--------|------|----------|
| `top` | Number | 30 | 上边距百分比 (0-100) | 必须 0-100 之间 |
| `right` | Number | 50 | 右边距百分比 (0-100) | 必须 0-100 之间 |
| `bottom` | Number | 50 | 下边距百分比 (0-100) | 必须 0-100 之间 |
| `left` | Number | 45 | 左边距百分比 (0-100) | 必须 0-100 之间 |
| `opacity` | Number | 0.7 | 遮罩透明度 (0-1) | 必须 0-1 之间 |
| `color` | String | "#000000" | 遮罩颜色 | 支持十六进制和 rgba 格式 |
| `zIndex` | Number | 1 | z-index 层级值 | - |
| `useDynamic` | Boolean | false | 是否使用动态区域模式 | - |
| `regions` | Array | [] | 动态区域配置数组 | - |

### regions 配置项

当 `useDynamic` 为 `true` 时，`regions` 数组中每个对象可包含以下属性：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `top` | Number | 组件 top 值 | 上边距百分比 |
| `right` | Number | 组件 right 值 | 右边距百分比 |
| `bottom` | Number | 组件 bottom 值 | 下边距百分比 |
| `left` | Number | 组件 left 值 | 左边距百分比 |
| `duration` | Number | 3000 | 该区域显示时长（毫秒） |

## 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `finish` | - | 动态高亮所有区域播放完成时触发 |

## 方法

通过 ref 可以调用以下方法：

```vue
<template>
  <HighlightRect ref="highlightRect" />
</template>

<script setup>
import { ref } from 'vue'
import HighlightRect from './HighlightRect.vue'

const highlightRect = ref(null)

// 开始动态高亮
const startHighlight = () => {
  if (highlightRect.value) {
    highlightRect.value.start()
  }
}

// 停止动态高亮
const stopHighlight = () => {
  if (highlightRect.value) {
    highlightRect.value.stop()
  }
}

// 更新区域配置
const updateRegions = (newRegions) => {
  if (highlightRect.value) {
    highlightRect.value.updateRegions(newRegions)
  }
}
</script>
```

### 方法列表

| 方法名 | 参数 | 说明 |
|--------|------|------|
| `start()` | - | 开始动态高亮（需要 regions 有数据） |
| `stop()` | - | 停止动态高亮 |
| `updateRegions(regions)` | Array | 更新区域配置数组 |

## 样式说明

### 视觉效果

1. **遮罩层**：带有蓝色发光效果的半透明遮罩
2. **角标装饰**：四个角的动态边框，带有呼吸动画效果
3. **底部流光**：彩虹色渐变的流光线条，持续流动动画

### CSS 类名

| 类名 | 说明 |
|------|------|
| `.highlight-rect-container` | 主容器，包含遮罩层 |
| `.corner` | 角标装饰基础样式 |
| `.corner-tl` | 左上角角标 |
| `.corner-tr` | 右上角角标 |
| `.corner-bl` | 左下角角标 |
| `.corner-br` | 右下角角标 |
| `.bottom-line` | 底部流光线条 |

## 使用场景

### 1. 数据大屏重点区域引导

```vue
<template>
  <div class="big-screen">
    <!-- 数据图表区域 -->
    <div class="charts-section">
      <!-- 图表内容 -->
    </div>
    
    <!-- 重点数据区域 -->
    <div class="important-data">
      <!-- 重要数据内容 -->
    </div>
    
    <!-- 引导高亮 -->
    <HighlightRect
      :useDynamic="true"
      :regions="guideRegions"
      @finish="onGuideComplete"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HighlightRect from './HighlightRect.vue'

const guideRegions = ref([
  {
    top: 10,
    right: 20,
    bottom: 30,
    left: 15,
    duration: 3000
  },
  {
    top: 40,
    right: 25,
    bottom: 20,
    left: 30,
    duration: 3000
  }
])

const onGuideComplete = () => {
  console.log('引导完成')
}
</script>
```

### 2. 操作步骤提示

```vue
<template>
  <div class="tutorial-screen">
    <HighlightRect
      ref="tutorialHighlight"
      :useDynamic="true"
      :regions="stepRegions"
      @finish="onTutorialFinish"
    />
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import HighlightRect from './HighlightRect.vue'

const tutorialHighlight = ref(null)
const stepRegions = ref([
  {
    top: 10,
    right: 70,
    bottom: 80,
    left: 10,
    duration: 4000 // 第一步高亮区域
  },
  {
    top: 10,
    right: 10,
    bottom: 80,
    left: 70,
    duration: 4000 // 第二步高亮区域
  }
])

const onTutorialFinish = () => {
  console.log('教程完成')
}

// 开始教程
const startTutorial = () => {
  if (tutorialHighlight.value) {
    tutorialHighlight.value.start()
  }
}
</script>
```

## 注意事项

1. **百分比定位**：组件使用百分比定位，确保父容器有明确的尺寸
2. **点击穿透**：遮罩层设置了 `pointer-events: none`，不会阻挡用户交互
3. **内存管理**：组件销毁时会自动清理定时器，避免内存泄漏
4. **性能优化**：动态模式下建议合理设置区域数量和时长，避免频繁切换影响性能

## 兼容性

- Vue 3.x
- 现代浏览器（支持 CSS3 动画和 clip-path 属性）

## Vue 3 迁移说明

本组件已从 Vue 2 迁移到 Vue 3，主要变更：

1. **语法变更**：使用 `<script setup>` 语法和 Composition API
2. **组件引用**：使用 `ref()` 和 `value` 属性访问组件实例
3. **响应式数据**：使用 `ref()` 和 `computed()` 创建响应式数据
4. **生命周期**：使用 `onMounted()` 和 `onBeforeUnmount()` 替代旧的生命周期钩子
5. **Props 限制**：Vue 3 中 props 是只读的，不能直接修改

## 更新日志

### v2.0.0
- 迁移到 Vue 3，使用 `<script setup>` 语法
- 使用 Composition API 重构组件逻辑
- 优化组件引用方式，支持 `nextTick` 确保 DOM 更新
- 修复 props 只读限制问题

### v1.0.0
- 初始版本
- 支持静态和动态高亮
- 添加角标装饰和流光效果