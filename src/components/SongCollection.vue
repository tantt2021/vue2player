<template>
  <div id="root">
    <ul id="songCollection" v-if="type === 'special'">
      <li v-for="(item, index) in father" :key="index">
        <span>{{ item.name }}</span>
        <router-link :to="{ path: `/music/details/${item.id}` }">
          <img :src="item.coverImgUrl" alt="" />
        </router-link>
      </li>
    </ul>
    <ul id="songCollection" v-else-if="type === 'hot'">
      <li v-for="(item, index) in father" :key="index">
        <span class="hot">{{ item.name }}</span>
        <router-link :to="{ path: `/music/details/${item.id}` }">
          <img :src="item.picUrl" alt="" />
        </router-link>
      </li>
    </ul>
    <ul id="mySongCollection" v-else>
      <li v-for="(item, index) in father" :key="index">
        <span :class="item.name.length <= 8 ? 'hot' : ''">{{ item.name }}</span>
        <router-link :to="{ path: `/music/details/${item.id}` }">
          <img :src="item.coverImgUrl" alt="" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // collection:[]
    };
  },
  props: ["father", "type"],
  watch: {
    father(newValue) {
      this.father = newValue;
      console.log("歌单数据已刷新", newValue);
    },
  },
};
</script>

<style scoped lang="scss">
#root {
  height: 100%;
}
#songCollection {
  display: flex;
  flex-flow: row wrap;
  li {
    margin: 20px;
    width: 130px;
    height: 130px;
    position: relative;
    span {
      display: block;
      position: absolute;
      bottom: -21px;
      left: 37px;
    }
    img {
      width: 130px;
      height: 130px;
    }
    .hot {
      width: 130px;
      position: absolute;
      top: 132px;
      left: 4px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
#mySongCollection {
  display: flex;
  flex-flow: row wrap;
  height: 100%;
  overflow-y: scroll;
  li {
    margin: 20px;
    width: 130px;
    height: 130px;
    position: relative;
    span {
      width: 130px;
      display: block;
      position: absolute;
      top: 135px;
      // left: 37px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    img {
      width: 130px;
      height: 130px;
    }
    .hot {
      width: 130px;
      position: absolute;
      top: 132px;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
