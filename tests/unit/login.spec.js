import { shallowMount,mount } from '@vue/test-utils';
import Login from '@/components/login/Login.vue';
import Loginjs from '@/services/login';
jest.mock('rxjs')


describe('Login.vue', () => {
  it('沒打帳號密碼', () => {
    const wrapper = shallowMount(Login);
    wrapper.setData({
      account: '',
      password: ''
    });
    const vm = wrapper.vm;
    expect(vm.account).toBe('');
    expect(vm.password).toBe('');
    expect(vm.accountalert).toBe(false);
    expect(vm.passwordalert).toBe(false);
    const button = wrapper.find('#loginbtn');
    button.trigger('click');
    expect(vm.accountalert).toBe(true);
    expect(vm.passwordalert).toBe(true);
  });
  it('沒打帳號', () => {
    const wrapper = shallowMount(Login);
    wrapper.setData({
      account: '',
      password: 'abc123'
    });
    const vm = wrapper.vm;
    expect(vm.account).toBe('');
    expect(vm.password).toBe('abc123');
    expect(vm.accountalert).toBe(false);
    expect(vm.passwordalert).toBe(false);
    const button = wrapper.find('#loginbtn');
    button.trigger('click');
    expect(vm.accountalert).toBe(true);
    expect(vm.passwordalert).toBe(false);
  });
  it('沒打密碼', () => {
    const wrapper = shallowMount(Login);
    wrapper.setData({
      account: 'howard1',
      password: ''
    });
    const vm = wrapper.vm;
    expect(vm.account).toBe('howard1');
    expect(vm.password).toBe('');
    expect(vm.accountalert).toBe(false);
    expect(vm.passwordalert).toBe(false);
    const button = wrapper.find('#loginbtn');
    button.trigger('click');
    expect(vm.accountalert).toBe(false);
    expect(vm.passwordalert).toBe(true);
  });
  it('都有打', () => {
    const wrapper = shallowMount(
      Login
    );
    wrapper.setData({
      account: 'howard1',
      password: 'abc123'
    });
    const vm = wrapper.vm;
    expect(vm.account).toBe('howard1');
    expect(vm.password).toBe('abc123');
    expect(vm.accountalert).toBe(false);
    expect(vm.passwordalert).toBe(false);
    const button = wrapper.find('#loginbtn');
    button.trigger('click');
    expect(vm.accountalert).toBe(false);
    expect(vm.passwordalert).toBe(false);
  });
  it('打錯帳密', () => {
    const wrapper = mount(Login,{
      methods: {
        callLoginAPI () {
          return 'B777';
        }
      }
    });
    wrapper.setData({
      account: 'a',
      password: 'a'
    });
    const vm = wrapper.vm;
    expect(vm.account).toBe('a');
    expect(vm.password).toBe('a');
    expect(vm.accountalert).toBe(false);
    expect(vm.passwordalert).toBe(false);
    const button = wrapper.find('#loginbtn');
    button.trigger('click');
    expect(vm.accountalert).toBe(false);
    expect(vm.passwordalert).toBe(false);
    //expect(vm.logindata.data).toBe(false);
  });
});
