module.exports = {
  siteMetadata: {
    title: `"Hello World - Mad Programmer Diary"`,
    description: `Official Personal Blog of Arnondora`,
    siteUrl: `http://localhost:9000`

  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-remark-responsive-iframe`, {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-64833813-1`,
        anonymize: true
      }
    },{
    resolve: `gatsby-plugin-sitemap`
    }, {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Hello World - Mad Proggrammer Diary",
        short_name: "arnondora",
        start_url: "/",
        background_color: "#0f94f6",
        theme_color: "#0f94f6",
        display: "minimal-ui",
        icons: [
          {
            src: `/favicons/android-chrome-192x192.png`,
            sizes: `512x512`,
            type: `image/png`
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#0f94f6`,
        showSpinner: false,
      }
    },

  ]
}
