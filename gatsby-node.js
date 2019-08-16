const _ = require('lodash')
const path = require('path')
const {
  createFilePath
} = require('gatsby-source-filesystem')

// Import .env file
if (
  process.env.gatsby_executing_command === 'develop' ||
  process.env.GATSBY_ENV === 'staging'
)
  var envPath = './.env.development'
else var envPath = './.env.production'

require('dotenv').config({
  path: envPath
})

const INDEX_PAGINATION_AMOUNT = 5

exports.createPages = async ({
  graphql,
  actions
}) => {
  const {
    createPage
  } = actions

  // Post Styles
  const blogPostFullWidth = path.resolve('./src/templates/blog-post-full-width.js')
  const blogPostNormal = path.resolve('./src/templates/blog-post-normal.js')
  const categoryPage = path.resolve('./src/templates/category.js')
  const indexPage = path.resolve('./src/templates/index.js')

  // Query
  const queryResult = await graphql(`
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

      posts: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            excerpt(pruneLength: 250)
            html
            fields {
              slug
            }
            frontmatter {
              title
              excerpt
              category
              type
              author
              status
              series
              ep_number
              ep_name
              date(formatString: "MMMM DD, YYYY")
              isFeatured
              template
              image {
                childImageSharp {
                  fluid(maxWidth: 2000, quality: 80) {
                    base64
                    tracedSVG
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                  }
                }
              }
            }
          }
        }
      }

      categories: allCategoriesJson {
        edges {
          node {
            name
            description
            link
            thumbnail
          }
        }
      }
    }
  `)

  const {site, posts, categories} = queryResult.data

  // Creating Blog
  const blogs = _.filter(posts.edges, item => {
    if (process.env.NODE_ENV !== 'development')
      return item.node.frontmatter.type === 'post' && item.node.frontmatter.status === 'published'
    return item.node.frontmatter.type === 'post'
  })

  var featuredPosts = _.take(
    _.filter(blogs, item => {
      return (
        _.get(item, 'node.frontmatter.isFeatured', false) === true ||
        _.get(item, 'node.frontmatter.isFeatured', 'false') === 'true'
      )
    }),
    1
  )

  var id = -1
  _.each(blogs, edge => {
    id += 1

    var prev =
      id === 0
        ? null
        : _.pick(blogs[id - 1].node, ['fields.slug', 'frontmatter.title'])

    var next =
      id + 1 > _.size(blogs) - 1
        ? null
        : _.pick(blogs[id + 1].node, ['fields.slug', 'frontmatter.title'])

    // Check for series
    isSeries =
      _.get(edge.node.frontmatter, 'series', null) !== null &&
      _.get(edge.node.frontmatter, 'ep_number', -1) > 0
    if (isSeries) {
      //Collect the same series
      const seriesPosts = _.filter(blogs, item => {
        return (
          _.get(item, 'node.frontmatter.series', '') ===
          edge.node.frontmatter.series
        )
      })

      const previousStorySeries = _.filter(seriesPosts, item => {
        return (
          parseInt(_.get(item, 'node.frontmatter.ep_number', -1)) ===
          parseInt(edge.node.frontmatter.ep_number) - 1
        )
      })

      const nextStorySeries = _.filter(seriesPosts, item => {
        return (
          parseInt(_.get(item, 'node.frontmatter.ep_number', -1)) ===
          parseInt(edge.node.frontmatter.ep_number) + 1
        )
      })

      prev =
        parseInt(edge.node.frontmatter.ep_number) === _.size(seriesPosts)
          ? null
          : _.pick(_.head(nextStorySeries).node, [
              'fields.slug',
              'frontmatter.title',
            ])
      next =
        parseInt(edge.node.frontmatter.ep_number) === 1
          ? null
          : _.pick(_.head(previousStorySeries).node, [
              'fields.slug',
              'frontmatter.title',
            ])
    }

    var related = _.take(
      _.filter(blogs, post => {
        return (
          post.node.frontmatter.category === edge.node.frontmatter.category &&
          post.node.frontmatter.title !== edge.node.frontmatter.title
        )
      }),
      4
    )

    related = _.map(related, post => {
      return _.pick(post, [
        'node.fields.slug',
        'node.frontmatter.title',
        'node.frontmatter.image',
      ])
    })

    createPage({
      path: edge.node.fields.slug,
      component:
        _.get(edge.node.frontmatter, 'template', 'full-width') === 'full-width'
          ? blogPostFullWidth
          : blogPostNormal,
      context: {
        siteInfo: site,
        slug: edge.node.fields.slug,
        prev: prev,
        next: next,
        related: related,
        isSeries: isSeries,
      },
    })
  })

  // END OF CREATING BLOG

  // Creating Index Pagination Pages

  const chunkPosts = _.chunk(blogs, INDEX_PAGINATION_AMOUNT)
  for (var page = 0; page < chunkPosts.length; page++) {
    chunkCleanPosts = _.map(chunkPosts[page], post => {
      return _.pick(post, [
        'node.fields.slug',
        'node.frontmatter.title',
        'node.frontmatter.excerpt',
        'node.frontmatter.category',
        'node.frontmatter.date',
        'node.frontmatter.author',
      ])
    })

    featuredPosts = _.map(featuredPosts, post => {
      return _.pick(post, [
        'node.fields.slug',
        'node.frontmatter.title',
        'node.frontmatter.image',
        'node.frontmatter.excerpt',
      ])
    })

    createPage({
      path: page + 1 === 1 ? '/' : '/' + (page + 1),
      component: indexPage,
      context: {
        siteInfo: site,
        posts: chunkCleanPosts,
        isFirst: page + 1 === 1 ? true : false,
        isLast: page + 1 === chunkPosts.length ? true : false,
        page: page + 1,
        featurePosts: featuredPosts[0],
        categories: categories.edges,
        isDevelop: process.env.NODE_ENV == 'development',
      },
    })
  }

  // END OF CREATING INDEX PAGINATION PAGES

  // Creating Category Pages

  _.each(categories.edges, edge => {
    const category = edge.node
    const link = category.link
    const name = category.name
    const cleanCategory = _.pick(category, ['name', 'description', 'link'])

    const catPosts = _.filter(blogs, item => {
      return _.get(item, 'node.frontmatter.category', false) === name
    })

    var featuredCatPosts = _.filter(catPosts, item => {
      return _.get(item, 'node.frontmatter.isFeatured', false) === true
    })

    if (featuredCatPosts.length === 0) {
      featuredCatPosts = _.take(catPosts, 1)
      catPosts.splice(0, 1)
    }

    var chunkCatPosts = _.chunk(catPosts, 9)
    const noOfPages = chunkCatPosts.length > 0 ? chunkCatPosts.length : 1

    for (var page = 0; page < noOfPages; page++) {
      createPage({
        path:
          page + 1 === 1
            ? '/category/' + link
            : '/category/' + link + '/' + (page + 1),
        component: categoryPage,
        context: {
          category: cleanCategory,
          featurePost: _.pick(_.take(featuredCatPosts, 1)[0], [
            'node.fields.slug',
            'node.frontmatter.author',
            'node.frontmatter.date',
            'node.frontmatter.excerpt',
            'node.frontmatter.image',
            'node.frontmatter.title',
          ]),
          siteInfo: site,
          name: name,
          isFirst: page + 1 === 1 ? true : false,
          isLast: page + 1 === noOfPages ? true : false,
          page: page + 1,
          posts: chunkCatPosts[page],
        },
      })
    }
  })

  // END OF CREATING CATEGORY PAGES


  // Creating Pages
  const pages = _.filter(posts.edges, item => {
    if (process.env.NODE_ENV !== 'development')
      return item.node.frontmatter.type === 'page' && item.node.frontmatter.status === 'published'
    return item.node.frontmatter.type === 'page'
  })

  _.each(pages, edge => {
    createPage({
      path: edge.node.fields.slug,
      component:
        _.get(edge.node.frontmatter, 'template', 'full-width') === 'full-width'
          ? blogPostFullWidth
          : blogPostNormal,
      context: {
        siteInfo: site,
        slug: edge.node.fields.slug,
      },
    })
  })

  // END OF CREATING PAGES
}

exports.onCreateNode = ({
  node,
  actions,
  getNode
}) => {
  const {
    createNodeField
  } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({
      node,
      getNode
    })
    createNodeField({
      name: `slug`,
      node,
      value
    })
  }
}
