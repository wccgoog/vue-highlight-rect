# vue-highlight-rect

[![npm version](https://badge.fury.io/js/vue-highlight-rect.svg)](https://badge.fury.io/js/vue-highlight-rect)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一个用于大屏展示的高亮矩形组件，可以通过遮罩效果突出显示屏幕的特定区域。组件支持静态高亮和动态切换高亮区域两种模式，并配有炫酷的角标装饰和底部流光线条效果。

## 功能特性

- 🎯 **区域高亮**：通过遮罩层突出显示指定区域
- 🎨 **视觉效果**：带有发光效果、角标动画和流光线条
- 🔄 **动态切换**：支持多个区域按顺序自动切换
- 🎛️ **灵活配置**：可自定义颜色、透明度、位置等参数
- 📱 **响应式**：基于百分比的定位，适配不同屏幕尺寸
- 📦 **多种导入方式**：支持 ES Module、CommonJS 和 UMD 格式

## 安装

```bash
npm install vue-highlight-rect
# 或
yarn add vue-highlight-rect
```

## 使用方法

### 全局注册

```javascript
import Vue from 'vue'
import HighlightRect from 'vue-highlight-rect'

Vue.use(HighlightRect)
```

### 局部注册

```javascript
import { HighlightRect } from 'vue-highlight-rect'

export default {
  components: {
    HighlightRect
  }
}
```

### CDN 引入

```html
<script src="https://unpkg.com/vue-highlight-rect/dist/vue-highlight-rect.umd.js"></script>
```

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

<script>
export default {
  data() {
    return {
      highlightRegions: [
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
      ]
    }
  },
  methods: {
    onHighlightFinish() {
      console.log('高亮动画完成')
    }
  }
}
</script>
```

## API

### Props

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

### 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `finish` | - | 动态高亮所有区域播放完成时触发 |

### 方法

通过 ref 可以调用以下方法：

```vue
<template>
  <HighlightRect ref="highlightRect" />
</template>

<script>
export default {
  methods: {
    // 开始动态高亮
    startHighlight() {
      this.$refs.highlightRect.start()
    },
    
    // 停止动态高亮
    stopHighlight() {
      this.$refs.highlightRect.stop()
    },
    
    // 更新区域配置
    updateRegions(newRegions) {
      this.$refs.highlightRect.updateRegions(newRegions)
    }
  }
}
</script>
```

| 方法名 | 参数 | 说明 |
|--------|------|------|
| `start()` | - | 开始动态高亮（需要 regions 有数据） |
| `stop()` | - | 停止动态高亮 |
| `updateRegions(regions)` | Array | 更新区域配置数组 |

## 开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 发布
npm publish
```

## 兼容性

- Vue 2.x
- Vue 3.x (需要使用 Vue 3 兼容版本)
- 现代浏览器（支持 CSS3 动画和 clip-path 属性）

## 许可证

[MIT](LICENSE)

## 更新日志

### v1.0.0

- 初始版本发布
- 支持静态和动态高亮
- 添加角标装饰和流光效果
- 支持多种导入方式