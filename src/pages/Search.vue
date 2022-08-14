<template>
  <div class="search">
    <!-- 搜索栏 -->
    <div class="header">
      <ul class="hot-key">
        <li
          v-for="(item, index) in Artists"
          :key="index"
          @click="clickHot(item.first)"
        >
          {{ item.first }}
        </li>
      </ul>
      <input
        type="text"
        placeholder="歌手/歌曲"
        v-model.trim="searchValue"
        @keyup.enter="onEnter"
      />
    </div>
    <!-- 搜索结果 -->
    <MusicList
      father="Search"
      :list="list"
      @select="selectItem"
      style="
         {
          height: calc(100% - 63px);
        }
      "
      tip="请输入关键词~"
    />
  </div>
</template>

<script>
import MusicList from "../components/MusicList.vue";
import { search, searchHot } from "../api";
import formatSongs from "@/utils/songs";
import { mapActions } from "vuex";
export default {
  components: { MusicList },
  data() {
    return {
      searchValue: "",
      Artists: [],
      list: [],
    };
  },
  methods: {
    onEnter() {
      // 搜索 歌曲/歌手
      if (this.searchValue.trim() === "") {
        alert("不能为空");
        return;
      }
      search(this.searchValue).then(({ result }) => {
        this.list = formatSongs(result.songs);
        console.log("搜索结果", this.list);
      });
    },
    selectItem(item, index) {
      //自定义事件：完成播放功能
      this.selectPlay({
        list: this.list,
        index,
      });
      console.log("播放", item, index);
    },
    clickHot(hotKey) {
      // 点击热搜
      this.searchValue = hotKey;
      this.onEnter();
    },
    ...mapActions(["selectPlay"]),
  },
  created() {
    //查询Artist
    searchHot().then(({ result }) => {
      this.Artists = result.hots.slice(0, 5);
    });
  },
};
</script>

<style lang="scss" scoped>
.search {
  overflow-y: hidden;
  height: 100%;
  .header {
    display: flex;
    justify-content: space-around;
    margin: 5px 5px 18px;

    .hot-key {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-around;
      li {
        // display: inline-block;
        margin: 0 5px;
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        flex-shrink: 1;
        cursor: pointer;
        &:hover {
          color: #fff;
        }
      }
    }
    input {
      padding: 10px;
      // width: 200px;
      background-color: transparent;
      border: 1px solid #ddd;
      // width: 80%;
      flex: 1;
    }
  }
}
</style>
