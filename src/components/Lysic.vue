<template>
  <div id="lysic">
    <div class="music-info">
      <div
        class="cover"
        :style="{
          backgroundImage: picUrl,
        }"
      ></div>
      <ul>
        <li>专辑 {{ currentMusic.album }}</li>
        <li>歌曲 {{ currentMusic.name }}</li>
        <li>歌手 {{ currentMusic.singer }}</li>
      </ul>
    </div>
    <!-- 滚动歌词 -->
    <div class="music-lysic"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Lysic",
  data() {
    return {};
  },
  computed: {
    picUrl() {
      return this.currentMusic.id
        ? `url(${this.currentMusic.image}?param=300y300)`
        : "../assets/player_cover.png";
    },
    ...mapGetters(["currentMusic"]),
  },
};
</script>

<style lang="scss" scoped>
#lysic {
  width: 300px;
  height: calc(100vh - 188px);
  position: relative;
  .music-info {
    // width: 300px;
    // background-color: blue;
    margin-bottom: 10px;
    // height: 300px;
    text-align: center;
    .cover {
      box-sizing: border-box;
      position: relative;
      background: url(../assets/player_cover.png);
      background-size: contain;
      width: 186px;
      height: 186px;
      margin: 0 auto;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 10px;
        width: 201px;
        height: 186px;
        background: url(../assets/album_cover_player.png);
      }
    }
    ul li {
      margin: 10px 0;
    }
  }
  .music-lysic {
    // width: 300px;
    // background-color: grey;
    // height: 230px;
    position: absolute;
    top: 275px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
