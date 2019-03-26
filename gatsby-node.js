const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const firebase = require('firebase')

// Import .env file
if (
  process.env.gatsby_executing_command === 'develop' ||
  process.env.GATSBY_ENV === 'staging'
)
  var envPath = './.env.development'
else var envPath = './.env.production'

require('dotenv').config({ path: envPath })

// Firebase Config
const firebaseConfig = {
  apiKey: process.env.GATSBY_FIREBASE_APIKEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_DATABASEURL,
  projectId: process.env.GATSBY_FIREBASE_PROJECTID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGINGSENDERID,
}

// Init Firebase App
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)

const uploadValueToFirebase = (post, path) => {
  if (post.frontmatter.image !== null)
    post.frontmatter.image.childImageSharp = null
  firebase
    .database()
    .ref(path)
    .update(post)
}

const uploadArticleToFirebase = (posts, path) => {
  _.each(posts, edge => {
    var node = _.cloneDeep(edge.node)
    firebase
      .database()
      .ref(path)
      .child(node.fields.slug)
      .once('value', function(snapshot) {
        if (snapshot.val() == null)
          uploadValueToFirebase(node, path + node.fields.slug)
      })
  })
}

const createCategoryPages = (createPage, categories, posts, siteInfo) => {
  const categoryPage = path.resolve('./src/templates/category.js')

  categories.forEach(function(categoryNode) {
    const category = categoryNode.node
    const link = category.link
    const name = category.name
    const cleanCategory = _.pick(category, ['name', 'description', 'link'])

    const catPosts = _.filter(posts, item => {
      return _.get(item, 'node.frontmatter.category', false) === name
    })

    var featuredCatPosts = _.filter(catPosts, item => {
      return _.get(item, 'node.frontmatter.isFeatured', false) === true
    })

    if (featuredCatPosts.length === 0) {
      featuredCatPosts = _.take(catPosts, 1)
      catPosts.splice(0, 1)
    }

    posts = _.map(posts, post => {
      return _.pick(post, [
        'node.fields.slug',
        'node.frontmatter.title',
        'node.frontmatter.excerpt',
        'node.frontmatter.category',
        'node.frontmatter.date',
        'node.frontmatter.author',
        'node.frontmatter.image',
      ])
    })

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
          siteInfo: siteInfo,
          name: name,
          isFirst: page + 1 === 1 ? true : false,
          isLast: page + 1 === noOfPages ? true : false,
          page: page + 1,
          posts: chunkCatPosts[page],
        },
      })
    }
  })
}

const createListLivePage = (createPage, posts, siteInfo) => {
  const ListLivePage = path.resolve('./src/templates/livePaginate.js')
  cleanedPosts = []
  posts.forEach(function(post) {
    cleanedPosts.push(_.pick(post, ['title', 'subtitle', 'slug']))
  })

  createPage({
    path: '/live',
    component: ListLivePage,
    context: {
      posts: cleanedPosts,
      siteInfo: siteInfo,
    },
  })
}

const createLivePages = (createPage, posts, siteInfo) => {
  const livePage = path.resolve('./src/templates/live.js')
  posts.forEach(function(post) {
    if (_.isEmpty(siteInfo) || posts.length === 0) return
    createPage({
      path: '/live/' + post.slug,
      component: livePage,
      context: {
        siteInfo: siteInfo,
        post: _.pick(post, [
          'thumbnail',
          'title',
          'subtitle',
          'detail',
          'slug',
        ]),
      },
    })
  })
}

