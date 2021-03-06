module.exports = {
  pathPrefix: `/`,
  siteMetadata: {
    title: "Hello World",
    author: 'Arnon Puitrakul',
    description: 'Mad Programmer Diary',
    siteUrl: `${process.env.NODE_ENV === "production"
      ? "https://www.arnondora.in.th"
      : "https://staging.arnondora.in.th"}`,
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
        trackingId: `${process.env.gatsby_executing_command === "develop"
          ? "UA-64833813-3"
          : "UA-64833813-1"}`,
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
        path: `${__dirname + "/src/articles"}`,
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
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage (
              filter: {
                path : {
                  regex : "/^(?!\/(dev-404-page 404)).*$/"
                  regex : "/[^0-9]+$/"
                }
              }
            ) {
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
    {
      resolve: `gatsby-plugin-no-sourcemaps`
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-lodash`,
    `gatsby-transformer-json`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-remove-trailing-slashes`
  ]
}
