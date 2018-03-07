import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'

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
  font-size: 1.5em;
`

const Heading = styled.h1`
  color:white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.20);
  font-size: 3em;
`

export default class ThumbnailContainer extends React.Component {
  render () {
    return (
      <SuperContainer>
        { this.props.post.template === 'full-width' ?
          <FullWidthContainer thumbnail={get(this.props.post, 'image.childImageSharp.sizes.srcWebp')}>
            <ThumbnailWrapper>
              <Heading>{this.props.post.title}</Heading>
              {this.props.post.type === "post" ? <Info>by {this.props.post.author} on {this.props.post.date}</Info> : null}
            </ThumbnailWrapper>
          </FullWidthContainer>
          :

          <OnlyThumbnail thumbnail={get(this.props.post, 'image.childImageSharp.sizes.srcWebp')}></OnlyThumbnail>
        }
      </SuperContainer>
    )
  }
}
