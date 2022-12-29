const mdToVue = (path) => {
  // 获取文件后缀
  const ext = path.split('.').pop()
  console.log(
    '%c [ ext ]-4',
    'font-size:13px; background:#3002a2; color:#7446e6;',
    ext
  )
  // 如果是 md 文件
  if (ext === 'md') {
    // 将 md 文件转换为 vue 文件
    return `
      <template>
          这里是md文档
      </template>
      <script>

      </script>
      <style>

      </style>
      `
  }
}

export default mdToVue
