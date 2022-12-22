// vue3.0 项目中的 button 组件
import { computed, defineComponent } from 'vue'
import useTheme from '../../../hooks/useTheme'
import './style/index.less'

export const buttonProps = {
  color: String,
  textColor: String,
  text: Boolean,
  block: Boolean,
  loading: Boolean,
  disabled: Boolean,
  circle: Boolean
} as const

export type ButtonProps = typeof buttonProps

const Button = defineComponent({
  name: 'Button',
  props: buttonProps,
  setup (props, { slots }) {
    const { theme } = useTheme()
    function handleClick (): void {}

    const reliefStyle = computed(() => {
      const relief = theme.value.relief
      return {
        '--relief-btn-bg': relief.bg,
        '--relief-btn-color': relief.color,
        '--relief-btn-shadow': relief.boxShadow,
        '--relief-btn-inset-shadow': relief.insetBoxShadow
      }
    })

    return {
      handleClick,
      reliefStyle
    }
  },
  render () {
    const { handleClick, reliefStyle } = this
    return (
      <button class="u-button" style={reliefStyle} onClick={handleClick}>
        {this.$slots.default?.()}
      </button>
    )
  }
})

export default Button
