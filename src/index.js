import HighlightRect from './components/HighlightRect.vue'

// 安装插件方法
HighlightRect.install = function(Vue) {
  Vue.component(HighlightRect.name, HighlightRect)
}

// 默认导出组件
export default HighlightRect

// 如果是浏览器环境，自动安装
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(HighlightRect)
}

// 导出组件，支持按需导入
export { HighlightRect }