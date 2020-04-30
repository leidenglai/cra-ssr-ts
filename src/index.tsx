import React from 'react'
import { render, hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import Loadable from 'react-loadable'
import { Frontload } from 'react-frontload'
import { ConnectedRouter } from 'connected-react-router'
import { IntlProvider } from 'react-intl'
import { ConfigProvider } from 'antd'
import Root from './app/Root'
import createStore from './modules/store'
import clientLocale from 'utils/clientLocale'

import 'app/assets/styles/common.less'

// 国际化配置
const appLocale = clientLocale()

// Create a store and get back itself and its history object
const { store, history } = createStore()

// Running locally, we should run on a <ConnectedRouter /> rather than on a <StaticRouter /> like on the server
// Let's also let React Frontload explicitly know we're not rendering on the server here
const Application = (
  <Provider store={store}>
    <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
      <ConfigProvider locale={appLocale.antdLocale}>
        <ConnectedRouter history={history}>
          <Frontload noServerRender={true}>
            <Root />
          </Frontload>
        </ConnectedRouter>
      </ConfigProvider>
    </IntlProvider>
  </Provider>
)

const root = document.querySelector('#root')

if (root && root.hasChildNodes() === true) {
  // If it's an SSR, we use hydrate to get fast page loads by just
  // attaching event listeners after the initial render
  Loadable.preloadReady().then(() => {
    hydrate(Application, root)
  })
} else {
  // If we're not running on the server, just render like normal
  render(Application, root)
}
