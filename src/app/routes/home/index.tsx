import React from 'react'
import Page from 'app/components/common/page'
import logo from 'app/assets/images/logo.jpg'
import { Button } from 'antd'
import { injectIntl, WrappedComponentProps } from 'react-intl'

interface HomePageProps extends WrappedComponentProps {}

/** 首页 */
class HomePage extends React.Component<HomePageProps> {
  render() {
    return (
      <Page
        id="home"
        title={this.props.intl.formatMessage({
          id: 'page.home',
          defaultMessage: '首页'
        })}
      >
        <h1>这是首页</h1>
        <img src={logo} alt="home" width={400} />
        {[1, 2, 3].map(item => (
          <div key={item}>{item}</div>
        ))}

        <Button size="large" type="primary">
          Haha
        </Button>
      </Page>
    )
  }
}

export default injectIntl(HomePage)
