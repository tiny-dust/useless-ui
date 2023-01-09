import { reactive } from 'vue'

const useSystem = () => {
  const system = reactive({
    bluetooth: {
      state: false,
      name: ''
    },
    theme: '',
    wifi: '',
    battery: ''
  })

  return {
    system
  }
}

export default useSystem
