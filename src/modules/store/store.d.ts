declare interface Window {
  /** Redux DevTools extension */
  __REDUX_DEVTOOLS_EXTENSION__: Function | undefined
  /** store 初始数据 */
  __PRELOADED_STATE__: Object

  /** 客户端配置 */
  __CLIENT_CONFIG__: {
    /** 多语言配置 */
    appLocale: {
      locale: 'zh-Hans-CN' | 'en-US'
      data: any
      messages: any
      rsData: any
    }
  }
}
