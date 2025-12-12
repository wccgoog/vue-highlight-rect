# vue-highlight-rect 使用指南

本指南将帮助你快速上手 vue-highlight-rect 组件，了解如何在不同场景下使用它。

## 快速开始

### 安装

```bash
npm install vue-highlight-rect
# 或
yarn add vue-highlight-rect
```

### 引入组件

#### 全局注册

```javascript
import Vue from 'vue'
import HighlightRect from 'vue-highlight-rect'

Vue.use(HighlightRect)
```

#### 局部注册

```javascript
import { HighlightRect } from 'vue-highlight-rect'

export default {
  components: {
    HighlightRect
  }
}
```

## 基本用法

### 静态高亮

最基本的用法是创建一个静态的高亮区域：

```vue
<template>
  <div class="container">
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

动态高亮允许你按照顺序展示多个区域：

```vue
<template>
  <div class="container">
    <HighlightRect
      :useDynamic="true"
      :regions="regions"
      @finish="onFinish"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      regions: [
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
    onFinish() {
      console.log('所有区域高亮完成')
    }
  }
}
</script>
```

## 高级用法

### 外部控制

你可以通过 ref 来控制组件的行为：

```vue
<template>
  <div class="container">
    <div class="controls">
      <button @click="startHighlight">开始</button>
      <button @click="stopHighlight">停止</button>
      <button @click="updateRegions">更新区域</button>
    </div>
    
    <HighlightRect
      ref="highlightRect"
      :regions="regions"
      :useDynamic="true"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      regions: [
        { top: 10, right: 20, bottom: 30, left: 15, duration: 3000 }
      ]
    }
  },
  methods: {
    startHighlight() {
      this.$refs.highlightRect.start()
    },
    stopHighlight() {
      this.$refs.highlightRect.stop()
    },
    updateRegions() {
      this.regions = [
        { top: 20, right: 30, bottom: 40, left: 25, duration: 2000 }
      ]
      this.$refs.highlightRect.updateRegions(this.regions)
    }
  }
}
</script>
```

### 响应式设计

由于组件使用百分比定位，它会自动适应不同的屏幕尺寸：

```vue
<template>
  <div class="responsive-container">
    <HighlightRect
      :top="responsiveTop"
      :right="responsiveRight"
      :bottom="responsiveBottom"
      :left="responsiveLeft"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      responsiveTop: 20,
      responsiveRight: 20,
      responsiveBottom: 20,
      responsiveLeft: 20
    }
  },
  mounted() {
    this.updateResponsiveValues()
    window.addEventListener('resize', this.updateResponsiveValues)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateResponsiveValues)
  },
  methods: {
    updateResponsiveValues() {
      if (window.innerWidth < 768) {
        // 移动端适配
        this.responsiveTop = 10
        this.responsiveRight = 10
        this.responsiveBottom = 10
        this.responsiveLeft = 10
      } else {
        // 桌面端
        this.responsiveTop = 20
        this.responsiveRight = 20
        this.responsiveBottom = 20
        this.responsiveLeft = 20
      }
    }
  }
}
</script>
```

### 自定义样式

你可以通过 CSS 变量来自定义组件的样式：

```vue
<template>
  <div class="custom-highlight-container">
    <HighlightRect
      class="custom-highlight"
      :top="20"
      :right="20"
      :bottom="20"
      :left="20"
    />
  </div>
</template>

<style>
.custom-highlight-container {
  --highlight-color: rgba(255, 0, 0, 0.5);
  --corner-color: #ff0000;
  --corner-size: 30px;
  --bottom-line-height: 8px;
}

.custom-highlight .highlight-rect-container {
  background: var(--highlight-color);
}

.custom-highlight .corner {
  width: var(--corner-size);
  height: var(--corner-size);
  border-color: var(--corner-color);
}

