import React from 'react'
import styled from 'styled-components'
import isEmpty from 'lodash/isEmpty'
import { graphql } from 'gatsby'
import { FacebookProvider, Comments } from 'react-facebook'

import Layout from '../layouts/Layout'
import SEO from '../components/SEO'
import NavBar from '../components/NavBar'
import ThumbnailContainer from '../components/ThumbnailContainer'
import NextStory from '../components/NextStory'
import RecommendStory from '../components/RecommendStory'
import MobileSocialShareButton from '../components/MobileSocialShareButton'
import AppearanceController from '../components/AppearanceController'
import StickyMobileShare from '../components/StickyMobileShare'
import Footer from '../components/Footer'
import ArticleWrapper from '../components/BlogContent'

const Container = styled.div`
  display: flex;
  background-color: ${props =>
    props.isNight
      ? props.theme.night_darkBackground
      : props.theme.defaultBackground};

  @media (max-width: 768px) {
    padding-bottom: 38px;
  }
`

const MobileStickyShareContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
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

const PageWrapper = styled(ArticleWrapper)`
  width: 60%;
  margin: 0 auto;
  padding-top: 20px;

  @media (max-width: 768px) {
    width: 90%;
    padding-top: 20px;
  }
`

const CommentWrapper = styled.div`
  background-color: ${props =>
    props.isNight
      ? props.theme.night_lightBackground
      : props.theme.darkBackground};
`

const FacebookCommentBox = styled.div`
    text-align: center;
`

const SmallHeading = styled.h1`
  color: ${props => props.theme.textHeading};
  font-weight: 400;
  font-size: 2.5em;
  margin-bottom: 0px;
`

const SmallSubHeading = styled.p`
  margin-top: 10px;
  color: ${props => props.theme.textLowProfile};
  font-weight: 300;
`

const ThumbnailCredit = styled.em`
  display: block;
  text-align: center;
  color: ${props =>
    props.isNight ? props.theme.night_text_light : 'rgba(0,0,0,.68)'};
  padding-top: 5px;
  font-size: 0.8em;

  background-color: ${props =>
    props.isNight
      ? props.theme.night_darkBackground
      : props.theme.defaultBackground};

  a {
    color: ${props =>
      props.isNight ? props.theme.night_text_normal : 'rgba(0,0,0,.8)'};
  }
`

export default class BlogPostTemplate extends React.Component {
  constructor(props) {
    super(props)

    // TODO: Add isNight state store in session

    this.state = {
      isNight: false,
      fontScale: 0,
    }

    this.nightModeSwitcher = this.nightModeSwitcher.bind(this)
    this.enlargeFont = this.enlargeFont.bind(this)
    this.decreaseFont = this.decreaseFont.bind(this)
  }

  render() {
    const postContent = this.props.data.markdownRemark
    const postInfo = postContent.frontmatter
    const siteMetadata = this.props.pageContext.siteInfo.siteMetadata

    return (
      <Layout>
        <React.Fragment>
          <SEO
            postContent={postContent}
            slug={this.props.pageContext.slug}
            siteMetadata={siteMetadata}
          />
          <NavBar
            article={true}
            slug={this.props.pageContext.slug}
            headline={postInfo.title}
            isNight={this.state.isNight === null ? false : this.state.isNight}
          />
          <ThumbnailContainer post={postInfo} />
          {!isEmpty(postInfo.thumbnailCredit) ? (
            <ThumbnailCredit
              isNight={this.state.isNight}
              dangerouslySetInnerHTML={{ __html: postInfo.thumbnailCredit }}
            />
          ) : null}

          {postInfo.type === 'post' ? (
            <Container isNight={this.state.isNight}>
              <AppearanceController
                isNight={this.state.isNight}
                nightModeSwitcher={this.nightModeSwitcher}
                enlargeFont={this.enlargeFont}
                decreaseFont={this.decreaseFont}
              />
              <ContentWrapper>
                {postInfo.template === 'normal' ? (
                  <SmallHeading>{postInfo.title}</SmallHeading>
                ) : null}
                {postInfo.type === 'post' && postInfo.template === 'normal' ? (
                  <SmallSubHeading>
                    by {postInfo.author} on {postInfo.date}
                  </SmallSubHeading>
                ) : null}
                <ArticleWrapper
                  scale={this.state.fontScale}
                  isNight={this.state.isNight}
                  dangerouslySetInnerHTML={{ __html: postContent.html }}
                />
                <MobileSocialShareButton
                  slug={this.props.pageContext.slug}
                  isNight={this.state.isNight}
                />
              </ContentWrapper>
            </Container>
          ) : (
            <PageWrapper
              dangerouslySetInnerHTML={{ __html: postContent.html }}
            />
          )}
          {postInfo.type === 'post' &&
          (this.props.pageContext.next !== false ||
            this.props.pageContext.prev !== false) ? (
            <React.Fragment>
              <NextStory
                next={this.props.pageContext.next}
                prev={this.props.pageContext.prev}
                hasRelated={isEmpty(this.props.pageContext.related)}
                isNight={this.state.isNight}
                isSeries={this.props.pathContext.isSeries}
              />
              <RecommendStory stories={this.props.pageContext.related} />
            </React.Fragment>
          ) : null}

          {postInfo.type === 'post' ? (
            <CommentWrapper isNight={this.state.isNight}>
              <PageWrapper>
                <FacebookCommentBox>
                  <FacebookProvider appId="552530511753255">
                    <Comments href={process.env.APP_URL + "/" + this.props.pageContext.slug} width={"100%"} colorScheme={this.state.isNight?"dark" : "light"} />
                  </FacebookProvider>
                </FacebookCommentBox>
              </PageWrapper>
            </CommentWrapper>
          ) : null}

          <MobileStickyShareContainer>
            <StickyMobileShare slug={this.props.pageContext.slug} />
          </MobileStickyShareContainer>
          <Footer isNight={this.state.isNight} />
        </React.Fragment>
      </Layout>
    )
  }

  nightModeSwitcher() {
    this.setState({
      isNight: !this.state.isNight,
    })
  }

  enlargeFont() {
    this.setState({
      fontScale: this.state.fontScale < 0.3 ? this.state.fontScale + 0.1 : 0.3,
    })
  }

  decreaseFont() {
    this.setState({
      fontScale: this.state.fontScale > 0 ? this.state.fontScale - 0.1 : 0,
    })
  }
}

export const query = graphql`
  query ContentQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
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
            fluid(maxWidth: 1200, quality: 80) {
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
