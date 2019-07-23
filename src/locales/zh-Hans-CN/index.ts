import appLocaleData from 'react-intl/locale-data/zh'
import rsLocaleData from 'rsuite/lib/IntlProvider/locales/zh_CN'
// 引入组件多语言
import messages from './messages.json'

const appLocale = {
  // 合并所有 messages, 加入组件的 messages
  messages: Object.assign({}, messages),

  // locale
  locale: 'zh-Hans-CN',

  // react-intl locale-data
  data: appLocaleData,
  // resuite intl
  rsData: rsLocaleData
}

export default appLocale
