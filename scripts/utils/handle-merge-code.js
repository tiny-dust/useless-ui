import tsToJs from './ts-to-js'

// 集中处理代码片段
function handleMergeCode ({ parts, mergedParts, isVue }) {
  // 如果是vue文件并且是ts语法
  if (isVue && parts.language === 'ts') {
    if (parts.template) {
      mergedParts.tsCode += `<template>${parts.template}</template>`
      mergedParts.jsCode += `<template>${parts.template}</template>`
    }
    if (parts.script) {
      if (parts.template) {
        mergedParts.tsCode += '\n\n'
        mergedParts.jsCode += '\n\n'
      }
      mergedParts.tsCode += `
      <script lang="ts">
        ${parts.script}
      </script>`
      mergedParts.jsCode += `
      <script>
        ${tsToJs(parts.script)}
      </script>`
    }
    if (parts.style) {
      if (parts.template || parts.script) {
        mergedParts.tsCode += '\n\n'
        mergedParts.jsCode += '\n\n'
      }
      const style = `<style scoped>${parts.style}</style>`
      mergedParts.tsCode += style
      mergedParts.jsCode += style
    }
  } else {
    // 如果是vue文件并且是js语法
    if (parts.template) {
      mergedParts.jsCode += isVue
        ? `<template>${parts.template}</template>`
        : `<template>\n${parts.template
            .split('\n')
            .map((line) => (line.length ? '  ' + line : line))
            .join('\n')}\n</template>`
    }
    if (parts.script) {
      if (parts.template) {
        mergedParts.jsCode += '\n\n'
      }
      mergedParts.jsCode += `
      <script>
        ${parts.script}
      </script>`
    }
    if (parts.style) {
      if (parts.template || parts.script) {
        mergedParts.jsCode += '\n\n'
      }
      const style = isVue
        ? `<style scoped>${parts.style}</style>`
        : `
        <style scoped>
          ${parts.style}
        </style>`
      mergedParts.jsCode += style
    }
  }
}

export default handleMergeCode
