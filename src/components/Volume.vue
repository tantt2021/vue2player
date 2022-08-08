<template>
  <div class="control-vloume">
    <span
      class="iconfont"
      @click="handleToggleVolume"
      v-html="isMute ? '&#xe612;' : '&#xe629;'"
    ></span>

    <Progress
      control="volume"
      :percent="volumeProgress"
      @percentChangeEnd="handleVolumeChange"
      @percentChange="handleVolumeChange"
      style="
         {
          vertical-align: bottom;
        }
      "
    />
  </div>
</template>

<script>
import Progress from "./Progress.vue";

export default {
  components: { Progress },
  props: {
    volume: {
      type: Number,
      required: true,
    },
  },
  computed: {
    volumeProgress() {
      return this.volume;
    },
    isMute: {
      get() {
        return this.volumeProgress === 0;
      },
      set(newMute) {
        const volume = newMute ? 0 : this.lastVolume;
        if (newMute) {
          this.lastVolume = this.volumeProgress;
        }
        this.handleVolumeChange(volume);
      },
    },
  },
  methods: {
    handleVolumeChange(percent) {
      this.$emit("volumeChange", percent);
    },
    // 控制静音
    handleToggleVolume() {
      this.isMute = !this.isMute;
    },
  },
};
</script>

<style scoped lang="scss">
@font-face {
  font-family: "iconfont"; /* Project id 3521691 */
  src: url("../style/iconfont.woff2?t=1657771955372") format("woff2"),
    url("../style/iconfont.woff?t=1657771955372") format("woff"),
    url("../style/iconfont.ttf?t=1657771955372") format("truetype");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 36px;
  font-style: normal;
  color: #fff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  user-select: none;
  &:hover {
    color: #44bc87;
  }
}
</style>
