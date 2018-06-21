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
  background-color: ${props => props.isNight? props.theme.night_darkBackground : props.theme.defaultBackground};

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

  & > *, & > blockquote > p, & > ul,ol > li, & > ul,ol > li > strong {
    color: ${props => props.isNight ? props.theme.night_text_light : props.theme.textHeading};
  }

  & > h1 {
    font-size: 2.6058rem;
  }

  & > h2 {
    font-size: 2.00448rem;
  }

  & > h3 {
    font-size: 1.6704rem;
  }

  & > h4 {
    font-size: 1.392rem;
  }

  & > p,li {
    font-size: 1.1rem;
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
  background-color: ${props => props.isNight? props.theme.night_lightBackground :props.theme.darkBackground};
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
  constructor (props) {
      super(props)
      this.state = {
        isNight: false,
      }

      this.nightModeSwitcher = this.nightModeSwitcher.bind(this)
  }

  render() {
    const postContent = this.props.data.markdownRemark
    const postInfo = postContent.frontmatter
    const siteMetadata = this.props.pathContext.siteInfo.siteMetadata

    return (
      <React.Fragment>
        <SEO
          postContent={postContent}
          slug = {this.props.pathContext.slug}
          siteMetadata={siteMetadata}
        />
        <NavBar article={true} slug={this.props.pathContext.slug} headline={postInfo.title} isNight={this.state.isNight === null ? false : this.state.isNight}/>
        <ThumbnailContainer post={postInfo}/>
        {!isEmpty(postInfo.thumbnailCredit)? <ThumbnailCredit dangerouslySetInnerHTML={{ __html: postInfo.thumbnailCredit }}/> : null}

        {postInfo.type === "post" ? <Container isNight={this.state.isNight}>
            <ContentWrapper>
              <div><button onClick={this.nightModeSwitcher}>Change</button></div>
              {postInfo.template === "normal" ? <SmallHeading>{postInfo.title}</SmallHeading> : null}
              {postInfo.type === "post" && postInfo.template === "normal"? <SmallSubHeading>by {postInfo.author} on {postInfo.date}</SmallSubHeading> : null}
              <ArticleWrapper isNight={this.state.isNight} dangerouslySetInnerHTML={{ __html: postContent.html }} />
              <MobileSocialShareButton slug={this.props.pathContext.slug} isNight={this.state.isNight}/>
            </ContentWrapper>

          </Container> :
          <PageWrapper dangerouslySetInnerHTML={{ __html: postContent.html }} />
        }
        {
          postInfo.type === "post" && (this.props.pathContext.next !== false || this.props.pathContext.prev !== false) ?
            <React.Fragment>
              <NextStory next={this.props.pathContext.next} prev={this.props.pathContext.prev} hasRelated={isEmpty(this.props.pathContext.related)} isNight={this.state.isNight}/>
              <RecommendStory stories = {this.props.pathContext.related}/>
            </React.Fragment>
          : null
        }

        {
          postInfo.type === "post" ?
          <CommentWrapper isNight={this.state.isNight}><PageWrapper><CommentBox slug={this.props.pathContext.slug} isNight={this.state.isNight}/></PageWrapper></CommentWrapper>
          :
          null
        }

        <MobileStickyShareContainer><StickyMobileShare slug={this.props.pathContext.slug}/></MobileStickyShareContainer>
        <Footer isNight={this.state.isNight}/>
      </React.Fragment>

    )
  }

  nightModeSwitcher () {
    console.log("changed")
    this.setState({
      isNight : !this.state.isNight
    })
  }
}

export const query = graphql`
  query ContentQuery ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug}}) {
      html
      frontmatter {
        title
        excerpt
        subtitle
        template
        type
        author
        thumbnailCredit
        date(formatString: "MMMM DD, YYYY")
        image {
          childImageSharp {
            sizes (maxWidth: 1200, quality: 80) {
              base64
              tracedSVG
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
        }
      }
    }
  }
`
