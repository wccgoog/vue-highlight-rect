/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import HighlightRect from '../src/components/HighlightRect.vue'

describe('HighlightRect.vue', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(HighlightRect)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.highlight-rect-container').exists()).toBe(true)
    expect(wrapper.findAll('.corner').length).toBe(4)
    expect(wrapper.find('.bottom-line').exists()).toBe(true)
  })

  it('applies correct clip-path based on props', () => {
    const wrapper = mount(HighlightRect, {
      propsData: {
        top: 20,
        right: 30,
        bottom: 40,
        left: 10
      }
    })
    
    const container = wrapper.find('.highlight-rect-container')
    const clipPath = container.element.style.clipPath
    
    expect(clipPath).toContain('10% 20%') // left, top
    expect(clipPath).toContain('70% 20%') // 100-right, top
    expect(clipPath).toContain('70% 60%') // 100-right, 100-bottom
    expect(clipPath).toContain('10% 60%') // left, 100-bottom
  })

  it('validates props correctly', () => {
    const wrapper = mount(HighlightRect, {
      propsData: {
        top: 50,
        right: 25,
        bottom: 75,
        left: 15,
        opacity: 0.8
      }
    })
    
    expect(wrapper.vm.top).toBe(50)
    expect(wrapper.vm.right).toBe(25)
    expect(wrapper.vm.bottom).toBe(75)
    expect(wrapper.vm.left).toBe(15)
    expect(wrapper.vm.opacity).toBe(0.8)
  })

  it('converts hex color to rgba correctly', () => {
    const wrapper = mount(HighlightRect, {
      propsData: {
        color: '#ff0000',
        opacity: 0.5
      }
    })
    
    const rgba = wrapper.vm.hexToRgba('#ff0000', 0.5)
    expect(rgba).toBe('rgba(255, 0, 0, 0.5)')
  })

  it('handles short hex color format', () => {
    const wrapper = mount(HighlightRect)
    
    const rgba = wrapper.vm.hexToRgba('#f00', 0.8)
    expect(rgba).toBe('rgba(255, 0, 0, 0.8)')
  })

  it('returns rgba color unchanged', () => {
    const wrapper = mount(HighlightRect)
    
    const rgba = wrapper.vm.hexToRgba('rgba(255, 0, 0, 0.5)', 0.8)
    expect(rgba).toBe('rgba(255, 0, 0, 0.5)')
  })

  it('starts dynamic highlight when useDynamic is true', async () => {
    const regions = [
      { top: 10, right: 20, bottom: 30, left: 15, duration: 1000 }
    ]
    
    const wrapper = mount(HighlightRect, {
      propsData: {
        useDynamic: true,
        regions: regions
      }
    })
    
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.currentTop).toBe(10)
    expect(wrapper.vm.currentRight).toBe(20)
    expect(wrapper.vm.currentBottom).toBe(30)
    expect(wrapper.vm.currentLeft).toBe(15)
  })

  it('emits finish event after dynamic regions complete', async () => {
    jest.useFakeTimers()
    
    const regions = [
      { top: 10, right: 20, bottom: 30, left: 15, duration: 1000 }
    ]
    
    const wrapper = mount(HighlightRect, {
      propsData: {
        useDynamic: true,
        regions: regions
      }
    })
    
    await wrapper.vm.$nextTick()
    
    // Fast-forward until all timers have been executed
    jest.runAllTimers()
    
    await wrapper.vm.$nextTick()
    
    expect(wrapper.emitted().finish).toBeTruthy()
    
    jest.useRealTimers()
  })

  it('exposes methods for external control', () => {
    const wrapper = mount(HighlightRect, {
      propsData: {
        regions: [
          { top: 10, right: 20, bottom: 30, left: 15, duration: 1000 }
        ]
      }
    })
    
    expect(typeof wrapper.vm.start).toBe('function')
    expect(typeof wrapper.vm.stop).toBe('function')
    expect(typeof wrapper.vm.updateRegions).toBe('function')
  })

  it('updates regions correctly', () => {
    const wrapper = mount(HighlightRect)
    
    const newRegions = [
      { top: 5, right: 10, bottom: 15, left: 20, duration: 2000 }
    ]
    
    wrapper.vm.updateRegions(newRegions)
    
    expect(wrapper.vm.regions).toEqual(newRegions)
  })
})