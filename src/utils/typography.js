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
    a: {
      color: '#424242',
      textDecoration: 'none',
    },
    blockquote: {
      borderLeft: `5px solid ${colours.primaryColour}`,
    },
  }),
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
