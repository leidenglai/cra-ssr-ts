import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'

import NotFound from './not-found'

/** 首页 */
const Homepage = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ './home'),
  loading: () => null,
  modules: ['home'],
  // @ts-ignore: webpack扩展的require.resolveWeak方法
  webpack: () => [require.resolveWeak('./home')]
})

/** 市场页 */
const Market = Loadable({
  loader: () => import(/* webpackChunkName: "market" */ './market'),
  loading: () => null,
  modules: ['market'],
  // @ts-ignore: webpack扩展的require.resolveWeak方法
  webpack: () => [require.resolveWeak('./market')]
})

/** 详情页 */
const Detail = Loadable({
  loader: () => import(/* webpackChunkName: "detail" */ './detail'),
  loading: () => null,
  modules: ['detail'],
  // @ts-ignore: webpack扩展的require.resolveWeak方法
  webpack: () => [require.resolveWeak('./detail')]
})

export default () =>
  <Switch>
    <Route exact path="/" component={Homepage} />
    <Route exact path="/market" component={Market} />
    <Route exact path="/detail/:id" component={Detail} />

    <Route component={NotFound} />
  </Switch>
