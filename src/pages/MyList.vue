<template>
  <!-- 难点：协调好没有登录、登陆了没数据、登陆有数据的情况 -->
  <div id="myList">
    <Loading v-if="find" />
    <SongCollection v-else-if="list.length > 0" :father="list" />
    <Noresult />
  </div>
</template>

<script>
import SongCollection from "../components/SongCollection.vue";
import Loading from "../components/Loading.vue";
import { getUserPlaylist } from "../api";
import { mapGetters } from "vuex";
import Noresult from "@/base/Noresult";
export default {
  components: { Loading, SongCollection, Noresult },
  data() {
    return {
      uidValue: "",
      list: [],
      find: false,
    };
  },
  methods: {
    _getUserPlaylist(uid) {
      getUserPlaylist(uid).then((res) => {
        if (res.playlist.length === 0) {
          alert(`未查询到UID为${uid}的用户歌单`);
          this.find = false;
          return;
        }
        this.list = res.playlist.slice(1);
        console.log("用户自己的歌单", this.list);
        this.find = false;
      });
    },
  },
  computed: {
    formatList() {
      return this.list.filter((item) => item.trackCount > 0);
    },
    ...mapGetters(["uid"]),
  },
  watch: {
    uid(newUid) {
      if (newUid) {
        this._getUserPlaylist(newUid);
      } else {
        this.list = [];
      }
    },
  },
  created() {
    this._getUserPlaylist(this.uid);
  },
};
</script>

<style></style>
