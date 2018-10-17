import { shallowMount } from '@vue/test-utils';
import Login from '@/components/login/Login.vue';

describe('Login.vue', () => {
  it('key account no key password.', () => {
    // const wrapper = shallowMount(
    //   Login,
    //   {
    //     data() {
    //       return {
    //         account: 'howard1',
    //         password: ''
    //       };
    //     }
    //   }
    // );
    const wrapper = shallowMount(Login);
    wrapper.setData({
      account: 'howard1',
      password: ''
    });
    // expect(wrapper.find('#loginbtn').element.id).toBe(false);
    expect(wrapper.vm.accountalert).toBe(false);
    expect(wrapper.vm.passwordalert).toBe(false);
    // wrapper.find('#loginbtn').trigger('click');
    wrapper.findAll('#loginbtn').trigger('click');
    console.log(wrapper);
    expect(wrapper.vm.account).toBe('howard1');
    expect(wrapper.vm.password).toBe('');
    expect(wrapper.vm.accountalert).toBe(false);
    expect(wrapper.vm.passwordalert).toBe(true);
    // expect(Login).toHaveBeenCalled();
  });
  // it('No key Password', () => {
  //   const user = {
  //     email: 'howard1',
  //     password: 'abd123'
  //   };

  //   doLogin(user.email, user.password);
  //   // wrapper.find('#passwordinput').da;
  //   // wrapper.find('#passwordinput').prop('onFocus')().trigger('keydown.enter');
  //   expect(wrapper.vm.passwordalert).toBe(true);
  // });
});
