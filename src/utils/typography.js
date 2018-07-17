import Typography from 'typography'
import colours from './colours'

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.6,
  headerColor: colours.textHeading,
  bodyColor: colours.textHeading,
  headerWeight: '400',
  bodyWeight: '400',
  boldWeight: '700',
  headerFontFamily: ['Open Sans', 'Thonburi'],
  bodyFontFamily: ['Open Sans', 'Thonburi'],
  googleFonts: [
    {
      name: 'Open Sans',
      styles: ['300', '400', '700'],
    },
  ],
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    body: {
      backgroundColor: '#F5F5F5',
      minHeight: '100vh',
    },
    h1: {
      fontSize: '37.32px',
    },
    h2: {
      fontSize: '31.1px',
    },
    h3: {
      fontSize: '25.92px',
    },
    h4: {
      fontSize: '21.6px',
    },
    p: {
      fontSize: '18px',
    },
    a: {
      color: `${colours.primaryColour}`,
      textDecoration: 'none',
    },
    blockquote: {
      borderLeft: `5px solid ${colours.primaryColour}`,
      borderLeft: `5px solid ${colours.primaryColour}`,
      marginLeft: '0',
    },
  }),
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
