const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const createCategoryPages = (createPage, edges) => {
  const categoryPage = path.resolve('./src/templates/category.js')

    edges.forEach(edge => {
      const link = edge.node.link;
      const name = edge.node.name
      createPage({
        path: `/category/${link}`,
        component: categoryPage,
        context: {
          name : name
        }
      })
    });
};

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
                    excerpt
                    category
                    template
                    type
                    image {
                      childImageSharp {
                        original {
                          src
                        }
                      }
                    }
                  }
                  timeToRead
                  fields {
                    slug
                  }
                }
              }
            }
            allCategoriesJson {
              edges {
                node {
                  name
                  link
                  description
                  thumbnail
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
        createCategoryPages(createPage, result.data.allCategoriesJson.edges);
        var id = -1

        const posts = _.filter(result.data.allMarkdownRemark.edges, (item) => {
          return item.node.frontmatter.type === "post"
        })

        const pages = _.filter(result.data.allMarkdownRemark.edges, (item) => {
          return item.node.frontmatter.type === "page"
        })

        // Create pages.
        _.each(pages, (edge) => {
          createPage({
            path: edge.node.fields.slug,
            component: blogPost,
            context: {
              id: id,
              slug: edge.node.fields.slug,
            },
          })
        })

        // Create blog posts pages.
        _.each(posts, (edge) => {
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
