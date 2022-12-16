// vue3.0 项目中的 button 组件
import { defineComponent } from 'vue';

export const buttonProps = {
  color: String,
  textColor: String,
  text: Boolean,
  block: Boolean,
  loading: Boolean,
  disabled: Boolean,
  circle: Boolean,
} as const

export type ButtonProps = typeof buttonProps

const Button = defineComponent( {
  name: 'Button',
  props: buttonProps,
  setup ( props, { slots } ) {
    console.log( '%c [ props ]-20', 'font-size:13px; background:#763461; color:#ba78a5;', props, slots )
  },
  render () {
    return <button class="el-button">
      { this.$slots.default && this.$slots.default() }
    </button>
  }
} )

export default Button;
