import React from 'react'
import { Helmet } from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'

export default class SEO extends React.Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query SEOQuery {
            site {
              siteMetadata {
                title
                author
                siteUrl
                description
                siteUrl
              }
            }
          }
        `}
        render={data => (
          <Helmet
            title={
              this.props.postContent.frontmatter.title +
              ' - ' +
              data.site.siteMetadata.title
            }
            meta={[
              // Standard Meta
              {
                name: 'description',
                content: this.props.postContent.frontmatter.excerpt,
              },
              { name: 'author', content: data.site.siteMetadata.author },

              // G+
              {
                itemprop: 'name',
                content:
                  this.props.postContent.frontmatter.title +
                  ' - ' +
                  data.site.siteMetadata.title,
              },
              { itemprop: 'author', content: data.site.siteMetadata.author },
              {
                itemprop: 'description',
                content: this.props.postContent.frontmatter.excerpt,
              },
              {
                itemprop: 'image',
                content:
                  get(this.props.postContent.frontmatter, 'image', null) ===
                  null
                    ? ''
                    : data.site.siteMetadata.siteUrl +
                      this.props.postContent.frontmatter.image.childImageSharp
                        .fluid.src,
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
                  data.site.siteMetadata.title,
              },
              {
                property: 'og:description',
                content: this.props.postContent.frontmatter.excerpt,
              },
              { property: 'og:locale', content: 'th_TH' },
              { property: 'og:type', content: 'article' },
              {
                property: 'og:url',
                content: data.site.siteMetadata.siteUrl + this.props.slug,
              },
              {
                property: 'og:image',
                content:
                  get(this.props.postContent.frontmatter, 'image', null) ===
                  null
                    ? ''
                    : data.site.siteMetadata.siteUrl +
                      this.props.postContent.frontmatter.image.childImageSharp
                        .fluid.src,
              },
              {
                property: 'og:image:secure_url',
                content:
                  get(this.props.postContent.frontmatter, 'image', null) ===
                  null
                    ? ''
                    : data.site.siteMetadata.siteUrl +
                      this.props.postContent.frontmatter.image.childImageSharp
                        .fluid.src,
              },
              {
                property: 'og:site_name',
                content:
                  data.site.siteMetadata.title +
                  ' - ' +
                  data.site.siteMetadata.description,
              },
              {
                property: 'og:updated_time',
                content: this.props.postContent.frontmatter.date,
              },

              // Facebook
              { property: 'fb:app_id', content: process.env.FACEBOOK_APP_ID },

              // Twitter
              {
                name: 'twitter:card',
                content:
                  get(this.props.postContent.frontmatter, 'image', null) ===
                  null
                    ? ''
                    : data.site.siteMetadata.siteUrl +
                      this.props.postContent.frontmatter.image.childImageSharp
                        .fluid.src,
              },
              {
                name: 'twitter:image:src',
                content:
                  get(this.props.postContent.frontmatter, 'image', null) ===
                  null
                    ? ''
                    : data.site.siteMetadata.siteUrl +
                      this.props.postContent.frontmatter.image.childImageSharp
                        .fluid.src,
              },
              {
                name: 'twitter:site',
                content: data.site.siteMetadata.authorTwitter,
              },
              {
                name: 'twitter:creator',
                content: data.site.siteMetadata.authorTwitter,
              },
              {
                name: 'twitter:title',
                content:
                  this.props.postContent.frontmatter.title +
                  ' - ' +
                  data.site.siteMetadata.title,
              },
              {
                name: 'twitter:description',
                content: this.props.postContent.frontmatter.excerpt,
              },

              // Google Search Box
              { property: 'google', content: 'nositelinkssearchbox' },
            ]}
          >
            <script type="application/ld+json">
              {`
              {
                "@context": "http://schema.org/",
                "@type" : "Article",
                "mainEntityOfPage": {
                   "@type": "WebPage",
                   "@id": "${data.site.siteMetadata.siteUrl}"
                },
                "name" : "${this.props.postContent.frontmatter.title}",
                "headline" : "${this.props.postContent.frontmatter.title}",
                "backstory" : "${this.props.postContent.frontmatter.excerpt}",
                "author" : {
                  "@type" : "Person",
                  "name" : "${data.site.siteMetadata.author}"
                },
                "datePublished" : "${this.props.postContent.frontmatter.date}",
                "dateModified" : "${this.props.postContent.frontmatter.date}",
                "image" : "${
                  get(this.props.postContent.frontmatter, 'image', null) ===
                  null
                    ? ''
                    : data.site.siteMetadata.siteUrl +
                      this.props.postContent.frontmatter.image.childImageSharp
                        .fluid.src
                }",
                "url" : "${data.site.siteMetadata.siteUrl + this.props.slug}",
                "description" : "${this.props.postContent.frontmatter.excerpt}",
                "publisher" : {
                  "@type" : "Organization",
                  "name" : "${data.site.siteMetadata.title}",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "${data.site.siteMetadata.siteUrl + '/favicon.png'}"
                  }
                }
              }
            `}
            </script>
          </Helmet>
        )}
      />
    )
  }
}
