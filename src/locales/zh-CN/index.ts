// 引入组件多语言
import messages from './messages.json'
// antd
import antdLocale from 'antd/es/locale/zh_CN'

const appLocale = {
  // 合并所有 messages, 加入组件的 messages
  messages: Object.assign({}, messages),
  // locale
  locale: 'zh-CN',
  antdLocale
}

export default appLocale
