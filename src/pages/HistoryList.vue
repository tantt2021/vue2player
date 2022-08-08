<template>
  <div class="historyList">
    <MusicList
      v-if="historyList.length > 0"
      :list="historyList"
      @select="selectItem"
    />
    <Noresult v-else />
  </div>
</template>

<script>
import MusicList from "../components/MusicList.vue";
import Noresult from "@/base/Noresult";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { MusicList, Noresult },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["historyList"]),
  },
  methods: {
    selectItem(item, index) {
      this.selectPlay({
        list: this.historyList,
        index,
      });
      console.log("播放", item, index);
    },
    ...mapActions(["selectPlay"]),
  },
};
</script>

<style></style>
