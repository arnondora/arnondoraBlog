import React from 'react'
import Helmet from 'react-helmet'
import { get } from 'lodash'

export default class SEO extends React.Component {
  render() {
    return (
      <Helmet
        title={
          this.props.postContent.frontmatter.title +
          ' - ' +
          this.props.siteMetadata.title
        }
        meta={[
          // Standard Meta
          {
            name: 'description',
            content: this.props.postContent.frontmatter.excerpt,
          },
          { name: 'author', content: this.props.siteMetadata.author },

          // G+
          {
            itemprop: 'name',
            content:
              this.props.postContent.frontmatter.title +
              ' - ' +
              this.props.siteMetadata.title,
          },
          { itemprop: 'author', content: this.props.siteMetadata.author },
          {
            itemprop: 'description',
            content: this.props.postContent.frontmatter.excerpt,
          },
          {
            itemprop: 'image',
            content:
              get(this.props.postContent.frontmatter, 'image', null) === null
                ? ''
                : this.props.siteMetadata.siteUrl +
                  this.props.postContent.frontmatter.image.childImageSharp.fluid
                    .src,
          },
          {
            name: 'description',
            content: this.props.postContent.frontmatter.excerpt,
          },

          // Open Graph
          {
            property: 'og:title',
            content:
              this.props.postContent.frontmatter.title +
              ' - ' +
              this.props.siteMetadata.title,
          },
          {
            property: 'og:description',
            content: this.props.postContent.frontmatter.excerpt,
          },
          { property: 'og:locale', content: 'th_TH' },
          { property: 'og:type', content: 'article' },
          {
            property: 'og:url',
            content: this.props.siteMetadata.siteUrl + this.props.slug,
          },
          {
            property: 'og:image',
            content:
              get(this.props.postContent.frontmatter, 'image', null) === null
                ? ''
                : this.props.siteMetadata.siteUrl +
                  this.props.postContent.frontmatter.image.childImageSharp.fluid
                    .src,
          },
          {
            property: 'og:image:secure_url',
            content:
              get(this.props.postContent.frontmatter, 'image', null) === null
                ? ''
                : this.props.siteMetadata.siteUrl +
                  this.props.postContent.frontmatter.image.childImageSharp.fluid
                    .src,
          },
          {
            property: 'og:site_name',
            content:
              this.props.siteMetadata.title +
              ' - ' +
              this.props.siteMetadata.description,
          },
          {
            property: 'og:updated_time',
            content: this.props.postContent.frontmatter.date,
          },

          // Twitter
          {
            name: 'twitter:card',
            content:
              get(this.props.postContent.frontmatter, 'image', null) === null
                ? ''
                : this.props.siteMetadata.siteUrl +
                  this.props.postContent.frontmatter.image.childImageSharp.fluid
                    .src,
          },
          {
            name: 'twitter:image:src',
            content:
              get(this.props.postContent.frontmatter, 'image', null) === null
                ? ''
                : this.props.siteMetadata.siteUrl +
                  this.props.postContent.frontmatter.image.childImageSharp.fluid
                    .src,
          },
          {
            name: 'twitter:site',
            content: this.props.siteMetadata.authorTwitter,
          },
          {
            name: 'twitter:creator',
            content: this.props.siteMetadata.authorTwitter,
          },
          {
            name: 'twitter:title',
            content:
              this.props.postContent.frontmatter.title +
              ' - ' +
              this.props.siteMetadata.title,
          },
          {
            name: 'twitter:description',
            content: this.props.postContent.frontmatter.excerpt,
          },
        ]}
      >
        <script type="application/application/ld+json">
          {`
            "@context": "http://schema.org/",
            "@type" : "Article",
            "mainEntityOfPage" : {
              "@type" : "Webpage",
              "@id" : "https://arnondora.in.th"
            }
            "author" : {
              "@type" : "Person",
              "name" : "${this.props.siteMetadata.author}"
            },
            "image" : ${this.props.siteMetadata.siteUrl +
              this.props.postContent.frontmatter.image.childImageSharp.fluid
                .src}
            "headline" : ${this.props.postContent.frontmatter.title},
            "datePublished" : "${this.props.postContent.frontmatter.date}",
            "description" : "${this.props.postContent.frontmatter.excerpt}"
          `}
        </script>
      </Helmet>
    )
  }
}
