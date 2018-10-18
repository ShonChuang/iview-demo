export default {
  callLoginAPI(account, password) {
    console.log(123);

    return {
      response:
      {
        status: '2',
        statusMsg: '錯誤的帳號或密碼',
        data: account + password
      }
    };
  }
};
