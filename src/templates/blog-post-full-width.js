import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { take } from 'lodash'

import colours from '../utils/colours'

import NavBar from '../components/NavBar'
import SocialSharingButtonGroup from '../components/SocialSharingButtonGroup'
import NextStory from '../components/NextStory'
import RecommendStory from '../components/RecommendStory'
import Footer from  '../components/Footer'

const SuperWrapper = styled.div`

`
const Container = styled.div`
  display: flex;
  flex-direction:column;
`

const ThumbnailContainer = styled.div`
  display: flex;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${props => props.thumbnail}), ${colours.primaryColour};
  background-size:cover;
  background-position:center;
  background-repeat: no-repeat;
`

const ThumbnailWrapper = styled.div`
  width:80%;
  margin: 0 auto;
  margin-top: 40vh;
  margin-bottom: 20vh;

  @media (max-width: 768px) {
    margin-top: 10vh;
    margin-bottom: : 10vh;
  }
`

const SocialButtons = styled.div`
  position: sticky;
  top: 30vh;
  margin-left: 15vw;
  margin-top: 10vh;

  @media (max-width: 768px) {
    margin-left: 1vw;
  }
`

const ContentWrapper = styled.div`
  width: 50%;
  margin: 0 auto;
  margin-top: -160px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    width: 80%;
    margin-top: -190px;
  }
`

const Heading = styled.h1`
  color:white;
  font-size: 3em;
`

const Info = styled.p`
  color: white;
  font-size: 1.5em;
`

export default class BlogPostTemplate extends React.Component {
  render() {
    const postContent = this.props.data.markdownRemark
    const postInfo = postContent.frontmatter
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <SuperWrapper>
        <NavBar article={true}/>
        <ThumbnailContainer thumbnail={postInfo.landscapeThumbnail}>
          <ThumbnailWrapper>
            <Heading>{postInfo.title}</Heading>
            <Info>by {postInfo.author} on {postInfo.date}</Info>
          </ThumbnailWrapper>
        </ThumbnailContainer>
        <Helmet title={`${postInfo.title} - ${siteTitle}`} />
        <Container>
          <SocialButtons><SocialSharingButtonGroup slug={postContent.fields.slug}/></SocialButtons>
          <ContentWrapper dangerouslySetInnerHTML={{ __html: postContent.html }} />
        </Container>
        <NextStory next={this.props.pathContext.next} prev={this.props.pathContext.prev}/>
        <RecommendStory stories = {take(this.props.pathContext.related,4)}/>

        <Footer/>
      </SuperWrapper>

    )
  }
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
      }
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
`
