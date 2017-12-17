import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import colours from '../utils/colours'

import NavBar from '../components/NavBar'

const SuperWrapper = styled.div`

`

const Container = styled.div`
  width: 80%;
  margin: 0 auto;

  margin-top: 30px;

  @media (max-width: 768px) {
    width: 90%;
  }
`
const CategoryInfoWrapper = styled.div`
  margin-top: 30px;
`
const CategoryName = styled.h1 `
  margin: 0;
`
export default class CategoryTemplate extends React.Component
{
  render () {
    console.log(this.props)
    return (
      <SuperWrapper>
        <NavBar siteTitle = {this.props.data.site.siteMetadata.title}/>

      </SuperWrapper>
    )
  }
}

export const pageQuery = graphql`
  query SiteInfoQuery($name : String) {
    site {
      siteMetadata {
        title
      }
    }

    allCategoriesJson (
      filter: { name: { eq: "Programming 101" } }
    ){
      edges {
        node {
          name
          link
          description
          thumbnail
        }
      }
    }


    allMarkdownRemark (
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { category: { eq: $name } } }
    ){
        edges {
          node {
            excerpt(pruneLength: 250)
            id
            frontmatter {
              title
              landscapeThumbnail
              category
              date(formatString: "MMMM DD, YYYY")
              author
              type
              status
            }
          }
        }
      }
  }
`
