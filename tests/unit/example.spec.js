import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld);
    wrapper.setProps({ msg });
    expect(wrapper.vm.msg).toMatch(msg);
  });
  it('props有值', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.props().msg).toBe(msg);
    expect(wrapper.props('msg')).toBe(msg);
  });


  // 以下不OK


  it('含有子結點', () => {
    const wrapper = shallowMount(HelloWorld);
    expect(wrapper.is('div')).toBe(true);
    expect(wrapper.find('div').is('div')).toBe(true);
    expect(wrapper.find('p').is('p')).toBe(true);
  });
});
