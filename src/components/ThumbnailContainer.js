import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import isEmpty from 'lodash/isEmpty'

const SuperContainer = styled.div`
  min-height: 90vh;
  overflow: hidden;
`

const FullWidthContainer = styled.div`
  display: flex;
  min-width: 100%;
  min-height: 100%;
`

const ImgBackgroundControl = styled(Img)`
  height: 100%;
  width: 100%;
`

const BlankThumbnail = styled.div`
  position: absolute;
  background-color: ${props => props.theme.primaryColour};
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 90vh;
  z-index: 0;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 90vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
`

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 80%;
  margin: 0 auto;
  margin-top: ${props => (props.isSubtitle ? 30 : 35)}vh;
  z-index: 2;

  @media (max-width: 576px) {
    margin-top: 15vh;
  }

  @media (max-width: 677px) {
    margin-top: ${props => (props.isSubtitle ? 20 : 30)}vh;
  }

  @media (max-width: 350px) {
    margin-top: 30vh;
  }

  @media (max-width: 185px) {
    margin-top: 20vh;
  }
`

const Info = styled.p`
  color: white;
  font-size: ${props => (props.isSubtitle ? 1.5 : 1)}em;

  @media (max-width: 350px) {
    font-size: 1em;
  }
`

const Subtitle = styled.p`
  color: white;
  font-size: 1.2em;

  @media (max-width: 350px) {
    display: none;
  }
`

const Heading = styled.h1`
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-size: 3em;
  margin-bottom: 5px;
  line-height: 1.3;

  @media (max-width: 992px) {
    font-size: 2em;
  }

  @media (max-width: 350px) {
    font-size: 1em;
  }
`

export default class ThumbnailContainer extends React.Component {
  render() {
    return (
      <SuperContainer>
        {this.props.post.template === 'full-width' ? (
          <FullWidthContainer>
            {this.props.post.image !== null ? (
              <ImgBackgroundControl
                fluid={this.props.post.image.childImageSharp.fluid}
                alt={this.props.post.title}
                title={this.props.post.title}
                style={{ position: 'absolute', width: '100%', height: '90vh' }}
              />
            ) : (
              <BlankThumbnail />
            )}
            <Overlay />
            <ThumbnailWrapper isSubtitle={!isEmpty(this.props.post.subtitle)}>
              <Heading>{this.props.post.title}</Heading>
              {!isEmpty(this.props.post.subtitle) ? (
                <Subtitle>{this.props.post.subtitle}</Subtitle>
              ) : null}
              {this.props.post.type === 'post' ? (
                <Info isSubtitle={isEmpty(this.props.post.subtitle)}>
                  by {this.props.post.author} on {this.props.post.date}
                </Info>
              ) : null}
            </ThumbnailWrapper>
          </FullWidthContainer>
        ) : this.props.post.image !== null ? (
          <Img
            fluid={this.props.post.image.childImageSharp.fluid.src}
            outerWrapperClassName={'full-width-thumbnail-box'}
          />
        ) : (
          <BlankThumbnail />
        )}
      </SuperContainer>
    )
  }
}
