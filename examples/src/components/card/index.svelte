<template><h1>卡片 Card</h1>
<p>就是普普通通的卡片啦</p>
<h2>演示</h2>
<pre><code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">markdown</span>&gt;</span>
# 基础使用12312
<span class="hljs-tag">&lt;/<span class="hljs-name">markdown</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">w-card</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;title&quot;</span>&gt;</span>Card title<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;content&quot;</span>&gt;</span>Card content<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">&quot;footer&quot;</span>&gt;</span>Card footer<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">w-card</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
</code></pre>
<h2>API</h2>
<table>
<thead>
<tr>
<th>名称</th>
<th>类型</th>
<th>默认值</th>
<th>说明</th>
<th>版本</th>
</tr>
</thead>
<tbody><tr>
<td>type</td>
<td>string</td>
<td>&#39;primary&#39;</td>
<td>类型</td>
<td></td>
</tr>
</tbody></table>
</template>