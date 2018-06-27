import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'gatsby'
import { ThemeProvider } from 'styled-components'
import Helmet from 'react-helmet'

import colours from '../utils/colours'

import siteLogo from '../assets/favicon.png'
import './index.css'

const TemplateWrapper = ({ children }) => (
  <React.Fragment>
    <Helmet
      title="Hello World - Mad Programmer Diary"
      meta={[
        { name: 'description', content: 'The offical personal blog of @arnondora' },
        {property: "og:title", "content" : 'Hello World - Mad Programmer Diary'},
        {property: "og:description", "content" : 'The offical personal blog of @arnondora'},
        {property: "og:locale", "content" : "th"},
        {property: "og:type", "content": "blog"},
        {property: "og:url", "content": `${process.env.APP_URL}`},
        {property: "og:image:secure_url", "content": siteLogo},
        {property: "og:site_name", "content": 'Hello World - Mad Programmer Diary'},
      ]}
    >
      <html lang="th"/>
    </Helmet>
    <ThemeProvider theme={colours}>
      {children()}
    </ThemeProvider>
  </React.Fragment>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
