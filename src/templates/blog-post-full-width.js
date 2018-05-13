import React from 'react'
import styled from 'styled-components'
import { isEmpty } from 'lodash'

import colours from '../utils/colours'

import SEO from '../components/SEO'
import NavBar from '../components/NavBar'
import ThumbnailContainer from '../components/ThumbnailContainer'
import NextStory from '../components/NextStory'
import RecommendStory from '../components/RecommendStory'
import CommentBox from '../components/CommentBox'
import MobileSocialShareButton from '../components/MobileSocialShareButton'
import StickyMobileShare from '../components/StickyMobileShare'
import Footer from  '../components/Footer'

import './blog-post-full-width.css' /* Import Reader Style */

const Container = styled.div`
  display: flex;
  flex-direction:column;

  @media (max-width: 768px) {
    padding-bottom: 38px;
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
    z-index: 2;
  }
`

const ContentWrapper = styled.div`
  width: 60%;
  margin: 0 auto;
  margin-top: 0px;
  margin-bottom: 0px;

  @media (max-width: 768px) {
    width: 90%;
    margin-top: 25px;
  }
`
const ArticleWrapper = styled.div`
  margin-top:20px;

  @media (max-width: 768px) {
    margin-top:0;
  }
`

const PageWrapper = ArticleWrapper.extend`
  width: 60%;
  margin: 0 auto;
  padding-top: 20px;

  @media (max-width: 768px) {
    width: 90%;
    margin-top:20px;
  }
`

const CommentWrapper = styled.div`
  background-color: ${props => props.theme.darkBackground};
`

const Heading = styled.h1`
  color:white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.20);
  font-size: 3em;
`

const SmallHeading = styled.h1`
  color: ${props => props.theme.textHeading};
  font-weight: 400;
  font-size: 2.5em;
  margin-bottom: 0px;
`

const SmallSubHeading = styled.p`
  margin-top:10px;
  color: ${props => props.theme.textLowProfile};
  font-weight: 300;
`

const ThumbnailCredit = styled.em`
  display: block;
  text-align: center;
  color: rgba(0,0,0,.68);
  margin-top:5px;
  font-size: 0.8em;

  a {
    color: rgba(0,0,0,.8);
  }
`

export default class BlogPostTemplate extends React.Component {
  render() {
    const postContent = this.props.pathContext.post
    const postInfo = postContent.frontmatter
    const siteMetadata = this.props.pathContext.siteInfo.siteMetadata

    return (
      <React.Fragment>
        <SEO
          postContent={postContent}
          siteMetadata={siteMetadata}
        />
        <NavBar article={true} slug={postContent.fields.slug} headline={postInfo.title}/>

        <ThumbnailContainer post={postInfo}/>
        {!isEmpty(postInfo.thumbnailCredit)? <ThumbnailCredit dangerouslySetInnerHTML={{ __html: postInfo.thumbnailCredit }}/> : null}

        {postInfo.type === "post" ? <Container>
            <ContentWrapper>
              {postInfo.template === "normal" ? <SmallHeading>{postInfo.title}</SmallHeading> : null}
              {postInfo.type === "post" && postInfo.template === "normal"? <SmallSubHeading>by {postInfo.author} on {postInfo.date}</SmallSubHeading> : null}
              <ArticleWrapper dangerouslySetInnerHTML={{ __html: postContent.html }} />
              <MobileSocialShareButton slug={postContent.fields.slug}/>
            </ContentWrapper>

          </Container> :
          <PageWrapper dangerouslySetInnerHTML={{ __html: postContent.html }} />
        }
        {
          postInfo.type === "post" && (this.props.pathContext.next !== false || this.props.pathContext.prev !== false) ?
            <React.Fragment>
              <NextStory next={this.props.pathContext.next} prev={this.props.pathContext.prev} hasRelated={isEmpty(this.props.pathContext.related)}/>
              <RecommendStory stories = {this.props.pathContext.related}/>
            </React.Fragment>
          : null
        }

        {
          postInfo.type === "post" ?
          <CommentWrapper><PageWrapper><CommentBox slug={postContent.fields.slug}/></PageWrapper></CommentWrapper>
          :
          null
        }

        <MobileStickyShareContainer><StickyMobileShare slug={postContent.fields.slug}/></MobileStickyShareContainer>
        <Footer/>
      </React.Fragment>

    )
  }
}
