<template>
  <div id="log">
    <ul>
      <li>
        <span>2022.8.5</span>
        <p>实现播放历史</p>
      </li>
      <li>
        <span>2022.8.6</span>
        <p>实现播放实时进度条</p>
      </li>
      <li>
        <span>2022.8.6</span>
        <p>播放历史可点击歌曲播放</p>
      </li>
      <li>
        <span>2022.8.14</span>
        <p>播放模式弄得有点怪怪</p>
        <p>完成正在播放的列表预览</p>
        <p>新增实时滚动歌词</p>
      </li>
    </ul>
  </div>
</template>

<script></script>
<style scoped lang="scss">
#log {
  overflow-y: scroll;
  padding: 30px;
  z-index: 4;
  ul {
    li {
      position: relative;
      border-left: 1px solid #ddd;
      padding-left: 10px;
      &::before {
        content: "·";
        position: absolute;
        top: -23px;
        left: -20px;
        font-size: 40px;
        color: #fff;
      }
      p {
        line-height: 65px;
        text-indent: 2em;
      }
    }
  }
}
</style>
