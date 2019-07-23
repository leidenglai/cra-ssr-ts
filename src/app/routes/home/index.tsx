import React from 'react'
import Page from 'app/components/common/page'
import _ from 'lodash'

import logo from 'app/assets/images/logo.jpg'

export default () =>
  <Page id="home">
    <h1>这是首页</h1>
    <img src={logo} alt="home" style={{ width: '400px' }} />
    {_.map([1, 2, 3], index =>
      <div key={index}>{index}</div>)}
  </Page>
