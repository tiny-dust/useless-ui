// vue3.0 项目中的 button 组件
import { computed, defineComponent } from 'vue'
import useTheme from '../../../hooks/useTheme'
import Color from 'color'
import './style/index.less'

export const buttonProps = {
  color: String,
  textColor: String,
  loading: Boolean,
  disabled: Boolean,
  circle: Boolean
} as const

export type ButtonProps = typeof buttonProps

const Button = defineComponent({
  name: 'Button',
  props: buttonProps,
  setup (props, { slots }) {
    const { theme, isDark } = useTheme()

    const reliefStyle = computed(() => {
      const relief = theme.value.relief
      const insetBoxShadowColor = Color(props.color ?? relief.bg)
        .alpha(isDark.value ? 0.1 : 0.3)
        .rgb()
        .string()
      const boxShadowColor = Color(relief.boxShadow)
        .opaquer(isDark.value && props.color ? 0.8 : 0.3)
        .rgb()
        .string()
      return {
        '--relief-btn-bg': props.color ?? relief.bg,
        '--relief-btn-color': props.textColor ?? relief.color,
        '--relief-btn-shadow': boxShadowColor,
        '--relief-btn-inset-shadow': insetBoxShadowColor
      }
    })

    const reliefCss = computed(() => {
      return {
        'relief-button': true,
        'relief-button--circle': props.circle
      }
    })

    return {
      reliefStyle,
      reliefCss
    }
  },
  render () {
    const { reliefStyle, reliefCss, $attrs } = this
    return (
      <button class={reliefCss} style={reliefStyle} {...$attrs}>
        {this.$slots.default?.()}
      </button>
    )
  }
})

export default Button
