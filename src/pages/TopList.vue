<template>
  <div id="topList">
    <h3>云音乐特色</h3>
    <ul class="topList-content">
      <SongCollection :father="list" type="special" />
    </ul>
    <h3>热门榜单</h3>
    <ul class="topList-content">
      <SongCollection :father="hotList" type="hot" />
    </ul>
  </div>
</template>

<script>
import SongCollection from "../components/SongCollection.vue";
import { getToplistDetail, getPersonalized } from "../api";
export default {
  components: { SongCollection },
  data() {
    return {
      list: [],
      hotList: [],
    };
  },
  created() {
    Promise.all([getToplistDetail(), getPersonalized()])
      .then(([toplist, hotList]) => {
        this.list = toplist.list.filter((v) => v.ToplistType);
        this.hotList = hotList.result.slice();
        // this.hotlist = hotlist;
        console.log(this.list, this.hotList);
      })
      .catch(() => {});
  },
};
</script>

<style lang="scss" scoped>
#topList {
  overflow-y: scroll;
  height: 100%;
  h3 {
    padding: 20px 0;
  }
  .topList-content {
    display: flex;
    flex-flow: row wrap;
    // overflow: hidden;
    // overflow-y: scroll;
  }
}
</style>
