<template>
  <div id="noResult">
    <p>{{ tip }}</p>
  </div>
</template>

<script>
export default {
  props: {
    tip: {
      type: String,
      default: "什么都没有，请先登录吧~",
    },
  },
};
</script>

<style scoped lang="scss">
#noResult {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
