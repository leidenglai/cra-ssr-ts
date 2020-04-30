import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { frontloadConnect } from 'react-frontload'
import { RouteComponentProps } from 'react-router'
import Page from 'app/components/common/page'
import { AppState } from 'modules/reducers'
import {
  getCurrentProfile,
  removeCurrentProfile
} from 'modules/actions/profile'
import {
  FormattedMessage,
  FormattedNumber,
  FormattedDate,
  injectIntl,
  WrappedComponentProps
} from 'react-intl'

interface DetailPageProps
  extends RouteComponentProps<{ id: string }>,
    WrappedComponentProps {
  currentProfile: AppState['profile']['currentProfile']
  getCurrentProfile: typeof getCurrentProfile
  removeCurrentProfile: typeof removeCurrentProfile
}

/** 服务市场详情页 */
class DetailPage extends Component<DetailPageProps> {
  componentWillUnmount() {
    this.props.removeCurrentProfile()
  }

  render() {
    return (
      <Page
        id="appList"
        title={this.props.intl.formatMessage({
          id: 'page.detail',
          defaultMessage: 'Detail 1'
        })}
        description={'产品详情'}
      >
        <FormattedMessage id="page.hello" defaultMessage="你好" />

        <FormattedNumber value={100000000} />
        <br />
        <FormattedDate value={Date.now() - 100000} />
        <h1>这是详情页</h1>
      </Page>
    )
  }
}

/**
 * 请求初始数据
 */
const frontload = async (props: DetailPageProps) => {
  await props.getCurrentProfile(+props.match.params.id)
}

const mapStateToProps = (state: AppState) => {
  return {
    currentProfile: state.profile.currentProfile
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getCurrentProfile, removeCurrentProfile }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  frontloadConnect(frontload, {
    onMount: true,
    onUpdate: false
  })(injectIntl(DetailPage))
)
