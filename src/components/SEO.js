import React from 'react'
import Helmet from 'react-helmet'

export default class SEO extends React.Component {
  render () {
    return (
        <Helmet
          title = {this.props.postContent.frontmatter.title + " - " + this.props.siteMetadata.title}
          meta = {[
            // G+
            {itemprop: "name", "content" : this.props.postContent.frontmatter.title + " - " + this.props.siteMetadata.title},
            {itemprop: "author", "content" : this.props.siteMetadata.author},
            {itemprop: "description", "content" : this.props.postContent.frontmatter.excerpt},
            {itemprop: "image", "content" : this.props.siteMetadata.siteUrl + this.props.postContent.frontmatter.image.childImageSharp.resolutions.srcWebp},
            {name: "description", "content" : this.props.postContent.frontmatter.excerpt},

            // Open Graph
            {property: "og:title", "content" : this.props.postContent.frontmatter.title + " - " + this.props.siteMetadata.title},
            {property: "og:description", "content" : this.props.postContent.frontmatter.excerpt},
            {property: "og:locale", "content" : "th_TH"},
            {property: "og:type", "content": "article"},
            {property: "og:url", "content": this.props.siteMetadata.siteUrl + this.props.postContent.fields.slug},
            {property: "og:image", "content": this.props.siteMetadata.siteUrl + this.props.postContent.frontmatter.image.childImageSharp.resolutions.srcWebp},
            {property: "og:image:secure_url", "content": this.props.siteMetadata.siteUrl + this.props.postContent.frontmatter.image.childImageSharp.resolutions.srcWebp},
            {property: "og:image:width", "content": this.props.postContent.frontmatter.image.childImageSharp.resolutions.width},
            {property: "og:image:height", "content": this.props.postContent.frontmatter.image.childImageSharp.resolutions.height},
            {property: "og:site_name", "content": this.props.siteMetadata.title + " - " + this.props.siteMetadata.description},
            {property: "og:updated_time", "content": this.props.postContent.frontmatter.date},

            // Twitter
            {name: "twitter:card", "content": this.props.siteMetadata.siteUrl + this.props.postContent.frontmatter.image.childImageSharp.resolutions.srcWebp},
            {name: "twitter:image:src", "content": this.props.siteMetadata.siteUrl + this.props.postContent.frontmatter.image.childImageSharp.resolutions.srcWebp},
            {name: "twitter:site", "content": this.props.siteMetadata.authorTwitter},
            {name: "twitter:creator", "content": this.props.siteMetadata.authorTwitter},
            {name: "twitter:title", "content": this.props.postContent.frontmatter.title + " - " + this.props.siteMetadata.title},
            {name: "twitter:description", "content": this.props.postContent.frontmatter.excerpt},

          ]}
        />
    )
  }
}
