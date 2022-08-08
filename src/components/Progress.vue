<template>
  <div
    class="music-progress"
    :style="{
      width: control === 'volume' ? '10vw' : '40vw',
    }"
    ref="progress"
    @click="barClick"
  >
    <!-- 总长 -->
    <div class="progress-total-bar"></div>
    <!-- 缓冲 -->
    <div class="progress-outer" ref="percentProgress"></div>
    <!-- 已播放 -->
    <div class="progress-inner" ref="progressInner">
      <div class="dot" @mousedown="bardown" @touchstart.prevent="bardown"></div>
    </div>
  </div>
</template>

<script>
const dotWidth = 10;
export default {
  data() {
    return {
      move: {
        status: false, //是否可拖动
        startX: 0, //记录最开始点击的x坐标
        left: 0, //记录当前已经移动的距离
      },
    };
  },
  props: {
    // 区分进度条和音量条
    control: {
      type: String,
    },
    // 进度
    percent: {
      type: [Number],
      default: 0,
    },
    // 歌曲缓冲
    percentProgress: {
      type: [Number],
      default: 0,
    },
  },
  mounted() {
    // console.log(this.control);
    this.$nextTick(() => {
      this.bindEvent();
      const barWidth = this.$refs.progress.clientWidth - dotWidth;
      const offsetWidth = this.percent * barWidth;
      this.moveSlide(offsetWidth);
    });
  },
  beforeDestroy() {
    this.unbindEvents();
  },
  watch: {
    percent(newPercent) {
      if (newPercent >= 0 && !this.move.status) {
        const barWidth = this.$refs.progress.clientWidth - dotWidth;
        const offsetWidth = newPercent * barWidth;
        this.moveSlide(offsetWidth);
      }
    },
    percentProgress(newValue) {
      let offsetWidth = this.$refs.progress.clientWidth * newValue;
      this.$refs.percentProgress.style.width = `${offsetWidth}px`;
    },
  },
  methods: {
    bindEvent() {
      // 添加绑定事件
      document.addEventListener("mousemove", this.barMove);
      document.addEventListener("mouseup", this.barUp);

      document.addEventListener("touchmove", this.barMove);
      document.addEventListener("touchend", this.barUp);
    },
    unbindEvents() {
      // 绑解事件
      document.removeEventListener("mousemove", this.barMove);
      document.removeEventListener("mouseup", this.barUp);

      document.removeEventListener("touchmove", this.barMove);
      document.removeEventListener("touchend", this.barUp);
    },
    // 鼠标按下事件
    bardown(e) {
      this.move.status = true;
      this.move.startX = e.clientX || e.touches[0].pageX;
      this.move.left = this.$refs.progressInner.clientWidth;
    },
    // 点击事件
    barClick(e) {
      let rect = this.$refs.progress.getBoundingClientRect(); //获取点击的位置
      let offsetWidth = Math.min(
        this.$refs.progress.clientWidth - dotWidth,
        Math.max(0, e.clientX - rect.left)
      );
      this.moveSlide(offsetWidth);
      this.commitPercent(true);
    },
    // 鼠标触摸移动事件
    barMove(e) {
      if (!this.move.status) {
        return false;
      }
      e.preventDefault();
      let endX = e.clientX || e.touches[0].pageX;
      let dist = endX - this.move.startX;
      let offsetWidth = Math.min(
        this.$refs.progress.clientWidth - dotWidth,
        Math.max(0, this.move.left + dist)
      );
      this.moveSlide(offsetWidth);
      this.commitPercent();
    },
    // 鼠标触摸移动事件
    barUp() {
      if (this.move.status) {
        this.commitPercent(true);
        this.move.status = false;
      }
    },
    // 移动滑块
    moveSlide(offsetWidth) {
      this.$refs.progressInner.style.width = `${offsetWidth}px`;
    },
    // 修改percent
    commitPercent(isEnd = false) {
      const lineWidth = this.$refs.progress.clientWidth - dotWidth;
      const percent = this.$refs.progressInner.clientWidth / lineWidth;
      this.$emit(isEnd ? "percentChangeEnd" : "percentChange", percent);
    },
  },
};
</script>

<style lang="scss" scoped>
.music-progress {
  margin: 16px 0;
  width: 1000px;
  // border: 1px solid #fff;
  height: 2px;
  background-color: #595755;
  margin-left: 10px;
  position: relative;
  cursor: pointer;

  .progress-inner {
    position: absolute;
    top: 50%;
    left: 5px;
    background-color: #fff;
    height: 2px;
    // position: ;
    .dot {
      position: absolute;
      top: 50%;
      right: -5px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #fff;
      transform: translateY(-50%);
    }
  }
}
</style>
