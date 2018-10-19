import { shallowMount, mount } from '@vue/test-utils';
import Login from '@/components/login/Login.vue';
import loginjs from '../mock/login';

describe('Login.vue', () => {
  it('沒打帳號密碼', () => {
    const account = '';
    const password = '';
    const wrapper = shallowMount(Login);
    wrapper.setData({
      account,
      password
    });
    const wvm = wrapper.vm;
    const button = wrapper.find('#loginbtn');
    button.trigger('click');
    expect(wvm.accountalert).toBe(true);
    expect(wvm.passwordalert).toBe(true);
  });
  it('沒打帳號', () => {
    const account = '';
    const password = 'abc123';
    const wrapper = shallowMount(Login);
    wrapper.setData({
      account,
      password
    });
    const wvm = wrapper.vm;
    const button = wrapper.find('#loginbtn');
    button.trigger('click');
    expect(wvm.accountalert).toBe(true);
    expect(wvm.passwordalert).toBe(false);
  });
  it('沒打密碼', () => {
    const account = 'howard1';
    const password = '';
    const wrapper = shallowMount(Login);
    wrapper.setData({
      account,
      password
    });
    const wvm = wrapper.vm;
    const button = wrapper.find('#loginbtn');
    button.trigger('click');
    expect(wvm.accountalert).toBe(false);
    expect(wvm.passwordalert).toBe(true);
  });
  it('都有打', () => {
    const account = 'howard1';
    const password = 'abc123';
    const wrapper = shallowMount(Login);
    wrapper.setData({
      account,
      password
    });
    const wvm = wrapper.vm;
    const button = wrapper.find('#loginbtn');
    button.trigger('click');
    expect(wvm.accountalert).toBe(false);
    expect(wvm.passwordalert).toBe(false);
  });
  it('頁面有button,input,div', () => {
    const wrapper = mount(Login);
    expect(wrapper.contains('Button')).toBe(true);
    expect(wrapper.contains('Input')).toBe(true);
    expect(wrapper.contains('div')).toBe(true);
    const button = wrapper.find('Button').element.id;
    console.log(button);

    // expect(vm.logindata.data).toBe(false);
  });
  it('按鈕是否可見', () => {
    const wrapper = mount(Login, loginjs);
    expect(wrapper.find('Button').isVisible()).toBe(true);
  });


  // 以下不OK


  it('打錯帳密', () => {
    const wrapper = mount(Login, {
      methods: {
        callLoginAPI() {
          return 'B777';
        }
      }
    });
    wrapper.setData({
      account: 'a',
      password: 'a'
    });
    const wvm = wrapper.vm;
    expect(wvm.account).toBe('a');
    expect(wvm.password).toBe('a');
    const button = wrapper.find('#loginbtn');
    button.trigger('click');
    // expect(vm.logindata.data).toBe(false);
  });
  it('是含有子結點', () => {
    const wrapper = mount(Login, loginjs);
    expect(wrapper.isEmpty()).toBe(false);
    expect(wrapper.find('#loginbtn').isEmpty()).toBe(false);
  });

  it('沒打密碼 By setValue', () => {
    const wrapper = shallowMount(Login);
    wrapper.setData({
      account: 'howard1',
      password: ''
    });
    const accinput = wrapper.findAll('#accountinput').at(0);
    console.log(accinput);
    accinput.element.value = '123';
    accinput.trigger('input');
    // accinput.setValue('howard777');
    const wvm = wrapper.vm;
    expect(wvm.account).toBe('howard1');
    expect(wvm.password).toBe('');
    expect(wvm.accountalert).toBe(false);
    expect(wvm.passwordalert).toBe(false);
    const button = wrapper.find('#loginbtn');
    button.trigger('click');
    expect(wvm.accountalert).toBe(false);
    expect(wvm.passwordalert).toBe(true);
  });
  it('打錯帳密嘗試', () => {
    const wrapper = mount(Login, loginjs);
    wrapper.setData({
      account: 'a',
      password: 'a'
    });
    const wvm = wrapper.vm;
    expect(wvm.account).toBe('a');
    expect(wvm.password).toBe('a');
    const button = wrapper.find('#loginbtn');
    button.trigger('click');
    // expect(wvm.logindata.status).toBe('1');
  });
});
