import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Hello World - Mad Programmer Diary"
      meta={[
        { name: 'description', content: 'The offical personal blog of @arnondora' },
      ]}
    >
      <html lang="th"/>
    </Helmet>
    <div>
      {children()}
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
