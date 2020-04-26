import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { frontloadConnect } from 'react-frontload'
import { RouteComponentProps } from 'react-router'

import Page from 'app/components/common/page'
import { AppState } from 'modules/reducers'
import {
  getCurrentProfile,
  removeCurrentProfile,
} from 'modules/actions/profile'
import {
  FormattedMessage,
  FormattedNumber,
  FormattedRelative,
} from 'react-intl'

interface MarketPageProps extends RouteComponentProps {
  currentProfile: AppState['profile']['currentProfile']
  getCurrentProfile: typeof getCurrentProfile
  removeCurrentProfile: typeof removeCurrentProfile
}

/**
 * 请求初始数据
 */
const frontload = async (props: MarketPageProps) => {
  await props.getCurrentProfile(1)
}

/** 服务市场列表页 */
class MarketPage extends Component<MarketPageProps> {
  componentWillUnmount() {
    this.props.removeCurrentProfile()
  }

  render() {
    return (
      <Page id="appList" title="市场" description={'产品列表'}>
        <h2>国际化组件测试</h2>
        <FormattedMessage id="page.hello" defaultMessage="你好" />
        <FormattedNumber value={100000000} />
        <FormattedRelative value={Date.now() - 100000} />
      </Page>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    currentProfile: state.profile.currentProfile,
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getCurrentProfile, removeCurrentProfile }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  frontloadConnect(frontload, {
    onMount: true,
    onUpdate: false,
  })(MarketPage)
)
