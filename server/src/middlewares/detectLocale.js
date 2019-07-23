function langMap(str) {
  switch (str) {
    case 'zh-Hans-CN':
      return 'zh-Hans-CN'
    case 'en-US':
      return 'en-US'
    default:
      return 'en-US'
  }
}

/**
 * 处理语言 在ctx添加一个i18n属性，保存多语言
 * @param {'zh-Hans-CN'|'en-US'} defLang 默认语言
 */
const detectLocale = defLang =>
  async function(ctx, next) {
    const { cookies, i18n = {}} = ctx

    if (cookies.get('locale')) {
      // 优先使用 cookies中的locale
      i18n.locale = langMap(cookies.get('locale'))
    } else {
      // 使用 Request中的值
      const locale = ctx.acceptsLanguages(['zh-CN', 'en'])

      if (typeof locale === 'string') {
        if (locale === 'zh-CN') {
          i18n.locale = 'zh-Hans-CN'
        } else {
          i18n.locale = 'en-US'
        }
      } else {
        i18n.locale = langMap(defLang)
      }
    }

    ctx.i18n = i18n

    await next()
  }

export default detectLocale
