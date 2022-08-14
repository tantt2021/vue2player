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
    <div class="music-lysic" ref="musicLyric">
      <div class="music-lyric-items" :style="lyricTop">
        <p v-if="!currentMusic.id">暂无播放音乐</p>
        <p v-else-if="nolyric">暂无播放音乐</p>
        <template v-else-if="lyric.length > 0">
          <p
            v-for="(item, index) in lyric"
            :key="index"
            :class="{ on: lyricIndex === index }"
          >
            {{ item.text }}
          </p>
        </template>
        <p v-else>歌词加载失败</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import bus from "../utils/bus";
export default {
  name: "Lysic",
  props: {
    lyric: {
      type: Array,
      default: () => [],
    },
    nolyric: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      top: 0, // 歌词滚动
      lyricIndex: 0,
    };
  },
  computed: {
    picUrl() {
      return this.currentMusic.id
        ? `url(${this.currentMusic.image}?param=300y300)`
        : "../assets/player_cover.png";
    },
    ...mapGetters(["currentMusic"]),
    lyricTop() {
      return `transform :translate3d(0,${
        -34 * (this.lyricIndex - this.top)
      }px,0)`;
    },
  },
  mounted() {
    window.addEventListener("resize", () => {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => this.clacTop(), 60);
    });
    this.$nextTick(() => this.clacTop());

    bus.$on("currentLyricIndex", (data) => {
      this.lyricIndex = data;
    });
  },
  methods: {
    clacTop() {
      console.log("1111");
      const dom = this.$refs.musicLyric;
      const { display = "" } = window.getComputedStyle(dom);
      if (display === "none") {
        return;
      }
      const height = dom.offsetHeight;
      this.top = Math.floor(height / 34 / 2);
    },
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
    overflow: hidden;
    position: absolute;
    top: 275px;
    bottom: 0;
    left: 0;
    right: 0;
    mask-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.6) 15%,
      rgba(255, 255, 255, 1) 25%,
      rgba(255, 255, 255, 1) 75%,
      rgba(255, 255, 255, 0.6) 85%,
      rgba(255, 255, 255, 0) 100%
    );
    .music-lyric-items {
      text-align: center;
      font-size: 10px;
      transform: translate3d(0, 0, 0);
      transition: transform 0.6s ease-out;
      line-height: 34px;
      .on {
        color: #44bc87;
      }
    }
  }
}
</style>
