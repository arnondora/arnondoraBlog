if (process.env.gatsby_executing_command === 'develop' || process.env.GATSBY_ENV === 'staging')
  var envPath = './.env.development'
else
  var envPath = './.env.production'

require('dotenv').config({path: envPath})

module.exports = {
  pathPrefix: `/`,
  siteMetadata: {
    title: "Hello World",
    author: 'Arnon Puitrakul',
    description: 'Mad Programmer Diary',
    siteUrl: `${process.env.APP_URL}`,
    authorTwitter: '@arnondora'
  },
  plugins: [
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        pure: true,
        minify: true,
        displayName: false,
        fileName: false,
      }
    },
    `gatsby-remark-responsive-iframe`, {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `${process.env.GOOGLE_ANALYTICS_TRACKING_ID}`,
        anonymize: true
      }
    }, {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Hello World - Mad Programmer Diary",
        short_name: "arnondora",
        start_url: "/",
        background_color: "#0f94f6",
        theme_color: "#0f94f6",
        display: "minimal-ui",
        icons: [
          {
            src: `/favicon.png`,
            sizes: `512x512`,
            type: `image/png`
          }
        ]
      }
    }, {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#0061C3`,
        showSpinner: false
      }
    }, {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`
      }
    }, {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname + process.env.ARTICLE_LOCATION}`,
        name: 'pages'
      }
    },{
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname + "/src/data"}`,
        name: 'data'
      }
    },{
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 2000,
              linkImagesToOriginal: true,
              sizeByPixelDensity: true,
              withWebp: true,
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          'gatsby-remark-emoji'
        ]
      }
    }, {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: ["/category/*/*", "/search"],
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }

          allSitePage {
            edges {
              node {
                path
              }
            }
          }
        }
        `
      }
    },{
      resolve: `gatsby-plugin-feed`
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-lodash`,
    `gatsby-transformer-json`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-remove-trailing-slashes`
  ]
}
