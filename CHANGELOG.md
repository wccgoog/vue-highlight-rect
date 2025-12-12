# 更新日志

本文档记录了 vue-highlight-rect 组件的所有重要变更。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [1.0.0] - 2025-12-12

### 新增
- 初始版本发布
- 支持静态高亮功能
- 支持动态高亮功能
- 添加角标装饰和流光线条效果
- 支持多种导入方式（ES Module、CommonJS、UMD）
- 完整的 TypeScript 类型定义
- 完整的单元测试覆盖
- 详细的文档和示例

### 特性
- 🎯 **区域高亮**：通过遮罩层突出显示指定区域
- 🎨 **视觉效果**：带有发光效果、角标动画和流光线条
- 🔄 **动态切换**：支持多个区域按顺序自动切换
- 🎛️ **灵活配置**：可自定义颜色、透明度、位置等参数
- 📱 **响应式**：基于百分比的定位，适配不同屏幕尺寸

### API
- `top`, `right`, `bottom`, `left`：控制高亮区域位置
- `opacity`：控制遮罩透明度
- `color`：控制遮罩颜色
- `zIndex`：控制层级
- `useDynamic`：启用动态模式
- `regions`：动态区域配置数组
- `finish` 事件：动态高亮完成时触发
- `start()`, `stop()`, `updateRegions()` 方法：外部控制

### 技术栈
- Vue 2.x / 3.x 兼容
- Less 样式预处理器
- Webpack 构建系统
- Jest 测试框架