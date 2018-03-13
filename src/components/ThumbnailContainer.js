import React from 'react'
import styled from 'styled-components'
import { get, isEmpty } from 'lodash'

import colours from '../utils/colours'

const SuperContainer = styled.div`

`

const FullWidthContainer = styled.div`
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
          <FullWidthContainer thumbnail={get(this.props.post, 'image.childImageSharp.sizes.src')}>
            <ThumbnailWrapper>
              <Heading>{this.props.post.title}</Heading>
              {!isEmpty(this.props.post.subtitle) ?<Subtitle>{this.props.post.subtitle}</Subtitle> : null}
              {this.props.post.type === "post" ? <Info isSubtitle={isEmpty(this.props.post.subtitle)}>by {this.props.post.author} on {this.props.post.date}</Info> : null}
            </ThumbnailWrapper>
          </FullWidthContainer>
          :

          <OnlyThumbnail thumbnail={get(this.props.post, 'image.childImageSharp.sizes.src')}></OnlyThumbnail>
        }
      </SuperContainer>
    )
  }
}
