<template>
  <div id="root">
    <h1>音乐库</h1>
    <div class="login">
      <template v-if="user.userId">
        <router-link to="/music/myList">{{ user.nickname }}</router-link>
        <button @click="logout()">退出</button>
      </template>
      <button @click="isLogin = !isLogin" v-else>登录</button>
    </div>
    <div class="dialog" v-show="isLogin">
      <div class="dialog-box">
        <h3>登录</h3>
        <input
          type="number"
          placeholder="请输入你的网易云ID"
          v-model="uidValue"
        />
        <div class="operator">
          <button @click="isLogin = !isLogin">关闭</button>
          <button>帮助</button>
          <button @click="login()">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserPlaylist } from "../api";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      isLogin: false,
      uidValue: "",
      user: {},
    };
  },
  methods: {
    login() {
      // 发送登录请求
      if (this.uidValue.trim() === "") {
        alert("不能为空");
      } else {
        //发送
        this._GetUserPlaylist(this.uidValue);
        this.isLogin = !this.isLogin;
      }
    },
    _GetUserPlaylist(uid) {
      getUserPlaylist(uid).then(({ playlist = [] }) => {
        this.uidValue = "";
        if (playlist.length === 0 || !playlist[0].creator) {
          alert("查不到该用户的信息");
          return;
        }
        // const creator = playlist[0].creator;
        console.log(playlist[0].creator);
        this.user = playlist[0].creator;
        this.setUid(uid);
      });
    },
    logout() {
      this.user = {};
      this.setUid(null);
      alert("退出");
    },
    ...mapActions(["setUid"]),
  },
  computed: {
    ...mapGetters(["uid"]),
  },
  created() {
    this.uid && this._GetUserPlaylist(this.uid);
  },
};
</script>

<style scoped lang="scss">
.login {
  position: absolute;
  right: 15px;
  top: 30px;
  button {
    border: 0;
    background-color: transparent;
    margin-left: 10px;
    &:hover,
    &:active {
      color: #ddd;
    }
  }
}
#root {
  overflow: hidden;
  height: 60px;
  h1 {
    margin: 20px 30px 0;
    font-size: 35px;
  }
  .dialog {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(48, 48, 48, 0.8);
    // opacity: 0.5;
    z-index: 1;
    display: flex;
    // display: none;
    justify-content: center;
    align-items: center;
    .dialog-box {
      width: 300px;
      background-color: rgb(0, 0, 0);
      border-radius: 5px;
      h3 {
        margin: 10px;
      }
      input {
        padding: 5px;
        outline: none;
        border-color: #ddd;
        width: 92%;
        margin: 0 10px;
        color: #000;
      }
      .operator {
        margin: 10px;
        display: flex;
        justify-content: flex-end;
        button {
          outline: 0;
          border: 0;
          padding: 5px;
          margin: 0 5px;
          border-radius: 3px;
          color: grey;
          &:hover {
            background-color: #fff;
          }
        }
      }
    }
  }
}
</style>
