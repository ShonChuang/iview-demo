import { shallowMount } from '@vue/test-utils';
import Layout from '@/layout/_Layout.vue';


describe('Login.vue', () => {
  it('layout的原件', () => {
    const wrapper = shallowMount(Layout);
    expect(wrapper.contains('div')).toBe(true);
    expect(wrapper.contains('Button')).toBe(true);
  });
});
