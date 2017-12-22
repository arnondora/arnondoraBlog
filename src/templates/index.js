import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import MobileFooter from '../components/MobileFooter'
import FeatureStory from '../components/FeatureStory'
import CategoryButton from '../components/CategoryButton'
import IndexTab from '../components/IndexTab'

import FeatureStoryThumbnail from '../assets/FeatureStoryThumbnail.jpg'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #FAFAFA;
  min-height: 100vh;
`

const MainContentContainer = styled.div`
`

const FeatureStoryContainer = styled.div`
  position: fixed;
  top: 74px;
  width:35%;

  @media (max-width: 768px) {
      display: none;
  }
`

const ContentWrapper = styled.div`
  position: relative;
  width:65%;
  margin-top: 74px;
  margin-left: auto;

  @media (max-width: 768px) {
      width:100%;
  }
`

const ContentContainer = styled.div`
  width:95%;
  margin: 0 auto;
  padding-top:20px;
`

export default class IndexPage extends React.Component {
  render () {
    console.log()
    return (
      <Container>
        <NavBar siteTitle = {this.props.data.site.siteMetadata.title}/>

        <MainContentContainer>
          <FeatureStoryContainer>
            <FeatureStory
              posts = {this.props.data.allMarkdownRemark.edges}
            />
          </FeatureStoryContainer>

          <ContentWrapper>
            <ContentContainer>
              <IndexTab categories={this.props.data.allCategoriesJson.edges} posts = {this.props.pathContext.group} pagination = {this.props.pathContext}/>
            </ContentContainer>
          </ContentWrapper>

        </MainContentContainer>

        <MobileFooter/>
      </Container>
    )
  }
}

export const query = graphql`
  query navQuery {
    site {
      siteMetadata {
        title
      }
    }

    # Get all Posts
    allMarkdownRemark (
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { type: { eq: "post" } } }
    ) {
      edges {
        node {
          id
          html
          excerpt (pruneLength: 250)
          fields {
            slug
          }
          frontmatter {
            title
            isFeatured
            excerpt
            image {
              childImageSharp {
                resolutions (width:1200, quality: 50) {
              	   src
            	  }
              }
            }
            category
            date(formatString: "MMMM DD, YYYY")
            author
            type
            status
          }
        }
      }
    }

    allCategoriesJson {
      edges {
        node {
          id
          name
          link
          description
          thumbnail
        }
      }
    }
  }
`
