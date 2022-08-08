<template>
  <div id="comment">
    <h3>精彩评论</h3>
    <ul class="commentList">
      <li v-for="(comment, index) in hotComments" :key="index">
        <img :src="comment.user.avatarUrl" alt="" />
        <h4>{{ comment.user.nickname }}</h4>
        <p>
          {{ comment.content }}
        </p>
        <span>{{ comment.time | format }}</span>
        <i>{{ comment.likeCount }}</i>
      </li>
    </ul>
    <p>没有更多评论了...</p>
  </div>
</template>

<script>
import { getComment } from "../api";
import { addZero } from "../utils/util";
export default {
  data() {
    return {
      page: 0, //分页
      hotComments: [], // 精彩评论
      commenList: [], // 最新评论
    };
  },
  activated() {
    this.initComment();
  },
  methods: {
    // 获取评论
    initComment() {
      getComment(this.$route.params.id, this.page).then((res) => {
        this.hotComments = res.hotComments;
        this.commenList = res.comments;
        this.total = res.total;
        console.log("获取评论", this.hotComments);
        // this.lockUp = true,
      });
    },
  },
  filters: {
    format(time) {
      let formatTime;
      const date = new Date(time);
      const dateObj = {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
      };
      const newTime = new Date();
      const diff = newTime.getTime() - time;
      if (newTime.getDate() === dateObj.date && diff < 60000) {
        formatTime = "刚刚";
      } else if (
        newTime.getDate() === dateObj.date &&
        diff > 60000 &&
        diff < 86400000
      ) {
        formatTime = `${addZero(dateObj.hours)}:${addZero(dateObj.minutes)}`;
      } else if (newTime.getDate() !== dateObj.date && diff < 86400000) {
        formatTime = `昨天${addZero(dateObj.hours)}:${addZero(
          dateObj.minutes
        )}`;
      } else if (newTime.getFullYear() === dateObj.year) {
        formatTime = `${dateObj.month + 1}月${dateObj.date}日`;
      } else {
        formatTime = `${dateObj.year}年${dateObj.month + 1}月${dateObj.date}日`;
      }
      return formatTime;
    },
  },
};
</script>

<style lang="scss" scoped>
#comment {
  // overflow: visible;
  overflow-y: scroll;
  h3 {
    margin: 10px;
  }
  .commentList {
    display: flex;
    flex-direction: column;
    li {
      width: 100%;
      // height: 80px;
      // background-color: pink;
      margin: 10px 0;
      padding: 10px 10px 5px 50px;
      position: relative;
      border-bottom: 1px solid #ddd;
      img {
        position: absolute;
        top: 15px;
        left: 15px;
        width: 15px;
        height: 15px;
      }
      span {
        position: absolute;
        bottom: 10px;
        left: 50px;
      }
      i {
        position: absolute;
        bottom: 10px;
        right: 15px;
      }
      p {
        margin: 10px 0px 30px;
        word-break: break-all;
        text-align: left;
      }
    }
  }
  p {
    margin: 20px;
    text-align: center;
  }
}
</style>
