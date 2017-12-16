const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

var id = -1

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post-full-width.js')
    resolve(
      graphql(
        `
          {
            allMarkdownRemark {
              edges {
                node {
                  excerpt(pruneLength: 250)
                  html
                  id
                  frontmatter {
                    title
                    category
                    landscapeThumbnail
                    portraitThumbnail
                  }
                  timeToRead
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        _.each(result.data.allMarkdownRemark.edges, (edge) => {
          id += 1
          const prev = id === 0 ? false : result.data.allMarkdownRemark.edges[id - 1].node
          const next = id === result.data.allMarkdownRemark.edges.length - 1 ? false : result.data.allMarkdownRemark.edges[id + 1].node

          const related = _.filter(result.data.allMarkdownRemark.edges, (post) => {
            return post.node.frontmatter.category === edge.node.frontmatter.category && post.node.frontmatter.title !== edge.node.frontmatter.title
          })

          createPage({
            path: edge.node.fields.slug,
            component: blogPost,
            context: {
              id: id,
              slug: edge.node.fields.slug,
              prev,
              next,
              related,
            },
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
