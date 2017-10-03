import Navheader from '@/components/navheader.vue'
import { mount } from 'avoriaz'
import router from '@/router'

describe('navheader.vue', () => {
  it('Document page is active', () => {
    const wrapper = mount(Navheader, {
      propsData: { activeSidebar: 'doc' },
      router: router
    })
    expect(wrapper.find('#navheader-doc')[0].hasClass('active')).to.equal(true)
    expect(wrapper.find('#navheader-viz')[0].hasClass('active')).to.equal(false)
    expect(wrapper.find('#navheader-about')[0].hasClass('active')).to.equal(false)
  })

  it('Vizualization page is active', () => {
    const wrapper = mount(Navheader, {
      propsData: { activeSidebar: 'viz' },
      router: router
    })
    expect(wrapper.find('#navheader-doc')[0].hasClass('active')).to.equal(false)
    expect(wrapper.find('#navheader-viz')[0].hasClass('active')).to.equal(true)
    expect(wrapper.find('#navheader-about')[0].hasClass('active')).to.equal(false)
  })

  it('About page is active', () => {
    const wrapper = mount(Navheader, {
      propsData: { activeSidebar: 'about' },
      router: router
    })
    expect(wrapper.find('#navheader-doc')[0].hasClass('active')).to.equal(false)
    expect(wrapper.find('#navheader-viz')[0].hasClass('active')).to.equal(false)
    expect(wrapper.find('#navheader-about')[0].hasClass('active')).to.equal(true)
  })

  it('Press toggle', () => {
    const toggleSideBar = sinon.spy(Navheader.methods, 'toogleSideBar')
    const wrapper = mount(Navheader, {
      propsData: { activeSidebar: 'viz' },
      router: router
    })

    wrapper.find('.navbar-toggle')[0].trigger('click')

    expect(toggleSideBar).to.be.calledOnce
  })
})