.custom-highlight .bottom-line {
  height: var(--bottom-line-height);
}
</style>
```

## 实际应用场景

### 1. 数据大屏引导

```vue
<template>
  <div class="dashboard">
    <!-- 关键指标区域 -->
    <div class="key-metrics">
      <!-- 指标内容 -->
    </div>
    
    <!-- 图表区域 -->
    <div class="charts">
      <!-- 图表内容 -->
    </div>
    
    <!-- 引导高亮 -->
    <HighlightRect
      :useDynamic="true"
      :regions="guideRegions"
      @finish="onGuideComplete"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      guideRegions: [
        {
          top: 5,
          right: 70,
          bottom: 40,
          left: 5,
          duration: 5000 // 引导用户关注关键指标
        },
        {
          top: 5,
          right: 5,
          bottom: 40,
          left: 70,
          duration: 5000 // 引导用户关注图表
        }
      ]
    }
  },
  methods: {
    onGuideComplete() {
      // 引导完成后的操作
      this.showWelcomeMessage()
    }
  }
}
</script>
```

### 2. 操作步骤提示

```vue
<template>
  <div class="tutorial">
    <div class="step-1">
      <!-- 第一步操作区域 -->
    </div>
    
    <div class="step-2">
      <!-- 第二步操作区域 -->
    </div>
    
    <div class="step-3">
      <!-- 第三步操作区域 -->
    </div>
    
    <HighlightRect
      ref="tutorialHighlight"
      :useDynamic="true"
      :regions="tutorialSteps"
      @finish="onTutorialComplete"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 0,
      tutorialSteps: [
        {
          top: 10,
          right: 60,
          bottom: 70,
          left: 10,
          duration: 0 // 不自动切换，等待用户操作
        },
        {
          top: 10,
          right: 10,
          bottom: 70,
          left: 60,
          duration: 0
        },
        {
          top: 70,
          right: 10,
          bottom: 10,
          left: 10,
          duration: 0
        }
      ]
    }
  },
  methods: {
    nextStep() {
      this.currentStep++
      if (this.currentStep < this.tutorialSteps.length) {
        this.$refs.tutorialHighlight.setRegion(this.currentStep)
      }
    },
    onTutorialComplete() {
      // 教程完成
      this.enableAllFeatures()
    }
  }
}
</script>
```

## 最佳实践

1. **合理设置区域大小**：确保高亮区域不会太小，以便用户能够清楚地看到
2. **控制动画时长**：动态高亮的每个区域持续时间不宜过长或过短
3. **考虑响应式设计**：在不同屏幕尺寸下测试高亮效果
4. **提供退出机制**：允许用户跳过或关闭高亮引导
5. **性能优化**：避免同时使用过多的高亮区域

## 常见问题

### Q: 如何在高亮区域添加自定义内容？

A: 你可以在高亮区域上方叠加绝对定位的内容：

```vue
<template>
  <div class="container">
    <HighlightRect :top="20" :right="20" :bottom="20" :left="20" />
    
    <div class="highlight-content" style="top: 20%; left: 20%; right: 20%; bottom: 20%;">
      <h3>重要提示</h3>
      <p>这是高亮区域的内容</p>
    </div>
  </div>
</template>

<style>
.highlight-content {
  position: absolute;
  z-index: 10;
  pointer-events: auto;
}
</style>
```

### Q: 如何处理高亮区域的点击事件？

A: 由于高亮组件设置了 `pointer-events: none`，你需要在高亮区域添加可点击的覆盖层：

```vue
<template>
  <div class="container">
    <HighlightRect :top="20" :right="20" :bottom="20" :left="20" />
    
    <div 
      class="clickable-overlay"
      style="top: 20%; left: 20%; right: 20%; bottom: 20%;"
      @click="handleHighlightClick"
    />
  </div>
</template>

<style>
.clickable-overlay {
  position: absolute;
  z-index: 10;
  pointer-events: auto;
  cursor: pointer;
}
</style>
```

### Q: 如何在移动端优化高亮效果？

A: 考虑使用更大的高亮区域和更长的持续时间：

```javascript
// 移动端适配
const isMobile = window.innerWidth < 768

const mobileRegions = [
  {
    top: 5,  // 更小的边距
    right: 5,
    bottom: 5,
    left: 5,
    duration: 5000  // 更长的持续时间
  }
]
```

## 总结

vue-highlight-rect 是一个功能强大且灵活的组件，适用于各种需要突出显示特定区域的场景。通过合理配置和组合使用，你可以创建出色的用户引导和视觉焦点效果。