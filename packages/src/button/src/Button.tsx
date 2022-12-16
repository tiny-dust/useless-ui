// vue3.0 项目中的 button 组件
import { defineComponent } from 'vue'
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
    function handleClick (): void {
      console.log('click')
    }

    return {
      handleClick
    }
  },
  render () {
    const { handleClick } = this
    return (
      <button class="u-button" onClick={handleClick}>
        {this.$slots.default?.()}
      </button>
    )
  }
})

export default Button
