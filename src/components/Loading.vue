<template>
  <div id="loading" v-show="value">
    <svg viewBox="25 25 50 50">
      <circle cx="50" cy="50" r="20" fill="none" />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
#loading {
  width: 100%;
  height: 100%;
  background-color: rgba(100, 100, 100, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  svg {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    transform: translateY(-50%);
    circle {
      animation: loading-dash 1.5s ease-in-out infinite;
      stroke-dasharray: 90, 150;
      stroke-dashoffset: 0;
      stroke-width: 2;
      stroke: #fff;
      stroke-linecap: round;
    }
  }
}

@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
</style>
