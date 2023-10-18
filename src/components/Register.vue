<template>
  <div class="login-vue" :style="bg">
    <div class="container">
      <p class="title">欢迎注册CSSA管理后台</p>
      <Form :model="userInfo" :label-width="80">
        <FormItem label="姓名">
          <Input type="text" v-model="userInfo.name" placeholder="请输入中文姓名"></Input>
        </FormItem>
        <FormItem label="邮箱">
          <Input type="text" v-model="userInfo.email" placeholder="请输入邮箱，无需wisc邮箱"></Input>
        </FormItem>
        <FormItem label="部门">
          <Select v-model="userInfo.department" placeholder="请选择部门">
            <Option value="JISHU">技术部</Option>
            <Option value="DUOMEITI">多媒体部</Option>
            <Option value="HUODONG">活动部</Option>
            <Option value="WAILIAN">外联部</Option>
            <Option value="XUANCHUAN">宣传部</Option>
            <Option value="YANJIUSHENG">研究生部</Option>
          </Select>
        </FormItem>
        <FormItem label="密码" prop="password">
            <Input type="password" v-model="userInfo.password"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="passwordCheck">
            <Input type="password" v-model="userInfo.passwordCheck"></Input>
        </FormItem>
        <FormItem>
          <Button
            :loading="isShowLoading"
            class="submit"
            type="primary"
            @click="submit"
            >注册</Button
          >
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import { login } from "@/api";
export default {
  name: "register",
  data() {
    return {
      account: "admin",
      pwd: "admin",
      accountError: "",
      pwdError: "",
      isShowLoading: false,
      bg: {},
      userInfo: {},
      token: "",
    };
  },
  created() {
    this.token = this.$route.params.token;
    this.bg.backgroundImage =
      "url(" +
      require("../assets/imgs/bg0" + new Date().getDay() + ".jpg") +
      ")";
  },
  methods: {
    forgetPwd() {},
    submit() {
      if (this.account.length === 0) {
        this.accountError = "请填写账号";
        return;
      } else if (this.pwd.length === 0) {
        this.pwdError = "请填写密码";
        return;
      }
      this.isShowLoading = true;
      login(this.account, this.pwd)
        .then((res) => {
          if (res.status == 301) {
            this.pwdError = "用户名或密码错误";
          } else if (res.status == 100) {
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            localStorage.setItem("token", JSON.stringify(res.data.token));
            this.$router.push({ path: this.redirect || "/" });
          }
          this.isShowLoading = false;
        })
        .catch((e) => {
          this.isShowLoading = false;
        });
    },
  },
};
</script>

<style>
.login-vue {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
}
.login-vue .container {
  background: rgba(255, 255, 255, 0.5);
  text-align: center;
  border-radius: 10px;
  width: 500px;
  padding: 30px 110px 30px 30px;
}
.login-vue .ivu-input {
  color: #fff;
  outline: #fff;
  border-color: #fff;
}

.login-vue .title {
  font-size: 16px;
  margin-bottom: 20px;
}
.login-vue .error {
  color: red;
  text-align: left;
  margin: 5px auto;
  font-size: 12px;
  padding-left: 30px;
  height: 20px;
}
.login-vue .account {
  margin-top: 30px;
}
.login-vue .account span {
  cursor: pointer;
}
.login-vue .ivu-icon {
  color: #eee;
}
.login-vue .ivu-icon-ios-close-circle {
  color: #777;
}
input{
  width: 400px;
}
</style>
