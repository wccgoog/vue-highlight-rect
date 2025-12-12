<template>
  <div>
    <div
      class="highlight-rect-container"
      :style="{
        clipPath: clipPath,
        ...backgroundStyle,
        zIndex: zIndex,
      }"
    ></div>
    <!-- 角标装饰 -->
    <div
      class="corner corner-tl"
      :style="{
        left: `${currentLeft - 0.15}%`,
        top: `${currentTop - 0.5}%`,
      }"
    ></div>

    <div
      class="corner corner-tr"
      :style="{
        right: `${currentRight - 0.15}%`,
        top: `${currentTop - 0.5}%`,
      }"
    ></div>

    <div
      class="corner corner-bl"
      :style="{
        left: `${currentLeft - 0.15}%`,
        bottom: `${currentBottom - 0.5}%`,
      }"
    ></div>

    <div
      class="corner corner-br"
      :style="{
        right: `${currentRight - 0.15}%`,
        bottom: `${currentBottom - 0.5}%`,
      }"
    ></div>

    <div
      class="bottom-line"
      :style="{
        left: `${currentLeft}%`,
        width: `${100 - currentLeft - currentRight}%`,
        bottom: `${currentBottom}%`,
      }"
    ></div>
  </div>
</template>

<script>
export default {
  name: "HighlightRect",
  props: {
    // 上边距百分比 (0-100)
    top: {
      type: Number,
      default: 30,
      validator: (value) => value >= 0 && value <= 100,
    },
    // 右边距百分比 (0-100)
    right: {
      type: Number,
      default: 50,
      validator: (value) => value >= 0 && value <= 100,
    },
    // 下边距百分比 (0-100)
    bottom: {
      type: Number,
      default: 50,
      validator: (value) => value >= 0 && value <= 100,
    },
    // 左边距百分比 (0-100)
    left: {
      type: Number,
      default: 45,
      validator: (value) => value >= 0 && value <= 100,
    },
    // 遮罩透明度
    opacity: {
      type: Number,
      default: 0.7,
      validator: (value) => value >= 0 && value <= 1,
    },
    // 遮罩颜色
    color: {
      type: String,
      default: "#000000",
    },
    // z-index值
    zIndex: {
      type: Number,
      default: 1,
    },
    // 是否使用动态区域
    useDynamic: {
      type: Boolean,
      default: false,
    },
    // 动态区域配置数组
    regions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentTop: this.top,
      currentRight: this.right,
      currentBottom: this.bottom,
      currentLeft: this.left,
      timer: null,
      currentIndex: 0,
    };
  },
  computed: {
    // 动态生成 clip-path 多边形
    clipPath() {
      // 使用当前值而不是props值，支持动态切换
      const top = this.useDynamic ? this.currentTop : this.top;
      const right = this.useDynamic ? this.currentRight : this.right;
      const bottom = this.useDynamic ? this.currentBottom : this.bottom;
      const left = this.useDynamic ? this.currentLeft : this.left;

      // 根据传入的参数生成多边形点
      // 这个多边形创建了一个高亮区域，中心区域是透明的，周围是遮罩
      return `polygon(
        0% 0%,
        0% 100%,
        ${left}% 100%,
        ${left}% ${top}%,
        ${100 - right}% ${top}%,
        ${100 - right}% ${100 - bottom}%,
        ${left}% ${100 - bottom}%,
        ${left}% 100%,
        100% 100%,
        100% 0%
      )`;
    },
    // 动态生成背景样式
    backgroundStyle() {
      return {
        background: this.color.includes("rgba")
          ? this.color
          : this.hexToRgba(this.color, this.opacity),
      };
    },
  },
  watch: {
    // 监听regions变化，重新启动动画
    regions: {
      handler(newRegions) {
        if (this.useDynamic && newRegions.length > 0) {
          this.startDynamicHighlight();
        }
      },
      deep: true,
    },
    // 监听useDynamic变化
    useDynamic(newVal) {
      if (newVal && this.regions.length > 0) {
        this.startDynamicHighlight();
      } else {
        this.stopDynamicHighlight();
      }
    },
  },
  mounted() {
    // 如果启用动态模式且有区域配置，则启动动画
    if (this.useDynamic && this.regions.length > 0) {
      this.startDynamicHighlight();
    }
  },
  beforeDestroy() {
    // 组件销毁前清除定时器
    this.stopDynamicHighlight();
  },
  methods: {
    // 将十六进制颜色转换为 rgba
    hexToRgba(hex, opacity) {
      // 如果已经是 rgba 格式，直接返回
      if (hex.startsWith("rgba")) {
        return hex;
      }

      // 移除可能的 # 前缀
      hex = hex.replace("#", "");

      // 解析 RGB 值
      let r, g, b;
      if (hex.length === 3) {
        r = parseInt(hex.substring(0, 1) + hex.substring(0, 1), 16);
        g = parseInt(hex.substring(1, 2) + hex.substring(1, 2), 16);
        b = parseInt(hex.substring(2, 3) + hex.substring(2, 3), 16);
      } else {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
      }

      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    },
    // 启动动态高亮
    startDynamicHighlight() {
      // 清除现有定时器
      this.stopDynamicHighlight();

      if (this.regions.length === 0) return;

      // 设置第一个区域
      this.setRegion(0);

      // 如果只有一个区域，不需要设置定时器
      if (this.regions.length === 1) {
        setTimeout(() => {
          this.$emit("finish");
        }, this.regions[0].duration || 3000);
        return;
      }

      // 设置定时器，循环切换区域
      this.timer = setTimeout(() => {
        this.nextRegion();
      }, this.regions[0].duration || 3000);
    },
    // 停止动态高亮
    stopDynamicHighlight() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
    // 设置指定索引的区域
    setRegion(index) {
      if (!this.regions[index]) return;

      const region = this.regions[index];
      this.currentTop = region.top || this.top;
      this.currentRight = region.right || this.right;
      this.currentBottom = region.bottom || this.bottom;
      this.currentLeft = region.left || this.left;
      this.currentIndex = index;
    },
    // 切换到下一个区域
    nextRegion() {
      // 全部高亮完成后触发
      if (this.currentIndex + 1 >= this.regions.length) {
        this.$emit("finish");
        return;
      }
      const nextIndex = (this.currentIndex + 1) % this.regions.length;
      this.setRegion(nextIndex);

      // 设置下一个定时器
      this.timer = setTimeout(() => {
        this.nextRegion();
      }, this.regions[nextIndex].duration || 3000);
    },
    // 外部控制方法：开始动态高亮
    start() {
      if (this.regions.length > 0) {
        this.useDynamic = true;
        this.startDynamicHighlight();
      }
    },
    // 外部控制方法：停止动态高亮
    stop() {
      this.useDynamic = false;
      this.stopDynamicHighlight();
    },
    // 外部控制方法：更新区域配置
    updateRegions(regions) {
      this.regions = regions;
    },
  },
};
</script>

