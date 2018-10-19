<template>
  <div style="background-color: #f2f2f2">
    <Card style="width: 400px;text-align: left; margin-left: auto; margin-right: auto">

      <h1 slot="title" style="text-align: center;">登入呦</h1>
      帳號：
      <Input style="width:auto" v-model="account"
          id="accountinput"/>
      <Alert show-icon type="error" v-show="accountalert" style="display:inline">請輸入帳號</Alert>
      <br>
      <br>
      密碼：
      <Input style="width:auto" v-model="password" type="password"
          id="passwordinput"
      v-on:keyup.enter.native="doLogin(account,password)"/>
      <Alert show-icon type="error" v-show="passwordalert" style="display:inline">請輸入密碼</Alert>
      <br>
      <br>
      <div style="text-align: center">
        <Button
          id="loginbtn"
          style="text-align: center"
          type="success"
          @click.native="doLogin(account,password)"
        >
          登入
        </Button>
      </div>
    </Card>
  </div>
</template>

<script>
import { mergeMap } from 'rxjs/operators';
import VueRx from 'vue-rx';
import Vue from 'vue';
import { Alert, Button, Card, Input } from 'iview';
import loginService from '@/services/loginService';

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
      response: { status: '', statusMsg: '', data: '' },
      logindata: {
        status: '',
        token: ''
      }
    };
  },
  beforeCreate() {
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
        loginService.callLoginAPI(account, password)
          .subscribe(
            (obs) => {
              console.log('obs', obs);
              this.response = obs.response;
              console.log('response', this.response);
              this.logindata = obs.response;
            },
            error => console.log(error),
            () => {
              if (this.logindata.status === '1') {
                this.GLOBAL.XSRF_TOKEN = this.logindata.data;
                this.$router.push({ name: 'Layout' });
              } else {
                console.log('error: ', this.logindata.statusMsg);
                this.$Message.info(this.logindata.statusMsg);
              }
            },
          );
      }
    }
  }
};
</script>
