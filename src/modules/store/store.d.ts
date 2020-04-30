declare interface Window {
  /** Redux DevTools extension */
  __REDUX_DEVTOOLS_EXTENSION__: Function | undefined
  /** store 初始数据 */
  __PRELOADED_STATE__: Record<string, any>

  /** 多语言配置 */
  __INTL_CONFIG__: {
    locale: 'zh-CN' | 'en-US'
    messages: any
    key: 'en' | 'zh'
  }
}
