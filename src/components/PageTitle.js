import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

export default class PageTitle extends React.Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query TitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <Helmet
            title={this.props.title + ' - ' + data.site.siteMetadata.title}
          ></Helmet>
        )}
      />
    )
  }
}
