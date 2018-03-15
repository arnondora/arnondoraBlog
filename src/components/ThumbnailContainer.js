import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { get, isEmpty } from 'lodash'

import colours from '../utils/colours'

const SuperContainer = styled.div`
  min-height: 80vh;
  overflow: hidden;
`

const FullWidthContainer = styled.div`
  display: flex;
  min-width: 100%;
  min-height: 100%;
`

const ImgBackgroundControl = styled(Img) `
  height:100%;
  width: 100%;
  display: flex;
`

const BlankThumbnail = styled.div`
  position: absolute;
  background-color: ${colours.primaryColour};
  top:0;
  left:0;
  min-width:100%;
  min-height:80vh;
  z-index: 0;
`

const Overlay = styled.div`
  position:absolute;
  top:0;
  left:0;
  min-width:100%;
  min-height:80vh;
  background-color:rgba(0,0,0,0.4);
  z-index: 1;
`

const ThumbnailWrapper = styled.div`
  position: relative;
  width:80%;
  margin: 0 auto;
  margin-top: 30vh;
  z-index: 2;

  @media (max-width: 768px) {
    margin-top: 20vh;
  }
`

const Info = styled.p`
  color: white;
  font-size: ${props => props.isSubtitle ? 1.5 : 0.9}em;
`

const Subtitle = styled.p`
  color:white;
  font-size: 1.2em;
`

const Heading = styled.h1`
  color:white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.20);
  font-size: 3em;
  margin-bottom: 5px;
  line-height: 1.3;
`

export default class ThumbnailContainer extends React.Component {
  render () {
    return (
      <SuperContainer>
        { this.props.post.template === 'full-width' ?
          <FullWidthContainer>
            {this.props.post.image !== null ? <ImgBackgroundControl sizes={this.props.post.image.childImageSharp.sizes} outerWrapperClassName={"full-width-thumbnail-box"}/> : <BlankThumbnail/>}
            <Overlay/>
            <ThumbnailWrapper>
              <Heading>{this.props.post.title}</Heading>
              {!isEmpty(this.props.post.subtitle) ?<Subtitle>{this.props.post.subtitle}</Subtitle> : null}
              {this.props.post.type === "post" ? <Info isSubtitle={isEmpty(this.props.post.subtitle)}>by {this.props.post.author} on {this.props.post.date}</Info> : null}
            </ThumbnailWrapper>
          </FullWidthContainer>
          :

          this.props.post.image !== null ? <Img sizes={this.props.post.image.childImageSharp.sizes.src} outerWrapperClassName={"full-width-thumbnail-box"}/> :
          <BlankThumbnail/>
        }
      </SuperContainer>
    )
  }
}
