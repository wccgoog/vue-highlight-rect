# Vue HighlightRect - 快速开始指南

这个指南将帮助你快速了解如何使用 vue-highlight-rect npm 包。

## 🚀 快速安装

```bash
npm install vue-highlight-rect
# 或
yarn add vue-highlight-rect
```

## 📦 项目结构

```
vue-highlight-rect/
├── src/
│   ├── components/
│   │   └── HighlightRect.vue     # 主组件
│   └── index.js                  # 入口文件
├── dist/                         # 构建输出
│   ├── vue-highlight-rect.esm.js # ES Module
│   ├── vue-highlight-rect.common.js # CommonJS
│   └── vue-highlight-rect.umd.js # UMD
├── examples/
│   └── index.html                # 示例页面
├── tests/
│   └── HighlightRect.spec.js     # 单元测试
├── docs/
│   └── USAGE.md                  # 详细使用指南
├── scripts/
│   └── publish.js                # 发布脚本
├── package.json                  # 包配置
├── README.md                     # 项目说明
├── CHANGELOG.md                  # 更新日志
└── LICENSE                       # 许可证
```

## 🛠️ 开发环境设置

1. **克隆项目**
   ```bash
   git clone https://github.com/yourusername/vue-highlight-rect.git
   cd vue-highlight-rect
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **开发模式**
   ```bash
   npm run dev
   ```

4. **运行测试**
   ```bash
   npm test
   ```

5. **构建项目**
   ```bash
   npm run build
   ```

## 📋 可用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 开发模式，监听文件变化 |
| `npm run build` | 构建所有格式的文件 |
| `npm run build:esm` | 只构建 ES Module 格式 |
| `npm run build:common` | 只构建 CommonJS 格式 |
| `npm run build:umd` | 只构建 UMD 格式 |
| `npm test` | 运行单元测试 |
| `npm run test:watch` | 监听模式运行测试 |
| `npm run test:coverage` | 生成测试覆盖率报告 |
| `npm run release` | 发布到 npm（推荐使用） |
| `npm publish` | 直接发布到 npm |

## 🎯 基本使用示例

### 1. 全局注册

```javascript
import Vue from 'vue'
import HighlightRect from 'vue-highlight-rect'

Vue.use(HighlightRect)
```

### 2. 局部注册

```javascript
import { HighlightRect } from 'vue-highlight-rect'

export default {
  components: {
    HighlightRect
  }
}
```

### 3. 在模板中使用

```vue
<template>
  <div class="container">
    <!-- 静态高亮 -->
    <HighlightRect
      :top="20"
      :right="30"
      :bottom="25"
      :left="15"
      :opacity="0.7"
      color="#000000"
    />
    
    <!-- 动态高亮 -->
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
      console.log('高亮动画完成')
    }
  }
}
</script>
```

## 🔧 配置选项

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `top` | Number | 30 | 上边距百分比 (0-100) |
| `right` | Number | 50 | 右边距百分比 (0-100) |
| `bottom` | Number | 50 | 下边距百分比 (0-100) |
| `left` | Number | 45 | 左边距百分比 (0-100) |
| `opacity` | Number | 0.7 | 遮罩透明度 (0-1) |
| `color` | String | "#000000" | 遮罩颜色 |
| `zIndex` | Number | 1 | z-index 层级值 |
| `useDynamic` | Boolean | false | 是否使用动态区域模式 |
| `regions` | Array | [] | 动态区域配置数组 |

### 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `finish` | - | 动态高亮所有区域播放完成时触发 |

### 方法

| 方法名 | 参数 | 说明 |
|--------|------|------|
| `start()` | - | 开始动态高亮 |
| `stop()` | - | 停止动态高亮 |
| `updateRegions(regions)` | Array | 更新区域配置数组 |

## 🌟 发布流程

1. **确保所有更改已提交**
   ```bash
   git add .
   git commit -m "feat: 添加新功能"
   git push
   ```

2. **更新版本号**
   ```bash
   npm version patch  # 或 minor, major
   ```

3. **运行发布脚本**
   ```bash
   npm run release
   ```

发布脚本会自动：
- 检查当前分支是否为 main/master
- 确认没有未提交的更改
- 运行测试
- 构建项目
- 发布到 npm
- 创建并推送 git 标签

## 📚 更多资源

- [详细使用指南](docs/USAGE.md)
- [API 文档](README.md#api)
- [示例页面](examples/index.html)
- [更新日志](CHANGELOG.md)

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🆘 获取帮助

如果你遇到问题或有建议，请：

1. 查看 [使用指南](docs/USAGE.md)
2. 搜索 [已有问题](https://github.com/yourusername/vue-highlight-rect/issues)
3. 创建 [新问题](https://github.com/yourusername/vue-highlight-rect/issues/new)

---

现在你已经准备好使用 vue-highlight-rect 组件了！🎉