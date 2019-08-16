import React from 'react'
import PropTypes from 'prop-types'

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `
    {
      "@context": "http://schema.org/",
      "@type" : "Website",
      "url" : "${process.env.APP_URL}",
      "potentialAction" : {
        "@type" : "SearchAction",
        "target" : "${process.env.APP_URL +
          '/search?keyword={search_term_string}'}",
        "query-input": "required name=search_term_string"
      }
    }
        `,
            }}
          />
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}

          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
