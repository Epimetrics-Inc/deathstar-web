import Navsearch from '@/components/navsearch.vue'
import { mount } from 'avoriaz'

describe('navsearch.vue', () => {
/*
* Document list testing
*/
  it('Select and deselect methods', done => {
    const wrapper = mount(Navsearch)

    wrapper.vm.$watch('aoDocuments', function (newVal, oldVal) { // must retrieve aodocuments first
      wrapper.vm.selectAll()
      expect(wrapper.vm.checkedAOs.length).to.equal(wrapper.vm.aoDocuments.length)
      wrapper.vm.deselectAll()
      expect(wrapper.vm.checkedAOs.length).to.equal(0)
      done()
    })
  })

  it('select 1 and select all', done => {
    const wrapper = mount(Navsearch, {
      propsData: { activeSidebar: 'viz' }
    })

    wrapper.vm.$watch('aoDocuments', function (newVal, oldVal) { // must retrieve aodocuments first
      wrapper.update()
      wrapper.vm.checkedAOs.push('AO No. 2017-0001-J')
      wrapper.update()
      expect(wrapper.vm.checkedAOs.length).to.equal(1)

      wrapper.first('#selectAll').trigger('click')
      wrapper.update()
      expect(wrapper.vm.checkedAOs.length).to.equal(wrapper.vm.aoDocuments.length + 1)

      done()
    })
  })

  // it('select 1 and deselect all', () => {
  //   const wrapper = mount(Navsearch, {
  //     propsData: { activeSidebar: 'viz' }
  //   })

  //   wrapper.vm.checkedAOs.push('AO No. 2017-0001-J')
  //   expect(wrapper.vm.checkedAOs.length).to.equal(1)

  //   wrapper.first('#deselectall').trigger('click')
  //   wrapper.update()
  //   expect(wrapper.vm.checkedAOs.length).to.equal(0)
  // })

  it('render ao list', done => {
    const wrapper = mount(Navsearch, {
      propsData: { activeSidebar: 'doc' }
    })

    wrapper.vm.$watch('aoDocuments', function (newVal, oldVal) { // must retrieve aodocuments first
      expect(wrapper.find('#side-menu li').length).to.equal(wrapper.vm.aoDocuments.length)
      done()
    })
  })

  // it('hide and unhide select and unselect', (done) => {
  //   const wrapper = mount(Navsearch, {
  //     propsData: { activeSidebar: 'doc' }
  //   })
  //   expect(wrapper.first('#export-options').hasStyle('display', 'none')).to.equal(true)

  //   wrapper.vm.checkedAOs.push('AO No. 2017-0001-J')

  //   wrapper.update()

  //   expect(wrapper.first('#export-options').hasStyle('display', 'none')).to.equal(false)

  //   // wrapper.vm.$nextTick(() => {
  //   //   // show export-options
  //   //   expect(wrapper.first('#export-options').hasStyle('display', 'none')).to.equal(false)
  //   //   wrapper.first('#deselectall').trigger('click')
  //   //   wrapper.vm.$nextTick().then(() => {
  //   //     expect(wrapper.first('#export-options').hasStyle('display', 'none')).to.equal(true)
  //   //   }).then(done, done)
  //   // })
  // })
  // /*
  // * End of Document list testing
  // */

  // /*
  // * Filter modal
  // */

  it('show filter modal', done => {
    const wrapper = mount(Navsearch, {
      propsData: { activeSidebar: 'doc' }
    })

    expect(wrapper.vm.isFilterModalOpen).to.equal(false)
    expect(wrapper.find('div.modal.fade')[0].hasStyle('z-index', '1050')).to.equal(true)
    wrapper.find('#filter-button')[0].trigger('click')

    wrapper.vm.$nextTick().then(() => {
      // update isFilterModalOpen to true
      expect(wrapper.vm.isFilterModalOpen).to.equal(true)

      // show modal
      expect(wrapper.find('.modal')[0].hasStyle('display', 'none')).to.equal(false)
    }).then(done, done)
  })

  it('render theme list', () => {
    const wrapper = mount(Navsearch, {
      propsData: { activeSidebar: 'doc' }
    })
    expect(wrapper.find('#filter-themes > label').length).to.equal(wrapper.vm.filters.length)
  })

  it('Click date from button', done => {
    const wrapper = mount(Navsearch, {
      propsData: { activeSidebar: 'doc' }
    })
    var dateDiv = wrapper.find('#filter-date-from')[0]

    expect(dateDiv.hasClass('open')).to.equal(false)

    wrapper.find('#filter-date-from button')[0].trigger('click') // click button

    wrapper.vm.$nextTick().then(() => {
      expect(dateDiv.hasClass('open')).to.equal(true)
    }).then(done, done)
  })
  // /*
  // * End of Filter modal
  // */

  // /*
  // *  Date validation testing
  // */
  it('validate date yyyy-mm-dd', done => {
    const wrapper = mount(Navsearch, {
      propsData: { activeSidebar: 'doc' }
    })

    wrapper.vm.dateFrom = '2017-12-13'
    wrapper.vm.dateTo = '2017-12-13'

    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.vm.dateFrom).to.equal('2017-12-13')
      expect(wrapper.vm.dateTo).to.equal('2017-12-13')
    }).then(done, done)
  })

  it('validate date yyyy/mm/dd', done => {
    const wrapper = mount(Navsearch, {
      propsData: { activeSidebar: 'doc' }
    })

    wrapper.vm.dateFrom = '2017/12/13'
    wrapper.vm.dateTo = '2017/12/13'

    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.vm.dateFrom).to.equal('2017-12-13')
      expect(wrapper.vm.dateTo).to.equal('2017-12-13')
    }).then(done, done)
  })

  it('validate date mm-dd-yyyy', done => {
    const wrapper = mount(Navsearch, {
      propsData: { activeSidebar: 'doc' }
    })

    wrapper.vm.dateFrom = '12-13-2017'
    wrapper.vm.dateTo = '12-13-2017'

    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.vm.dateFrom).to.equal('2017-12-13')
      expect(wrapper.vm.dateTo).to.equal('2017-12-13')
    }).then(done, done)
  })

  it('validate date mm/dd/yyyy', done => {
    const wrapper = mount(Navsearch, {
      propsData: { activeSidebar: 'doc' }
    })

    wrapper.vm.dateFrom = '12/13/2017'
    wrapper.vm.dateTo = '12/13/2017'

    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.vm.dateFrom).to.equal('2017-12-13')
      expect(wrapper.vm.dateTo).to.equal('2017-12-13')
    }).then(done, done)
  })

  it('validate date MMM DD YYYY', done => {
    const wrapper = mount(Navsearch, {
      propsData: { activeSidebar: 'doc' }
    })

    wrapper.vm.dateFrom = 'Dec 13 2017'
    wrapper.vm.dateTo = 'Dec 13 2017'

    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.vm.dateFrom).to.equal('2017-12-13')
      expect(wrapper.vm.dateTo).to.equal('2017-12-13')
    }).then(done, done)
  })

  it('validate date long date', done => {
    const wrapper = mount(Navsearch, {
      propsData: { activeSidebar: 'doc' }
    })

    wrapper.vm.dateFrom = 'December 13, 2017'
    wrapper.vm.dateTo = 'December 13, 2017'

    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.vm.dateFrom).to.equal('2017-12-13')
      expect(wrapper.vm.dateTo).to.equal('2017-12-13')
    }).then(done, done)
  })

  it('validate date dd-mm-yyyy invalid', done => {
    const wrapper = mount(Navsearch, {
      propsData: { activeSidebar: 'doc' }
    })

    wrapper.vm.dateFrom = '13-12-2017'
    wrapper.vm.dateTo = '13-12-2017'

    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.vm.dateFrom).to.equal('')
      expect(wrapper.vm.dateTo).to.equal('')
    }).then(done, done)
  })

  it('validate date invalid string', done => {
    const wrapper = mount(Navsearch, {
      propsData: { activeSidebar: 'doc' }
    })

    wrapper.vm.dateFrom = 'dsada'
    wrapper.vm.dateTo = 'dsada'

    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.vm.dateFrom).to.equal('')
      expect(wrapper.vm.dateTo).to.equal('')
    }).then(done, done)
  })

  it('validate invalid date', done => {
    const wrapper = mount(Navsearch, {
      propsData: { activeSidebar: 'doc' }
    })

    wrapper.vm.dateFrom = '2017-13-13'
    wrapper.vm.dateTo = '2017-13-13'

    wrapper.vm.$nextTick().then(() => {
      expect(wrapper.vm.dateFrom).to.equal('')
      expect(wrapper.vm.dateTo).to.equal('')
    }).then(done, done)
  })

  /*
  *  End date validation testing
  */

  /*
  * TODO tests:
  * Pagination
  * searching
  * ordering
  *
  */
})
