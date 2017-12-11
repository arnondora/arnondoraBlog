import Typography from 'typography'
import colours from './colours'

export const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1,
  headerColor: colours.textHeading,
  bodyColor: colours.textHeading,
  headerWeight: '400',
  bodyWeight: '400',
  boldWeight: '700',
  headerFontFamily: ["Open Sans"],
  bodyFontFamily: ["Open Sans"],
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    a: {
      color: '#424242',
      textDecoration: 'none'
    },
    blockquote: {
      borderLeft: `5px solid ${colours.primaryColour}`
    }
  })
})

typography.injectStyles()
