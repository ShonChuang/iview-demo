import { shallowMount } from '@vue/test-utils';
import Login from '@/components/login/Login.vue';

describe('Login.vue', () => {
  it('No key Account', () => {
    const account = '';
    const wrapper = shallowMount(Login, {
      propsData: {
        account
      }
    });
    expect(wrapper.vm.accountalert).toBe(true);
  });
});
