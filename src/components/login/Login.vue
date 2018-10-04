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
      <Input style="width:auto" v-model="password" type="password"/>
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
    {{posts}}123
    </Card>
  </div>
</template>

<script>
import VueRx from 'vue-rx';
import { Observable, interval, fromEvent, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import Vue from 'vue';

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
      },
      posts: ''
    };
  },
  methods: {
    doLogin(account, password) {
      this.accountalert = false;
      this.passwordalert = false;
      if (!account) this.accountalert = true;
      else if (!password) this.passwordalert = true;
      else {
        this.logindata = {
          status: 'success',
          token: '123456'
        };
        if (this.logindata.status === 'success') {
          this.GLOBAL.XSRF_TOKEN = this.logindata.token;
          // this.$router.push({ name: 'Layout' });
          this.callLoginAPI();
        }
      }
    },
    callLoginAPI() {
      const body = JSON.stringify({ AccountId: 'howard1', Password: 'abc123' });
      const headerss = new Headers({ 'Content-Type': 'application/json' });
      ajax
        .post('http://192.168.11.144/login', body, headerss)
        .pipe(catchError(error => console.log('error: ', error)))
        .subscribe((obs) => {
          console.log(obs);

          // this.posts = obs.response.result;
        });
    }
  }
};
</script>

<style>

</style>
