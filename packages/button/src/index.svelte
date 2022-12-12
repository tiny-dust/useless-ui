<script lang="ts">
  export let type = "default"
  
  const calcClass = () => {
    return `w-button w-button-${type}`
  }
</script>
<style lang="less">

  .w-button{
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: all .3s;
  &:hover{
    color: #40a9ff;
    border-color: #40a9ff;
    background-color: #fff;
  }
  &:active{
    color: #096dd9;
    border-color: #096dd9;
    background-color: #e6f7ff;
  }
  &:focus{
    outline: none;
  }
  &.w-button-primary{
    color: #fff;
    background-color: #1890ff;
    border-color: #1890ff;
    &:hover{
      color: #fff;
      background-color: #40a9ff;
      border-color: #40a9ff;
    }
    &:active{
      color: #fff;
      background-color: #096dd9;
      border-color: #096dd9;
    }
  }
}

</style>

<button class={calcClass()}>
  <slot />
</button>
