<template>
  <div class="root">
    <Header />
    <Music />
    <!-- 播放器 -->
    <audio ref="player"></audio>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import Header from "./components/Header.vue";
import Music from "./pages/Music.vue";
export default {
  name: "App",
  components: { Header, Music },
  created() {
    // 设置audio元素
    this.$nextTick(() => {
      this.setAudioele(this.$refs.player);
    });
  },
  methods: {
    ...mapMutations({
      setAudioele: "SET_AUDIOELE",
    }),
    ...mapActions(["setPlaylist"]),
  },
};
</script>

<style lang="scss" scoped>
$nav-color: #f90;
nav {
  $width: 100px;
  width: $width;
  color: $nav-color;
}
.root {
  overflow: hidden;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
</style>
