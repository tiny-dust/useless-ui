<script>import Button from "../../../../packages/button/src/index.svelte";</script><template>
<div class="enter-x">
<h1>按钮 Button</h1>
<p>就是普普通通的按钮啦</p>
<h2>演示</h2>
<pre><code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">markdown</span>&gt;</span>
# 基础使用
<span class="hljs-tag">&lt;/<span class="hljs-name">markdown</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Button</span>&gt;</span>基础<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;primary&quot;</span>&gt;</span>Primary<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;info&quot;</span>&gt;</span>Info<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
</code><div class="component-list">
  <Button>基础</Button>
  <Button type="primary">Primary</Button>
  <Button type="info">Info</Button>
</div>,
<pre><code class="hljs language-html"><span class="hljs-tag">&lt;<span class="hljs-name">markdown</span>&gt;</span>
# 不同类型的按钮
<span class="hljs-tag">&lt;/<span class="hljs-name">markdown</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Button</span>&gt;</span>基础<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;primary&quot;</span>&gt;</span>Primary<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;info&quot;</span>&gt;</span>Info<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
</code><div class="component-list">
  <Button>基础</Button>
  <Button type="primary">Primary</Button>
  <Button type="info">Info</Button>
</div>,
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

</div>
</template>