<template>
  <div class="music">
    <!-- 网易云音乐的音乐库 -->
    <div class="music-content">
      <!-- 左半主体：功能键+列表 -->
      <div class="music-left">
        <MusicBtn />
        <Common />
      </div>
      <!-- 右半主体：播放界面 -->
      <div class="music-right">
        <Lysic :lyric="lyric" :nolyric="nolyric" />
      </div>
    </div>
    <MusicBar :lyric="lyric" />

    <!-- 背景遮罩 -->
    <div class="player-bg" :style="{ backgroundImage: imgUrl }"></div>
  </div>
</template>

<script>
import MusicBtn from "../components/MusicBtn.vue";
import Common from "./Common.vue";
import { defaultBG } from "@/config";
import MusicBar from "../components/MusicBar.vue";
import Lysic from "../components/Lysic.vue";
import { mapGetters } from "vuex";
import { silencePromise, parseLyric } from "../utils/util";
import { getLyric } from "@/api";
export default {
  components: { MusicBtn, Common, MusicBar, Lysic },
  data() {
    return {
      lyric: [],
      nolyric: false, // 是否有歌词
      lyricIndex: 0, // 当前播放歌词下标
    };
  },
  computed: {
    imgUrl() {
      return this.currentMusic.id
        ? `url(${this.currentMusic.image}?param=300y300)`
        : `url(${defaultBG})`;
    },
    ...mapGetters(["currentMusic", "audioEle"]),
  },
  watch: {
    currentMusic(newM, oldM) {
      if (!newM.id) {
        this.lyric = [];
        return;
      }
      if (newM.id === oldM.id) {
        return;
      }
      this.audioEle.src = newM.url;
      // 重置
      this.lyricIndex = 0;
      silencePromise(this.audioEle.play());
      this.$nextTick(() => {
        this._getLyric(newM.id);
      });
    },
  },
  methods: {
    _getLyric(id) {
      getLyric(id).then((res) => {
        if (res.nolyric) {
          this.nolyric = true;
        } else {
          this.nolyric = false;
          this.lyric = parseLyric(res.lrc.lyric);
        }
        silencePromise(this.audioEle.play());
      });
    },
  },
};
</script>

<style scoped lang="scss">
.music {
  // margin: 13px 0;
  margin: 30px 30px 0;
  height: calc(100% - 143px);
  .music-content {
    display: flex;
    // margin: 30px;
    height: 100%;
    .music-left {
      flex-grow: 2;
      height: calc(100% - 60px - 55px);
    }
    .music-right {
      // flex-grow: 1;
      margin: 0 0 0 50px;
    }
  }

  // 遮罩
  .player-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    left: 0;
    z-index: -1;
    height: 100vh;
    background-size: cover;
    background-position: 50%;
    filter: blur(10px);
    transform: scale(1.1);
    overflow: hidden;
    // background-clip: content-box;
  }
  .player-bg::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    content: "";
    height: 100%;
  }
}

@media (max-width: 960px) {
  .music-right {
    display: none;
  }
}
</style>
