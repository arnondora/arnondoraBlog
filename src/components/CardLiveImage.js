import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import { isEmpty, capitalize } from 'lodash'
import colours from '../utils/colours'

const Container = styled(Link)`
  display: flex;
  flex-direction: column;
`
const ContentContainer = styled.div `
  display: flex;
  flex-direction: column;
  padding: 20px 52px 20px 52px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.05);
  border-radius: 2px;
  overflow: hidden;

  :hover {
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.20);
  }
`

const Heading = styled.h2`
  color: ${colours.textHeading};
  font-size: 25.92px;
  margin-top:0;
  margin-bottom: 0;

  ${ContentContainer}:hover > & {
    color: ${colours.primaryColour};
  }
`

const Subtitle = styled.p`
  color: ${colours.textSecondary};
  margin-top:30px;
  margin-bottom: 0;
`

const ThumbnailImageHolder = styled.img`
  width:100%;
  height:auto;
  margin-bottom: 0;
`

export default class CardLiveImage extends React.Component {
  render () {
    return (
      <Container to ={this.props.post.slug}>
        <ContentContainer isThumbnail={!isEmpty(this.props.post.thumbnail)}>
          <Heading to ={this.props.post.slug}>{this.props.post.title}</Heading>
          <Subtitle>{this.props.post.subtitle}</Subtitle>
        </ContentContainer>
      </Container>
    )
  }
}
