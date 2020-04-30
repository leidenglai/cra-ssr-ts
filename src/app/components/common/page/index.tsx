import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import Helmet from 'react-helmet'
import logo from '../../../assets/images/logo.jpg'
import { injectIntl, WrappedComponentProps } from 'react-intl'

const SITE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://crassrts.idenglai.com'

const defaultTitle = 'cra-ssr-ts'
const defaultDescription = 'xx.'
const defaultImage = `${SITE_URL}${logo}`
const defaultSep = ' | '

export interface MetaTags {
  title?: string
  description?: string
  image?: string
  noCrawl?: boolean
  published?: string
  updated?: string
  category?: string
  tags?: string
  schema?: string
}

interface PageProps
  extends RouteComponentProps,
    MetaTags,
    WrappedComponentProps {
  id: string
  className?: string
  // 按需加载的三方 script
  script?: any[]
  // 按需加载的三方 link
  link?: React.LinkHTMLAttributes<HTMLLinkElement>[]
}

class Page extends Component<PageProps> {
  getMetaTags(metaOptions: MetaTags, pathname: string) {
    const theTitle = metaOptions.title
      ? (metaOptions.title + defaultSep + defaultTitle).substring(0, 60)
      : defaultTitle
    const theDescription = metaOptions.description
      ? metaOptions.description.substring(0, 155)
      : defaultDescription
    const theImage = metaOptions.image
      ? `${SITE_URL}${metaOptions.image}`
      : defaultImage

    const metaTags = [
      { itemprop: 'name', content: theTitle },
      { itemprop: 'description', content: theDescription },
      { itemprop: 'image', content: theImage },
      { name: 'description', content: theDescription }
    ]

    if (metaOptions.noCrawl) {
      metaTags.push({ name: 'robots', content: 'noindex, nofollow' })
    }

    if (metaOptions.published) {
      metaTags.push({
        name: 'article:published_time',
        content: metaOptions.published
      })
    }
    if (metaOptions.updated) {
      metaTags.push({
        name: 'article:modified_time',
        content: metaOptions.updated
      })
    }
    if (metaOptions.category) {
      metaTags.push({ name: 'article:section', content: metaOptions.category })
    }
    if (metaOptions.tags) {
      metaTags.push({ name: 'article:tag', content: metaOptions.tags })
    }

    return metaTags
  }

  render() {
    const { intl, children, id, className, link = [], ...rest } = this.props

    return (
      <div id={id} className={className}>
        <Helmet
          htmlAttributes={{
            lang: intl.locale || 'en',
            itemscope: undefined,
            itemtype: `http://schema.org/${rest.schema || 'WebPage'}`
          }}
          title={
            rest.title ? rest.title + defaultSep + defaultTitle : defaultTitle
          }
          link={[
            {
              rel: 'canonical',
              href: SITE_URL + this.props.location.pathname
            },
            ...link
          ]}
          meta={this.getMetaTags(rest, this.props.location.pathname)}
          script={this.props.script}
        />
        {children}
      </div>
    )
  }
}

export default withRouter(injectIntl(Page))
