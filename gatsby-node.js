const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const webpackLodashPlugin = require('lodash-webpack-plugin')
const {createFilePath} = require('gatsby-source-filesystem')
const firebase = require('firebase')

if (process.env.gatsby_executing_command === 'develop' || process.env.GATSBY_ENV === 'staging')
  var envPath = './.env.development'
else
  var envPath = './.env.production'

require('dotenv').config({path: envPath})

var config = {
  apiKey: process.env.GATSBY_FIREBASE_APIKEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_DATABASEURL,
  projectId: process.env.GATSBY_FIREBASE_PROJECTID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGINGSENDERID
}

if (!firebase.apps.length)
  firebase.initializeApp(config)

const uploadValueToFirebase = (post, path) => {
  if (node.frontmatter.image !== null)
    node.frontmatter.image.childImageSharp = null
  firebase.database().ref(path).update(post)
}

const uploadArticleToFirebase = (posts, path) => {
  _.each(posts, (edge) => {
    var node = _.cloneDeep(edge.node)
    firebase.database().ref(path).child(node.fields.slug).once('value', function(snapshot) {
      if (snapshot.val() == null)
        uploadValueToFirebase(node, path + node.fields.slug);
    });
  })
}

const createCategoryPages = (createPage, categories, posts, siteInfo) => {
  const categoryPage = path.resolve('./src/templates/category.js')

  categories.forEach(function(category) {

    const link = category.link
    const name = category.name
    const cleanCategory = _.pick(category, ['name', 'description','link'])

    const catPosts = _.filter(posts, (item) => {
      return _.get(item, 'node.frontmatter.category', false) === name
    })

    var featuredCatPosts = _.filter(catPosts, (item) => {
      return _.get(item, 'node.frontmatter.isFeatured', false) === true
    })

    if (featuredCatPosts.length === 0) {
        featuredCatPosts = _.take(catPosts, 1)
        catPosts.splice(0, 1)
    }

    posts = _.map(posts, (post) => {
      return _.pick(post, ['node.fields.slug', 'node.frontmatter.title', 'node.frontmatter.excerpt', 'node.frontmatter.category', 'node.frontmatter.date', 'node.frontmatter.author', 'node.frontmatter.image'])
    })

    var chunkCatPosts = _.chunk(catPosts, 9)
    const noOfPages = chunkCatPosts.length > 0 ? chunkCatPosts.length : 1

    for (var page = 0; page < noOfPages; page++) {
      createPage({
        path: (page + 1) === 1
          ? "/category/" + link
          : "/category/" + link + "/" + (
          page + 1),
        component: categoryPage,
        context: {
          category: cleanCategory,
          featurePost: _.pick(_.take(featuredCatPosts,1)[0], ['node.fields.slug', 'node.frontmatter.author', 'node.frontmatter.date', 'node.frontmatter.excerpt', 'node.frontmatter.image', 'node.frontmatter.title']),
          siteInfo: siteInfo,
          name: name,
          isFirst: (page + 1) === 1
            ? true
            : false,
          isLast: (page + 1) === noOfPages
            ? true
            : false,
          page: (page + 1),
          posts: chunkCatPosts[page]
        }
      })
    }
  })
}

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
                    subtitle
                    excerpt
                    category
                    template
                    type
                    author
                    status
                    thumbnailCredit
                    date(formatString: "MMMM DD, YYYY")
                    isFeatured
                    image {
                      name
                      ext
                      childImageSharp {
                        sizes (maxWidth: 1200, quality: 80) {
                          base64
                          tracedSVG
                          aspectRatio
                          src
                          srcWebp
                          sizes
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

      var featurePosts = _.take(_.filter(publishedPosts, (item) => {
        return _.get(item, 'node.frontmatter.isFeatured', false) === true || _.get(item, 'node.frontmatter.isFeatured', 'false') === 'true'
      }),1)

      featurePosts = _.map(featurePosts, (post) => {
        return _.pick(post, ['node.fields.slug', 'node.frontmatter.title', 'node.frontmatter.image', 'node.frontmatter.excerpt'])
      })

      const pages = _.filter(result.data.allMarkdownRemark.edges, (item) => {
        return item.node.frontmatter.type === "page"
      })

      var categories = null
      firebase.database().ref("categories").once("value", function(snapshot) {
        categories = []

        snapshot.forEach(function(childSnapshot) {
          categories.push(childSnapshot.val())
        })

        createCategoryPages(createPage, categories, publishedPosts, result.data.site);

        // Create Index page with pagination
        var chunkPost = _.chunk(publishedPosts, IndexPaginationAmount)
        for (var page = 0; page < chunkPost.length; page++) {
          chunkCleanPosts = _.map(chunkPost[page], (post) => {
            return _.pick(post, ['node.fields.slug', 'node.frontmatter.title', 'node.frontmatter.excerpt', 'node.frontmatter.category', 'node.frontmatter.date', 'node.frontmatter.author'])
          })

          createPage({
            path: (page + 1) === 1
              ? "/"
              : "/" + (
              page + 1),
            component: index,
            context: {
              siteInfo: result.data.site,
              posts: chunkCleanPosts,
              isFirst: (page + 1) === 1
                ? true
                : false,
              isLast: (page + 1) === chunkPost.length
                ? true
                : false,
              page: (page + 1),
              featurePosts: featurePosts[0],
              categories: categories
            }
          })
        }
      })

      // Create Category Pages with pagination
      uploadArticleToFirebase(posts,"articles")
      uploadArticleToFirebase(pages,"pages")

      // Create pages.
      _.each(pages, (edge) => {

        node = _.pick(edge.node, ['fields.slug',  'frontmatter.excerpt', 'frontmatter.title', 'frontmatter.image', 'frontmatter.category', 'frontmatter.date', 'frontmatter.author', 'frontmatter.template', 'frontmatter.type', 'html'])

        createPage({
          path: edge.node.fields.slug,
          component: blogPost,
          context: {
            siteInfo: result.data.site,
            id: id,
            post: node
          }
        })
      })

      // Create blog published post pages.
      var id = -1
      _.each(publishedPosts, (edge) => {

        id += 1
        const prev = id === 0
          ? false
          : _.pick(publishedPosts[id - 1].node, ['fields.slug', 'frontmatter.title'])

        const next = id + 1 > _.size(publishedPosts) - 1
          ? false
          : _.pick(publishedPosts[id + 1].node, ['fields.slug', 'frontmatter.title'])

        var related = _.take(_.filter(publishedPosts, (post) => {
          return post.node.frontmatter.category === edge.node.frontmatter.category && post.node.frontmatter.title !== edge.node.frontmatter.title
        }), 4)

        related = _.map(related, (post) => {
          return _.pick(post, ['node.fields.slug', 'node.frontmatter.title', 'node.frontmatter.image'])
        })

        node = _.pick(edge.node, ['fields.slug',  'frontmatter.excerpt', 'frontmatter.title', 'frontmatter.image', 'frontmatter.category', 'frontmatter.date', 'frontmatter.author', 'frontmatter.template', 'frontmatter.type', 'frontmatter.subtitle', 'frontmatter.thumbnailCredit', 'html'])

        createPage({
          path: edge.node.fields.slug,
          component: blogPost,
          context: {
            siteInfo: result.data.site,
            id: id,
            post: node,
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

        node = _.pick(edge.node, ['fields.slug',  'frontmatter.excerpt', 'frontmatter.title', 'frontmatter.image', 'frontmatter.category', 'frontmatter.date', 'frontmatter.author', 'frontmatter.template', 'frontmatter.type', 'frontmatter.subtitle', 'frontmatter.thumbnailCredit', 'html'])

        createPage({
          path: edge.node.fields.slug,
          component: blogPost,
          context: {
            siteInfo: result.data.site,
            id: id,
            post: node,
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
