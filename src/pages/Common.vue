<template>
  <keep-alive>
    <router-view class="content"></router-view>
  </keep-alive>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.content {
  // background-color: rgba(255, 255, 255, 0.5);
  // height: 63vh;
  // overflow-y: scroll;
  // background-color: pink;
  height: 100%;
  // flex-grow: 1;
  // max-height: calc(100% -115px);
  // height: 63.2vh;
  position: relative;
}
</style>
