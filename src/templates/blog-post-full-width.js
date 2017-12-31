import React from 'react'
import styled from 'styled-components'
import { take, get } from 'lodash'

import colours from '../utils/colours'

import SEO from '../components/SEO'
import NavBar from '../components/NavBar'
import SocialSharingButtonGroup from '../components/SocialSharingButtonGroup'
import NextStory from '../components/NextStory'
import RecommendStory from '../components/RecommendStory'
import MobileSocialShareButton from '../components/MobileSocialShareButton'
import StickyMobileShare from '../components/StickyMobileShare'
import Footer from  '../components/Footer'

import './blog-post-full-width.css' /* Import Reader Style */

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

const OnlyThumbnail = styled.div`
  background: url(${props => props.thumbnail}), ${colours.primaryColour};
  background-size:cover;
  background-position:center;
  background-repeat: no-repeat;
  height: 80vh;
`

const ThumbnailWrapper = styled.div`
  width:80%;
  margin: 0 auto;
  margin-top: 40vh;
  margin-bottom: 20vh;

  @media (max-width: 768px) {
    margin-top: 20vh;
    margin-bottom: : 20vh;
  }
`

const SocialButtons = styled.div`
  position: sticky;
  top: 30vh;
  margin-left: 15vw;
  margin-top: 10vh;

  @media (max-width: 768px) {
    display: none;
  }
`

const MobileShareButtonContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    width: 90%;
    padding-bottom: 20px;
    margin: 0 auto;
    display:block;
  }
`

const MobileStickyShareContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display:block;
    position:fixed;
    left: 0;
    bottom: 0;
    width:100%;
  }
`

const ContentWrapper = styled.div`
  width: 50%;
  margin: 0 auto;
  margin-top: -160px;
  margin-bottom: 0px;

  @media (max-width: 768px) {
    width: 90%;
    margin-top: 25px;
  }
`
const ArticleWrapper = styled.div`
`

const PageWrapper = ArticleWrapper.extend`
  width: 50%;
  margin: 0 auto;
  margin-top: 20px;

  @media (max-width: 768px) {
    width: 90%;
    margin-top:20px;
  }
`

const Heading = styled.h1`
  color:white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.20);
  font-size: 3em;
`

const Info = styled.p`
  color: white;
  font-size: 1.5em;
`

const SmallHeading = styled.h1`
  color: ${colours.textHeading};
  font-weight: 400;
  font-size: 2.5em;
  margin-bottom: 0px;
`

const SmallSubHeading = styled.p`
  margin-top:10px;
  color: ${colours.textLowProfile};
  font-weight: 300;
`

export default class BlogPostTemplate extends React.Component {
  render() {
    const postContent = this.props.data.markdownRemark
    const postInfo = postContent.frontmatter
    const siteMetadata = this.props.data.site.siteMetadata

    return (
      <SuperWrapper>
        <SEO
          postContent={postContent}
          siteMetadata={siteMetadata}
        />
        <NavBar article={true}/>

        {postInfo.template === "full-width" ?
          <ThumbnailContainer thumbnail={get(postInfo, 'image.childImageSharp.original.src',"")}>
            <ThumbnailWrapper>
              <Heading>{postInfo.title}</Heading>
              {postInfo.type === "post" ? <Info>by {postInfo.author} on {postInfo.date}</Info> : null}
            </ThumbnailWrapper>
          </ThumbnailContainer> :

          <OnlyThumbnail thumbnail={get(postInfo,"image.childImageSharp.original.src","")}></OnlyThumbnail>
        }

        {postInfo.type === "post" ? <Container>
            <SocialButtons><SocialSharingButtonGroup slug={postContent.fields.slug}/></SocialButtons>
            <ContentWrapper>
              {postInfo.template === "normal" ? <SmallHeading>{postInfo.title}</SmallHeading> : null}
              {postInfo.type === "post" && postInfo.template === "normal"? <SmallSubHeading>by {postInfo.author} on {postInfo.date}</SmallSubHeading> : null}
              <ArticleWrapper dangerouslySetInnerHTML={{ __html: postContent.html }} />
            </ContentWrapper>
            <MobileShareButtonContainer><MobileSocialShareButton slug={postContent.fields.slug}/></MobileShareButtonContainer>
          </Container> :
          <Container><PageWrapper dangerouslySetInnerHTML={{ __html: postContent.html }} /></Container>
        }
        {
          postInfo.type === "post" ?
            <div>
              <NextStory next={this.props.pathContext.next} prev={this.props.pathContext.prev}/>
              <RecommendStory stories = {take(this.props.pathContext.related,4)}/>
            </div>
          : null
        }

        <MobileStickyShareContainer><StickyMobileShare slug={postContent.fields.slug}/></MobileStickyShareContainer>
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
        description
        siteUrl
        authorTwitter
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
        image {
          childImageSharp {
            original {
               src
            }
          }
        }
        excerpt
        category
        date(formatString: "MMMM DD, YYYY")
        author
        type
        template
        status
      }
    }
  }
`
