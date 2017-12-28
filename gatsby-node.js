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
    const index = path.resolve('./src/templates/index.js')

    const IndexPaginationAmount = 5

    resolve(
      graphql(
        `
          {
            allMarkdownRemark (sort: { order: DESC, fields: [frontmatter___date] }) {
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
                    author
                    date(formatString: "MMMM DD, YYYY")
                    image {
                      childImageSharp {
                        original {
                          src
                          width
                          height
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

        const featurePosts = _.filter(result.data.allCategoriesJson.edges, (item) => {
          return _.get(item,'node.frontmatter.isFeatured', false) === true || _.get(item,'node.frontmatter.isFeatured','false') === 'true'
        })

        const pages = _.filter(result.data.allMarkdownRemark.edges, (item) => {
          return item.node.frontmatter.type === "page"
        })

        // Create Index page with pagination
        var chunkPost = _.chunk(posts, IndexPaginationAmount)
        for (var page = 1; page <= chunkPost.length; page++) {
          createPage ({
            path: page === 1 ? "/" : "/" + page,
            component: index,
            context : {
              posts : chunkPost[page],
              isFirst: page === 1 ? true : false,
              isLast: page === chunkPost.length? true : false,
              page: page,
              featurePosts: featurePosts
            }
          })
        }

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
          const prev = id === 0 ? false : posts[id - 1].node
          const next = id === _.get(posts[id+1],false) === false ? false : posts[id + 1].node

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

exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === "build-html") {
    config.loader("null", {
      test: /scroll-to-element/,
      loader: "null-loader"
    });
  }
  switch (stage) {
    case `build-javascript`:
      config.plugin(`Lodash`, webpackLodashPlugin, null)

      break
  }

  return config
}
