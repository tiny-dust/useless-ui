# 按钮 Button

按钮用来触发一些操作。

## 演示

```vue
<<< ./basic.demo.vue
```

## API

### Button Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| attr-type | `'button' \| 'submit' \| 'reset'` | `'button'` | 按钮的 DOM 的 `type` 属性 |  |

### ButtonGroup Props

| 名称     | 类型      | 默认值  | 说明               |
| -------- | --------- | ------- | ------------------ |
| vertical | `boolean` | `false` | 组内按钮的排列方式 |

### Button Slots

| 名称    | 参数 | 说明       |
| ------- | ---- | ---------- |
| default | `()` | 按钮的内容 |

### ButtonGroup Slots

| 名称    | 参数 | 说明         |
| ------- | ---- | ------------ |
| default | `()` | 按钮组的内容 |
