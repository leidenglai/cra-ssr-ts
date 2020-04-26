import React from 'react'
import Page from 'app/components/common/page'

const NotFoundPage: React.FC = () => (
  <Page
    id="not-found"
    title="Not Found"
    description="This is embarrassing."
    noCrawl
  >
    <p>404</p>
  </Page>
)

export default NotFoundPage
