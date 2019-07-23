// The basics
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router'

// Action creators and helpers
import { establishCurrentUser } from '../modules/actions/auth'
import { isServer } from '../modules/store'
import { AppState } from 'modules/reducers'

import Header from 'app/components/layout/Header'
import Routes from './routes'
import './app.css'

interface RootProps extends RouteComponentProps {
  isAuthenticated: AppState['auth']['isAuthenticated']
  establishCurrentUser: typeof establishCurrentUser
}

class Root extends Component<RootProps> {
  componentWillMount() {
    if (!isServer) {
      this.props.establishCurrentUser()
    }
  }

  render() {
    return (
      <div id="app">
        <Header isAuthenticated={this.props.isAuthenticated} current={this.props.location.pathname} />
        <div id="content">
          <Routes />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ establishCurrentUser }, dispatch)

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Root)
)