const createPublishedPostPage = (createPage, posts, siteInfo) => {
  const blogPostFullWidth = path.resolve(
    './src/templates/blog-post-full-width.js'
  )
  const blogPostNormal = path.resolve('./src/templates/blog-post-normal.js')
  var id = -1
  _.each(posts, edge => {
    id += 1

    var prev =
      id === 0
        ? false
        : _.pick(posts[id - 1].node, ['fields.slug', 'frontmatter.title'])

    var next =
      id + 1 > _.size(posts) - 1
        ? false
        : _.pick(posts[id + 1].node, ['fields.slug', 'frontmatter.title'])

    // Check for series
    if (
      _.get(edge.node.frontmatter, 'series', null) !== null &&
      _.get(edge.node.frontmatter, 'ep_number', -1) > 0
    ) {
      //Collect the same series
      const seriesPosts = _.filter(posts, item => {
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
          ? false
          : _.pick(_.head(nextStorySeries).node, [
              'fields.slug',
              'frontmatter.title',
            ])
      next =
        parseInt(edge.node.frontmatter.ep_number) === 1
          ? false
          : _.pick(_.head(previousStorySeries).node, [
              'fields.slug',
              'frontmatter.title',
            ])
    }

    var related = _.take(
      _.filter(posts, post => {
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
        siteInfo: siteInfo,
        slug: edge.node.fields.slug,
        prev,
        next,
        related,
      },
    })
  })
}

const createPagePages = (createPage, pages, siteInfo) => {
  const blogPostFullWidth = path.resolve(
    './src/templates/blog-post-full-width.js'
  )
  const blogPostNormal = path.resolve('./src/templates/blog-post-normal.js')

  _.each(pages, edge => {
    createPage({
      path: edge.node.fields.slug,
      component:
        _.get(edge.node.frontmatter, 'template', 'full-width') === 'full-width'
          ? blogPostFullWidth
          : blogPostNormal,
      context: {
        siteInfo: siteInfo,
        slug: edge.node.fields.slug,
      },
    })
  })
}

const createIndexPagination = (
  createPage,
  posts,
  siteInfo,
  categories,
  featuredPost
) => {
  const IndexPaginationAmount = 5
  const index = path.resolve('./src/templates/index.js')

  const chunkPost = _.chunk(posts, IndexPaginationAmount)

  for (var page = 0; page < chunkPost.length; page++) {
    chunkCleanPosts = _.map(chunkPost[page], post => {
      return _.pick(post, [
        'node.fields.slug',
        'node.frontmatter.title',
        'node.frontmatter.excerpt',
        'node.frontmatter.category',
        'node.frontmatter.date',
        'node.frontmatter.author',
      ])
    })

    createPage({
      path: page + 1 === 1 ? '/' : '/' + (page + 1),
      component: index,
      context: {
        siteInfo: siteInfo,
        posts: chunkCleanPosts,
        isFirst: page + 1 === 1 ? true : false,
        isLast: page + 1 === chunkPost.length ? true : false,
        page: page + 1,
        featurePosts: featuredPost,
        categories: categories,
        isDevelop : process.env.NODE_ENV == 'development'
      },
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
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

          allMarkdownRemark(
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

          allCategoriesJson {
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
      `).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        //Filtering allMarkdownRemark Content
        const posts = _.filter(result.data.allMarkdownRemark.edges, item => {
          return item.node.frontmatter.type === 'post'
        })

        if (process.env.NODE_ENV == 'development') {
          // If environment is in the development -> show the draft post
          var publishedPosts = posts
        } else {
          // otherwise draft posts will not be shown
          var publishedPosts = _.filter(posts, item => {
            return item.node.frontmatter.status === 'published'
          })
        }

        var featurePosts = _.take(
          _.filter(publishedPosts, item => {
            return (
              _.get(item, 'node.frontmatter.isFeatured', false) === true ||
              _.get(item, 'node.frontmatter.isFeatured', 'false') === 'true'
            )
          }),
          1
        )

        featurePosts = _.map(featurePosts, post => {
          return _.pick(post, [
            'node.fields.slug',
            'node.frontmatter.title',
            'node.frontmatter.image',
            'node.frontmatter.excerpt',
          ])
        })

        const pages = _.filter(result.data.allMarkdownRemark.edges, item => {
          return item.node.frontmatter.type === 'page'
        })

        createCategoryPages(
          createPage,
          result.data.allCategoriesJson.edges,
          publishedPosts,
          result.data.site
        )

        // Create Live Blog Pages
        firebase
          .database()
          .ref('live')
          .once('value', function(snapshot) {
            var livePages = []

            snapshot.forEach(function(childSnapshot) {
              livePages.push(childSnapshot.val())
            })

            createLivePages(createPage, livePages, result.data.site)
            createListLivePage(createPage, livePages, result.data.site)
          })

        // Create Index Pagination Pages
        createIndexPagination(
          createPage,
          publishedPosts,
          result.data.site,
          result.data.allCategoriesJson.edges,
          featurePosts[0]
        )

        // Create pages.
        createPagePages(createPage, pages, result.data.site)

        // Create blog published post pages.
        createPublishedPostPage(createPage, publishedPosts, result.data.site)

        // Upload Article and Page to Firebase
        uploadArticleToFirebase(posts, 'articles')
        uploadArticleToFirebase(pages, 'pages')
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({ name: `slug`, node, value })
  }
}
