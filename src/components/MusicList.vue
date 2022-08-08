<template>
  <!-- 正在播放 -->
  <div
    class="playList"
    :style="{
      height: father === 'Search' ? '' : '100%',
      // overflowY: father === 'Search' ? 'scroll' : 'scroll',
    }"
  >
    <!-- <Loading v-model="LoadShow" /> -->
    <!-- 列表头 -->
    <div class="list-header">
      <span class="song">歌曲</span>
      <span class="singer">歌手</span>
      <span class="album">专辑</span>
      <span>时长</span>
    </div>
    <!-- 歌曲 -->
    <ul class="musicList">
      <li
        class="list-item"
        v-for="(item, index) in list"
        :key="index"
        @dblclick="selectItem(item, index, $event)"
      >
        <span>{{ index + 1 }}</span>
        <span class="song">{{ item.name }}</span>
        <span class="singer">{{ item.singer }}</span>
        <span class="album">{{ item.album }}</span>
        <span class="duration">{{ item.duration % 3600 | format }}</span>
      </li>
      <li class="list-item">
        <span>清空列表</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { format } from "../utils/util";
export default {
  props: ["father", "list"],
  filters: {
    format,
  },
  methods: {
    selectItem(item, index, e) {
      console.log(e);
      // alert(e);
      //考虑同首歌
      // this.setPlaying(!this.setPlaying);
      // return
      this.$emit("select", item, index); // 触发点击播放事件
    },
  },
};
</script>

<style scoped lang="scss">
.playList {
  // background-color: pink;
  overflow-y: scroll;
  // overflow-x: unset;
  // height: 100%;
  .list-header {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 5px 20px 5px 50px;

    span {
      color: rgba($color: #fff, $alpha: 0.5);
      flex-grow: 1;
      text-align: right;
    }
    .song {
      flex: 6 1 0%;
      text-align: left;
    }
    .singer {
      text-align: left;
      display: inline-block;
      width: 100px;
    }
    .album {
      display: inline-block;
      width: 250px;
      text-align: left;
      // flex-grow: 4;
    }
  }
  .musicList {
    // overflow-y: scroll;
    scrollbar-face-color: #44bc87;
    height: 430px;
    .list-item {
      padding: 0 20px 0px;
      height: 50px;
      line-height: 50px;
      display: flex;
      transition: all 0.5s;
      // border-bottom: 1px solid #ddd;
      &:nth-child(odd) {
        background-color: rgba(191, 188, 188, 0.3);
      }
      &:nth-child(even) {
        background-color: rgba(136, 135, 135, 0.3);
      }
      &:last-child {
        background-color: transparent;
      }
      &:hover {
        background-color: rgba(212, 212, 212, 0.3);
      }
      span {
        color: rgba($color: #fff, $alpha: 0.5);
        overflow: hidden;
        cursor: default;
      }
      .song {
        margin-left: 20px;
        flex: 3 1 0%;
        // display: inline-block;
      }
      .singer {
        // flex: 1 1 0%;
        // display: inline-block;
        width: 200px;
      }
      .album {
        width: 280px;
      }
      .duration {
        flex: 1 1 0%;
        display: inline-block;
        text-align: right;
      }
    }
    .list-item:last-child {
      border: none;
      justify-content: center;
      cursor: pointer;
    }
  }
}
</style>
