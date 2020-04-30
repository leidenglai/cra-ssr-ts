import { isServer } from './isServer'

/**
 * 客户端语言
 */
function clientLocale() {
  if (process.env.NODE_ENV === 'development') {
    // 开发模式
    const intl = {
      'en-US': require('locales/en-US').default,
      'zh-CN': require('locales/zh-CN').default
    }

    const data = window.location.hostname.match(/^([a-z]{2})\./)
    // 默认英文
    const locale = data && data[1] === 'zh' ? 'zh-CN' : 'en-US'

    return intl[locale]
  }

  const intl = !isServer
    ? window.__INTL_CONFIG__
    : {
        messages: {},
        locale: 'en-US',
        key: 'zh'
      }

  return intl
}

export default clientLocale
