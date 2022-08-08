<template>
  <div id="details">
    <Loading v-model="LoadShow" />
    <musicList :list="list" @select="selectItem" />
  </div>
</template>

<script>
import MusicList from "../components/MusicList.vue";
import Loading from "../components/Loading.vue";
import { getPlaylistDetail } from "../api";
import { mapActions } from "vuex";
export default {
  components: { MusicList, Loading },
  data() {
    return {
      list: [],
      LoadShow: true,
    };
  },
  activated() {
    getPlaylistDetail(this.$route.params.id)
      .then((playlist) => {
        document.title = `${playlist.name}`;
        this.list = playlist.tracks;
        console.log(this.list);
        // this._hideLoad();
        this.LoadShow = false;
      })
      .catch(() => {
        console.log("err");
        // this._hideLoad();
      });
  },
  deactivated() {
    this.list = [];
    this.LoadShow = true;
  },
  methods: {
    selectItem(item, index) {
      //自定义事件：完成播放功能
      this.selectPlay({
        list: this.list,
        index,
      });
      console.log("播放", item, index);
    },
    ...mapActions(["selectPlay"]),
  },
};
</script>

<style></style>
