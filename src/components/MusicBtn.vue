<template>
  <div class="music-btn">
    <router-link to="/music/topList" class="span">推荐</router-link>
    <router-link to="/music/search" class="span">搜索</router-link>
    <router-link to="/music/playList" class="span">正在播放</router-link>
    <router-link to="/music/myList" class="span">我的歌单</router-link>
    <router-link to="/music/historyList" class="span">播放历史</router-link>
    <router-link to="/music/log" class="span">建站日志</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.music-btn {
  height: 40px;
  margin: 0 0 40px;
  .span {
    display: inline-block;
    margin-right: 20px;
    border: 1px solid grey;
    padding: 10px 20px;
    cursor: pointer;
    text-decoration: none;
    color: #fff;
    &:hover,
    &:focus {
      border-color: #fff;
    }
  }
}
</style>
