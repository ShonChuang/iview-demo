<template>
  <div style="background-color: #f2f2f2">
    <Card style="width: 400px;text-align: left; margin-left: auto; margin-right: auto">

      <h1 slot="title" style="text-align: center;">登入呦</h1>
      帳號：
      <Input style="width:auto" v-model="account"/>
      <Alert show-icon type="error" v-show="accountalert" style="display:inline">請輸入帳號</Alert>
      <br>
      <br>
      密碼：
      <Input style="width:auto" v-model="password" type="password"
      v-on:keyup.13.native="doLogin(account,password)"/>
      <Alert show-icon type="error" v-show="passwordalert" style="display:inline">請輸入密碼</Alert>
      <br>
      <br>
      <div style="text-align: center">
        <Button
          style="text-align: center"
          type="success"
          @click="doLogin(account,password)"
        >
          登入
        </Button>
      </div>
    </Card>
  </div>
</template>

<script>
import VueRx from 'vue-rx';
import Vue from 'vue';
import { Alert, Button, Card, Input } from 'iview';
import Login from '@/services/login';

Vue.component('Alert', Alert);
Vue.component('Button', Button);
Vue.component('Card', Card);
Vue.component('Input', Input);

Vue.use(VueRx);
export default {
  data() {
    return {
      account: '',
      password: '',
      accountalert: false,
      passwordalert: false,
      logindata: {
        status: '',
        token: ''
      }
    };
  },
  beforeCreate() {
    // if (this.GLOBAL.XSRF_TOKEN !== '') {
    //   this.$router.push({ name: 'Layout' });
    // }
  },
  methods: {
    doLogin(account, password) {
      let errcount = 0;
      this.accountalert = false;
      this.passwordalert = false;
      if (!account) {
        this.accountalert = true;
        errcount += 1;
      }
      if (!password) {
        this.passwordalert = true;
        errcount += 1;
      }
      if (errcount === 0) {
        Login.callLoginAPI(account, password).subscribe(
          (obs) => {
            this.logindata = obs.response;
          },
          error => console.log(error),
          () => {
            if (this.logindata.status === '1') {
              this.GLOBAL.XSRF_TOKEN = this.logindata.data;
              this.$router.push({ name: 'Layout' });
            } else {
              console.log('error: ', this.logindata.data);
              this.$Message.info(this.logindata.statusMsg);
            }
          },
        );
      }
    }
  }
};
</script>
