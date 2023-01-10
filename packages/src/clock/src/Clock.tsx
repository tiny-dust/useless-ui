// vue3.0 项目中的 button 组件
import { computed, CSSProperties, defineComponent, PropType } from 'vue'
import './style/index.less'

interface Size {
  width: string | number
  height: string | number
}

interface Remark {
  text: string
  date: string | Date
  color?: string
  tag?: string
  style?: CSSProperties
}

export const clockProps = {
  size: [Object, String] as PropType<Size | string>,
  isDark: Boolean,
  remarks: Array as PropType<Remark[]>
} as const

export type ClockProps = typeof clockProps

const Clock = defineComponent({
  name: 'Clock',
  props: clockProps,
  setup (props, { slots }) {
    const { size = '300px', isDark = false } = props
    const sizeStyle = computed(() => {
      if (typeof size === 'string') {
        const [w, h] = size.trim().split(',')
        const width: string = isNaN(Number(w)) ? w : w + 'px'
        const height: string =
          (isNaN(Number(h)) ? h : (h && w) + 'px') ?? width
        return {
          width,
          height
        }
      }
      return size
    })

    const clockStyle = computed<CSSProperties>(() => {
      return {
        ...sizeStyle.value
      }
    })

    const clockCss = computed(() => {
      return {
        'u-clock': true,
        'u-clock_dark': isDark,
        'u-clock_light': !isDark
      }
    })

    return {
      clockStyle,
      clockCss
    }
  },
  render () {
    const { clockStyle, clockCss } = this
    return <div class={clockCss} style={clockStyle}></div>
  }
})

export default Clock
