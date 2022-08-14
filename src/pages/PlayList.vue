<template>
  <div id="playList">
    <MusicList :list="playlist" @select="selectItem" tip="请先播放歌曲~" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import MusicList from "../components/MusicList.vue";
export default {
  components: { MusicList },
  computed: {
    ...mapGetters(["playing", "playlist", "currentMusic"]),
  },
  methods: {
    ...mapMutations({
      setPlaying: "SET_PLAYING",
      setCurrentIndex: "SET_CURRENTINDEX",
    }),
    // 播放暂停事件
    selectItem(item, index) {
      if (item.id !== this.currentMusic.id) {
        this.setCurrentIndex(index);
        this.setPlaying(true);
      }
    },
  },
};
</script>

<style></style>
