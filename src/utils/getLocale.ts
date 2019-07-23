export function getLocale() {
  let locale: typeof window.__CLIENT_CONFIG__.appLocale
  // eslint-disable-next-line
  let localeUs: typeof window.__CLIENT_CONFIG__.appLocale

  if (process.env.NODE_ENV !== 'production') {
    locale = require('../locales/zh-Hans-CN').default

    localeUs = require('../locales/en-US').default
  } else {
    locale = window.__CLIENT_CONFIG__.appLocale
  }

  return locale
}
