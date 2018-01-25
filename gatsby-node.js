const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const webpackLodashPlugin = require('lodash-webpack-plugin')
const {createFilePath} = require('gatsby-source-filesystem')

const createCategoryPages = (createPage, categories, posts, siteInfo) => {
  const categoryPage = path.resolve('./src/templates/category.js')

  categories.forEach(category => {
    const link = category.node.link
    const name = category.node.name
    const catPosts = _.filter(posts, (item) => {
      return _.get(item, 'node.frontmatter.category', false) === name
    })

    var chunkCatPosts = _.chunk(catPosts, 10)
    for (var page = 0; page < chunkCatPosts.length; page++) {
      createPage({
        path: (page + 1) === 1
          ? "/category/" + link
          : "/category/" + link + "/" + (
          page + 1),
        component: categoryPage,
        context: {
          category: category.node,
          siteInfo: siteInfo,
          name: name,
          isFirst: (page + 1) === 1
            ? true
            : false,
          isLast: (page + 1) === chunkCatPosts.length
            ? true
            : false,
          page: (page + 1),
          posts: chunkCatPosts[page]
        }
      })
    }

  });
};

exports.createPages = ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post-full-width.js')
    const index = path.resolve('./src/templates/index.js')

    const IndexPaginationAmount = 5

    resolve(graphql(`
          {
            site {
              siteMetadata {
                title
                author
                description
                siteUrl
                authorTwitter
              }
            }

            allMarkdownRemark (sort: { order: DESC, fields: [frontmatter___date] }) {
              edges {
                node {
                  excerpt(pruneLength: 250)
                  html
                  id
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    excerpt
                    category
                    template
                    type
                    author
                    status
                    date(formatString: "MMMM DD, YYYY")
                    isFeatured
                    image {
                      childImageSharp {
                        original {
                          src
                          height
                          width
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
        `).then(result => {
      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }

      //Filtering allMarkdownRemark Content
      const posts = _.filter(result.data.allMarkdownRemark.edges, (item) => {
        return item.node.frontmatter.type === "post"
      })

      const publishedPosts = _.filter(posts, (item) => {
        return item.node.frontmatter.status === "published"
      })

      const draftPosts = _.filter(posts, (item) => {
        return item.node.frontmatter.status === "draft"
      })

      const featurePosts = _.filter(publishedPosts, (item) => {
        return _.get(item, 'node.frontmatter.isFeatured', false) === true || _.get(item, 'node.frontmatter.isFeatured', 'false') === 'true'
      })

      const pages = _.filter(result.data.allMarkdownRemark.edges, (item) => {
        return item.node.frontmatter.type === "page"
      })

      // Create Category Pages with pagination
      createCategoryPages(createPage, result.data.allCategoriesJson.edges, publishedPosts, result.data.site);

      // Create Index page with pagination
      var chunkPost = _.chunk(publishedPosts, IndexPaginationAmount)
      for (var page = 0; page < chunkPost.length; page++) {
        createPage({
          path: (page + 1) === 1
            ? "/"
            : "/" + (
            page + 1),
          component: index,
          context: {
            siteInfo: result.data.site,
            posts: chunkPost[page],
            isFirst: (page + 1) === 1
              ? true
              : false,
            isLast: (page + 1) === chunkPost.length
              ? true
              : false,
            page: (page + 1),
            featurePosts: featurePosts,
            categories: result.data.allCategoriesJson.edges
          }
        })
      }

      // Create pages.
      _.each(pages, (edge) => {
        createPage({
          path: edge.node.fields.slug,
          component: blogPost,
          context: {
            siteInfo: result.data.site,
            id: id,
            post: edge.node
          }
        })
      })

      // Create blog published post pages.
      var id = -1
      _.each(publishedPosts, (edge) => {
        id += 1
        const prev = id === 0
          ? false
          : publishedPosts[id - 1].node
        const next = id + 1 > _.size(publishedPosts) - 1
          ? false
          : publishedPosts[id + 1].node

        const related = _.filter(publishedPosts, (post) => {
          return post.node.frontmatter.category === edge.node.frontmatter.category && post.node.frontmatter.title !== edge.node.frontmatter.title
        })
        createPage({
          path: edge.node.fields.slug,
          component: blogPost,
          context: {
            siteInfo: result.data.site,
            id: id,
            post: edge.node,
            prev,
            next,
            related
          }
        })
      })

      // Create blog draft post pages.
      _.each(draftPosts, (edge) => {
        const prev = false
        const next = false
        const related = false

        createPage({
          path: edge.node.fields.slug,
          component: blogPost,
          context: {
            siteInfo: result.data.site,
            id: id,
            post: edge.node,
            prev,
            next,
            related
          }
        })
      })
    }))
  })
}

exports.onCreateNode = ({node, boundActionCreators, getNode}) => {
  const {createNodeField} = boundActionCreators

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({node, getNode})
    createNodeField({name: `slug`, node, value})
  }
}

exports.modifyWebpackConfig = ({config, stage}) => {
  if (stage === "build-html") {
    config.loader("null", {
      test: /scroll-to-element/,
      loader: "null-loader"
    });
  }

  if (stage === 'build-javascript') {
    // turn off source-maps
    config.merge({devtool: false});
  }

  switch (stage) {
    case `build-javascript`:
      config.plugin(`Lodash`, webpackLodashPlugin, null)

      break
  }

  return config
}