<style lang="less" scoped>
.highlight-rect-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* 允许点击穿透 */
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 0 0 15px rgba(0, 200, 255, 0.6), 0 0 30px rgba(0, 150, 255, 0.4),
    0 0 45px rgba(0, 100, 255, 0.2), inset 0 0 20px rgba(0, 200, 255, 0.3);
}

/* 角标装饰 */
.corner {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(0, 200, 255, 0.8);
  z-index: 2;
}

.corner-tl {
  border-right: none;
  border-bottom: none;
  animation: cornerTL 2s ease-in-out infinite;
}

.corner-tr {
  border-left: none;
  border-bottom: none;
  animation: cornerTR 2s ease-in-out infinite;
}

.corner-bl {
  border-right: none;
  border-top: none;
  animation: cornerBL 2s ease-in-out infinite;
}

.corner-br {
  border-left: none;
  border-top: none;
  animation: cornerBR 2s ease-in-out infinite;
}

.bottom-line {
  position: absolute;
  height: 5px;
  background: linear-gradient(
    90deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  z-index: 3;
  background-size: 400% 100%;
  animation: neon-flow 6s linear infinite;
  filter: blur(0.5px);
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.7), 0 0 20px rgba(255, 115, 0, 0.5),
    0 0 30px rgba(255, 251, 0, 0.3);
}

@keyframes neon-flow {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 400% 50%;
  }
}

@keyframes cornerTL {
  0%,
  100% {
    transform: translate(0, 0);
    border-color: rgba(0, 200, 255, 0.8);
  }
  50% {
    transform: translate(-5px, -5px);
    border-color: rgba(0, 255, 255, 1);
  }
}

@keyframes cornerTR {
  0%,
  100% {
    transform: translate(0, 0);
    border-color: rgba(0, 200, 255, 0.8);
  }
  50% {
    transform: translate(5px, -5px);
    border-color: rgba(0, 255, 255, 1);
  }
}

@keyframes cornerBL {
  0%,
  100% {
    transform: translate(0, 0);
    border-color: rgba(0, 200, 255, 0.8);
  }
  50% {
    transform: translate(-5px, 5px);
    border-color: rgba(0, 255, 255, 1);
  }
}

@keyframes cornerBR {
  0%,
  100% {
    transform: translate(0, 0);
    border-color: rgba(0, 200, 255, 0.8);
  }
  50% {
    transform: translate(5px, 5px);
    border-color: rgba(0, 255, 255, 1);
  }
}
</style>
