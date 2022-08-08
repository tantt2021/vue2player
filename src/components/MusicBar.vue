<template>
  <div class="musicBar">
    <div class="music-bar-btn">
      <!-- 上一首 -->
      <span class="iconfont" @click="prev" title="上一首">&#xe63c;</span>
      <!-- 暂停 -->
      <span
        class="iconfont"
        @click="play"
        v-html="playing ? '&#xe616;' : '&#xe87c;'"
        title="暂停/播放"
      ></span>
      <!-- 下一首 -->
      <span class="iconfont" @click="next" title="下一首">&#xe63f;</span>
    </div>
    <!-- 播放进度条 -->
    <div class="progress-bar">
      <template v-if="currentMusic.id">
        <!-- 歌名 -->
        {{ currentMusic.name }}-{{ currentMusic.singer }}
        <!-- 播放时间 -->
        <p>
          {{ currentTime % 3600 | format }}/{{
            currentMusic.duration % 3600 | format
          }}
        </p>
      </template>
      <span v-else>未在播放</span>
      <!-- 进度条 -->
      <Progress
        :percent="percentMusic"
        :percent-progress="currentProgress"
        @percentChange="progressMusic"
        @percentChangeEnd="progressMusicEnd"
      />
    </div>
    <!-- 播放模式 -->
    <span class="iconfont mode">&#xe63e;</span>
    <!-- 评论 -->
    <span @click="openComment" class="iconfont comment"> &#xe891; </span>
    <!-- 音量 -->
    <Volume :volume="volume" @volumeChange="volumeChange" />
  </div>
</template>

<script>
import Progress from "./Progress.vue";
import playerMusic from "../utils/play";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { silencePromise } from "../utils/util";
import { playMode } from "@/config";
import { format } from "../utils/util";
import Volume from "./Volume.vue";
import { getVolume, setVolume } from "@/utils/storage";
export default {
  components: { Progress, Volume },
  data() {
    const volume = getVolume();
    return {
      musicReady: false, // 是否可使用播放器
      // playing: false, // 暂停
      volume, // 音量大小
      isMute: false, // 是否静音
      currentProgress: 0, // 缓冲进度
      currentTime: 0, // 当前播放时间
    };
  },
  filters: {
    format,
  },
  methods: {
    play() {
      // vuex
      // alert("暂停");
      // this.playing = !this.playing;
      if (!this.musicReady) {
        return;
      }
      this.setPlaying(!this.playing);
    },
    next(flag = false) {
      // 下一首
      if (!this.musicReady) {
        return;
      }
      console.log("下一首");
      const {
        playlist: { length },
      } = this;

      if (
        (length - 1 === this.currentIndex && this.mode === playMode.order) ||
        (length === 1 && flag)
      ) {
        this.setCurrentIndex(-1);
        this.setPlaying(false);
        return;
      }
      if (length === 1) {
        this.loop();
      } else {
        let index = this.currentIndex + 1;
        if (index === length) {
          index = 0;
        }
        if (!this.playing && this.musicReady) {
          this.setPlaying(true);
        }
        this.setCurrentIndex(index);
        this.musicReady = false;
      }
    },
    prev() {
      // 上一首
      if (!this.musicReady) {
        return;
      }
      console.log("上一首");
      if (this.playlist.length === 1) {
        //处理循环播放的上一首
        this.loop();
      } else {
        let index = this.currentIndex - 1;
        if (index < 0) {
          index = this.playlist.length - 1; //第一首的上一首是列表最后一首
        }
        this.setCurrentIndex(index);
        if (!this.playing && this.musicReady) {
          this.setPlaying(true);
        }
        this.musicReady = false;
      }
    },
    loop() {
      // 循环
      this.audioEle.currentTime = 0;
      silencePromise(this.audioEle.play());
      this.setPlaying(true);
    },
    ...mapMutations({
      setPlaying: "SET_PLAYING",
      setCurrentIndex: "SET_CURRENTINDEX",
    }),
    ...mapActions(["setHistory"]),
    // 跳转到评论界面
    openComment() {
      if (!this.currentMusic.id) {
        alert("还没有播放音乐");
        return false;
      }
      this.$router.push(`/music/comment/${this.currentMusic.id}`);
    },
    // 修改音量
    volumeChange(percent) {
      this.isMute = percent === 0 ? true : false;
      this.volume = percent;
      this.audioEle.volume = percent;
      setVolume(percent);
    },
    // 修改音乐显示时长
    progressMusic(percent) {
      this.currentTime = this.currentMusic.duration * percent;
    },
    // 修改音乐进度
    progressMusicEnd(percent) {
      this.audioEle.currentTime = this.currentMusic.duration * percent;
    },
  },
  mounted() {
    this.$nextTick(() => {
      playerMusic.initAudio(this);
      this.volumeChange(this.volume);
    });
  },
  watch: {
    currentMusic(newMusic) {
      this.currentTime = this.currentProgress = 0;
      this.audioEle.src = newMusic.url;
      silencePromise(this.audioEle.play());
    },
    playing(newPlaying) {
      const audio = this.audioEle;
      this.$nextTick(() => {
        newPlaying ? silencePromise(audio.play()) : audio.pause();
        this.musicReady = true;
      });
    },
    // currentTime(newTime) {
    //   // console.log(newTime, "newTime");
    // },
  },
  computed: {
    percentMusic() {
      const duration = this.currentMusic.duration;
      return this.currentTime && duration ? this.currentTime / duration : 0;
    },
    ...mapGetters([
      "currentMusic",
      "audioEle",
      "playing",
      "currentIndex",
      "mode",
      "playlist",
      "historyList",
    ]),
  },
};
</script>

<style lang="scss" scoped>
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
.musicBar {
  // background-color: #ddd;
  margin: 0 30px;
  height: 55px;
  span {
    cursor: pointer;
  }
  .music-bar-btn {
    display: inline-flex;
    width: 180px;
    justify-content: space-between;
  }
  .progress-bar {
    display: inline-block;
    margin: 0 50px;
    color: rgba(255, 255, 255, 0.5);
    vertical-align: top;
    p {
      float: right;
    }
  }
  .mode,
  .comment {
    margin-right: 25px;
  }
  .control-vloume {
    display: inline-flex;
  }
}
span {
  font-family: iconfont;
}
</style>
