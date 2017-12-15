const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

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
        _.each(result.data.allMarkdownRemark.edges, (edge, id) => {
          const prev = id === 0 ? false : result.data.allMarkdownRemark.edges[id - 1].node;
          const next = id === result.data.allMarkdownRemark.edges.length - 1 ? false : result.data.allMarkdownRemark.edges[id + 1].node;

          createPage({
            path: edge.node.fields.slug,
            component: blogPost,
            context: {
              id: id,
              slug: edge.node.fields.slug,
              prev,
              next,
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
