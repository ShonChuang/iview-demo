import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/login/Login.vue';

describe('Login.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
