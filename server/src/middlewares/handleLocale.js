const langMap = {
  en: 'en-US',
  zh: 'zh-CN'
}

/**
 * 客户端语言 默认返回 en 英文
 * 从hostname中提取语言  zh.xxx.com 提取 zh
 * @param {string} str
 */
function clientLocale(str) {
  const data = str.match(/^([a-z]{2})\./)
  const key = data && data[1]

  if (key && langMap[key]) {
    const lang = langMap[key]

    return { lang, key }
  } else {
    return { lang: langMap.en, key: 'en' }
  }
}

const handleLocale = () =>
  async function (ctx, next) {
    const data = clientLocale(ctx.hostname)

    ctx.i18n = {
      locale: data.lang,
      key: data.key
    }

    await next()
  }

export default handleLocale
