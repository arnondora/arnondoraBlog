import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import isEmpty from 'lodash/isEmpty'
import Img from 'gatsby-image'
import { FacebookProvider, Comments } from 'react-facebook'

import Layout from '../layouts/Layout'
import SEO from '../components/SEO'
import NavBar from '../components/NavBar'
import BlogContent from '../components/BlogContent'
import AppearanceController from '../components/AppearanceController'
import NextStory from '../components/NextStory'
import RecommendStory from '../components/RecommendStory'
import StickyMobileShare from '../components/StickyMobileShare'
import Footer from '../components/Footer'

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const Title = styled.h1`
  padding-bottom: 15px;
  margin-bottom: 0;
`

const Excerpt = styled.p`
  padding-top: 5px;
  margin: 0;
  font-size: 1.2em;
`

const PostDescription = styled.p`
  padding-top: 20px;
`

const PostInfoContainer = styled.div`
  width: 85%;
  margin: 0 auto;
`

const BigContentWrapper = styled.div`
  padding-top: 130px;
  background-color: ${props =>
    props.isNight
      ? props.theme.night_darkBackground
      : props.theme.defaultBackground};

  & > ${PostInfoContainer} > ${Title}, ${Excerpt} {
    color: ${props =>
      props.isNight ? props.theme.night_text_light : props.theme.textHeading};
  }

  & > ${PostInfoContainer} > ${PostDescription} {
    color: ${props =>
      props.isNight
        ? props.theme.night_text_normal
        : props.theme.textLowProfile};
  }
`

const Thumbnail = styled(Img)`
  width: 90%;
  margin: 0 auto;
  margin-top: 30px;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0;
  }
`

const Content = styled(BlogContent)`
  width: 60%;
  margin: 0 auto;
  margin-top: 40px;

  @media (max-width: 768px) {
    width: 90%;
    margin-top: 40px;
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

const PageWrapper = styled(BlogContent)`
  width: 60%;
  margin: 0 auto;
  padding-top: 20px;

  @media (max-width: 768px) {
    width: 90%;
    padding-top: 20px;
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

export default class BlogPostNormalTemplate extends React.Component {
  constructor(props) {
    super(props)

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
            isTransparent={false}
            slug={this.props.pageContext.slug}
            headline={postInfo.title}
            isNight={this.state.isNight === null ? false : this.state.isNight}
            isSeries={this.props.pathContext.isSeries}
          />

          <BigContentWrapper isNight={this.state.isNight}>
            <PostInfoContainer>
              <Title>{postInfo.title}</Title>
              <Excerpt>
                {postInfo.subtitle ? postInfo.subtitle : postInfo.excerpt}
              </Excerpt>
              <PostDescription>
                By {postInfo.author} on {postInfo.date} in {postInfo.category}
              </PostDescription>
            </PostInfoContainer>

            {!isEmpty(postInfo.image) ? (
              <Thumbnail
                title={postInfo.title}
                alt={postInfo.title}
                fluid={postInfo.image.childImageSharp.fluid}
              />
            ) : null}
            {!isEmpty(postInfo.thumbnailCredit) ? (
              <ThumbnailCredit
                isNight={this.state.isNight}
                dangerouslySetInnerHTML={{ __html: postInfo.thumbnailCredit }}
              />
            ) : null}

            <ContentWrapper isNight={this.state.isNight}>
              <AppearanceController
                isNight={this.state.isNight}
                nightModeSwitcher={this.nightModeSwitcher}
                enlargeFont={this.enlargeFont}
                decreaseFont={this.decreaseFont}
              />

              <Content
                scale={this.state.fontScale}
                isNight={this.state.isNight}
                dangerouslySetInnerHTML={{ __html: postContent.html }}
              />
            </ContentWrapper>
          </BigContentWrapper>

          {this.props.pageContext.next !== false ||
          this.props.pageContext.prev !== false ? (
            <React.Fragment>
              <NextStory
                next={this.props.pageContext.next}
                prev={this.props.pageContext.prev}
                hasRelated={isEmpty(this.props.pageContext.related)}
                isNight={this.state.isNight}
                isSeries={this.props.isSeries}
              />
              <RecommendStory stories={this.props.pageContext.related} />
            </React.Fragment>
          ) : null}

          <CommentWrapper isNight={this.state.isNight}>
            <PageWrapper>
              <FacebookCommentBox>
                <FacebookProvider appId="552530511753255">
                  <Comments
                    href={
                      process.env.APP_URL + '/' + this.props.pageContext.slug
                    }
                    width={'100%'}
                    colorScheme={this.state.isNight ? 'dark' : 'light'}
                  />
                </FacebookProvider>
              </FacebookCommentBox>
            </PageWrapper>
          </CommentWrapper>

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
  query NormalTemplateQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        excerpt
        subtitle
        author
        thumbnailCredit
        category
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
