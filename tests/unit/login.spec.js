import { shallowMount, mount } from '@vue/test-utils';
import Login from '@/components/login/Login.vue';
import loginjs from '../mock/login';

describe('Login.vue', () => {
  it('沒打帳號密碼', () => {
    const wrapper = shallowMount(Login);
    wrapper.setData({
      account: '',
      password: ''
    });
    const wvm = wrapper.vm;
    expect(wvm.account).toBe('');
    expect(wvm.password).toBe('');
    expect(wvm.accountalert).toBe(false);
    expect(wvm.passwordalert).toBe(false);
    const button = wrapper.find('#loginbtn');
    button.trigger('click');
    expect(wvm.accountalert).toBe(true);
    expect(wvm.passwordalert).toBe(true);
  });
  it('沒打帳號', () => {
    const wrapper = shallowMount(Login);
    wrapper.setData({
      account: '',
      password: 'abc123'
    });
    const wvm = wrapper.vm;
    expect(wvm.account).toBe('');
    expect(wvm.password).toBe('abc123');
    expect(wvm.accountalert).toBe(false);
    expect(wvm.passwordalert).toBe(false);
    const button = wrapper.find('#loginbtn');
    button.trigger('click');
    expect(wvm.accountalert).toBe(true);
    expect(wvm.passwordalert).toBe(false);
  });
  it('沒打密碼', () => {
    const wrapper = shallowMount(Login);
    wrapper.setData({
      account: 'howard1',
      password: ''
    });
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
  it('都有打', () => {
    const wrapper = shallowMount(Login);
    wrapper.setData({
      account: 'howard1',
      password: 'abc123'
    });
    const wvm = wrapper.vm;
    expect(wvm.account).toBe('howard1');
    expect(wvm.password).toBe('abc123');
    expect(wvm.accountalert).toBe(false);
    expect(wvm.passwordalert).toBe(false);
    const button = wrapper.find('#loginbtn');
    button.trigger('click');
    expect(wvm.accountalert).toBe(false);
    expect(wvm.passwordalert).toBe(false);
  });
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
  it('頁面有button,input,div', () => {
    const wrapper = mount(Login);
    expect(wrapper.contains('Button')).toBe(true);
    expect(wrapper.contains('Input')).toBe(true);
    expect(wrapper.contains('div')).toBe(true);
    const button = wrapper.find('Button').element.id;
    console.log(button);

    // expect(vm.logindata.data).toBe(false);
  });
  it('打錯帳密', () => {
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
    expect(wvm.logindata.status).toBe('1');
  });
});
