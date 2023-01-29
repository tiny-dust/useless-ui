const hljs = require('highlight.js')
const { marked } = require('marked')

const dealLocale = (body) => {
  if (body.includes('zh-CN') || body.includes('en-US')) {
    const localeArr = body.split(';').filter((item) => item.trim())
    const localeObj = {}
    localeArr.forEach((locale) => {
      const [key, value] = locale.split(':')
      localeObj[key.trim()] = value
    })
    const localeStr = JSON.stringify(localeObj)
    body = `{{${localeStr}[locale]}}`
  }
  return body
}

function createRender (wrapCodeWithCard = true) {
  const renderer = new marked.Renderer()
  const overrides = {
    table (header, body) {
      header = header
        .replace(/<th>/g, '<th>{{ t("')
        .replace(/<\/th>/g, '") }}</th>')
      // 处理body  获取td标签之间的内容 按照tr处理成数组
      const trArr = body.split('</tr>').filter((item) => item.trim())
      trArr.forEach((tr) => {
        // 继续按照td 分组 获取td标签之间的内容
        const tdArr = tr.split('</td>').filter((item) => item.trim())
        tdArr.forEach((td) => {
          // 如果标签内有 zh-CN这类的内容  按照;分组 处理成{{{'zh-CN': 'xxx','en-US':xxx}[locale]}}
          if (td.includes('zh-CN') || td.includes('en-US')) {
            const localeArr = td.split(';').filter((item) => item.trim())
            const localeObj = {}
            localeArr.forEach((locale) => {
              const [key, value] = locale.split(':')
              localeObj[key.trim()] = value
            })
            const localeStr = JSON.stringify(localeObj).replace(/<td>/g, '')
            body = body.replace(td, `<td>{{${localeStr}[locale]}}`)
          }
        })
      })

      if (body) body = '<tbody>' + body + '</tbody>'
      return (
        '<div class="md-table-wrapper"><n-table single-column class="md-table">\n' +
        '<thead>\n' +
        header +
        '</thead>\n' +
        body +
        '</n-table>\n' +
        '</div>'
      )
    },

    tablerow (content) {
      return '<tr>\n' + content + '</tr>\n'
    },

    tablecell (content, flags) {
      const type = flags.header ? 'th' : 'td'
      const tag = flags.align
        ? '<' + type + ' align="' + flags.align + '">'
        : '<' + type + '>'
      return tag + content + '</' + type + '>\n'
    },

    code: (code, language) => {
      if (language.startsWith('__')) {
        language = language.replace('__', '')
      }
      const isLanguageValid = !!(language && hljs.getLanguage(language))
      if (!isLanguageValid) {
        throw new Error(
          `MdRendererError: ${language} is not valid for code - ${code}`
        )
      }
      const highlighted = hljs.highlight(code, { language }).value
      const content = `<n-code><pre v-pre>${highlighted}</pre></n-code>`
      return wrapCodeWithCard
        ? `<n-card embedded :bordered="false" class="md-card" content-style="padding: 0;">
            <n-scrollbar x-scrollable content-style="padding: 16px;">
              ${content}
            </n-scrollbar>
          </n-card>`
        : content
    },
    heading: (text, level) => {
      let id = text.replace(/ /g, '-')
      if (level === 2) {
        id = text.split(' ').pop()
      }
      text = dealLocale(text)
      return `<n-h${level} id="${id}">${text}</n-h${level}>`
    },
    blockquote: (quote) => {
      return `<n-blockquote>${quote}</n-blockquote>`
    },
    hr: () => '<n-hr />',
    paragraph: (text) => {
      text = dealLocale(text)
      return `<n-p>${text}</n-p>`
    },
    link (href, title, text) {
      if (/^(http:|https:)/.test(href)) {
        return `<n-a href="${href}" target="_blank">${text}</n-a>`
      }
      return `<router-link to="${href}" #="{ navigate, href }" custom><n-a :href="href" @click="navigate">${text}</n-a></router-link>`
    },
    list (body, ordered, start) {
      const type = ordered ? 'n-ol' : 'n-ul'
      const startatt = ordered && start !== 1 ? ' start="' + start + '"' : ''
      return `<${type}${startatt}>\n` + body + `</${type}>\n`
    },
    listitem (text) {
      return `<n-li>${text}</n-li>`
    },
    codespan (code) {
      return `<n-text code>${code}</n-text>`
    },
    strong (text) {
      return `<n-text strong>${text}</n-text>`
    },
    checkbox (checked) {
      return `<n-checkbox :checked="${checked}" style="vertical-align: -2px; margin-right: 8px;" />`
    }
  }

  Object.keys(overrides).forEach((key) => {
    renderer[key] = overrides[key]
  })
  return renderer
}

export default createRender
