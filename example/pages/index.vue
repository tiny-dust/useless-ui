<template>
  <div class="root">
    <ul id="container" class="wrap" style="--x: 50%; --y: 50%">
      <li v-for="item in 1060" :key="item" />
    </ul>
    <img class="logo" src="../assets/logo.png" alt="logo">
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  // 给body设置样式
  const bodyDom = document.getElementsByTagName('body')[0]
  if (bodyDom) {
    bodyDom.style.width = '100%'
    bodyDom.style.height = '100%'
    bodyDom.style.display = 'flex'
    bodyDom.style.background = '#000'
    bodyDom.style.cursor = 'pointer'
    bodyDom.style.overflow = 'hidden'
  }

  const mouseOverContainer = document.getElementsByTagName('body')[0]
  const element = document.getElementById('container')
  const { clientWidth, clientHeight } = document.body
  const oneTenthWidth = clientWidth / 10
  const oneTenthHeight = clientHeight / 10
  function transformElement (x: number, y: number) {
    if (!element) return
    element.setAttribute(
      'style',
      `--x: ${x + oneTenthWidth}px;--y:${y + oneTenthHeight}px`
    )
  }

  mouseOverContainer.addEventListener('mousemove', (e) => {
    window.requestAnimationFrame(function () {
      transformElement(e.clientX + 30, e.clientY + 30)
    })
  })

  mouseOverContainer.addEventListener('mouseleave', (e) => {
    window.requestAnimationFrame(function () {
      if (!element) return
      element.setAttribute('style', '--x: 50%; --y:50%')
    })
  })
})
</script>
<style scoped>
.root {
  --s: 50px;
  --m: 0.6px;
  --f: calc(1.732 * var(--s) + 4 * var(--m) - 1px);
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.logo {
  position: absolute;
  top: 48%;
  left: 48%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
}

.wrap {
  position: relative;
  margin: auto;
  flex: 0 0 120%;
  transform: translate(-10%, -10%);
  height: 120%;
  width: 120%;
  font-size: 0;
}

.wrap::before {
  content: "";
  height: 100%;
  width: calc((var(--s) / 2) + calc(var(--m) / 2));
  shape-outside: repeating-linear-gradient(
    transparent 0,
    transparent 80px,
    #000 80px,
    #000 var(--f)
  );
  float: left;
}

.wrap::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    #f44336,
    #ff9800,
    #ffe607,
    #09d7c4,
    #1cbed3,
    #1d8ae2,
    #bc24d6
  );
  z-index: 1;
  mix-blend-mode: darken;
  -webkit-animation: change 5s infinite linear;
  animation: change 5s infinite linear;
  -webkit-mask: radial-gradient(
    circle at var(--x) var(--y),
    #000 0,
    #000 50px,
    transparent 150px,
    transparent 150px
  );
  mask: radial-gradient(
    circle at var(--x) var(--y),
    #000 0,
    #000 50px,
    transparent 150px,
    transparent 150px
  );
}

li {
  position: relative;
  width: 50px;
  height: calc(var(--s) * 1.1547);
  background: #000;
  flex: 0 0 auto;
  -webkit-clip-path: polygon(
    0% 25%,
    0% 75%,
    50% 100%,
    100% 75%,
    100% 25%,
    50% 0%
  );
  clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
  margin: var(--m);
  margin-bottom: calc(var(--m) - var(--s) * 0.2885);
  display: inline-block;
  z-index: 2;
}

@-webkit-keyframes change {
  100% {
    filter: hue-rotate(360deg);
  }
}

@keyframes change {
  100% {
    filter: hue-rotate(360deg);
  }
}
</style>
