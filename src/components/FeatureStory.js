import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import Link from 'gatsby-link'
import get from 'lodash/get'
import filter from 'lodash/filter'
import take from 'lodash/take'
import color from 'color'

import colours from '../utils/colours'

const SuperWrapper = styled.div`
  height: 100vh;
  overflow: hidden;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  min-width: 100%;
  min-height: 100%;
  padding-left: 20px;
  padding-right:20px;
  padding-bottom: 20px;
  z-index: 2;
`
const ImgBackgroundControl = styled(Img) `
  height:100%;
  display: flex;
  z-index: 0;
`

const Overlay = styled.div`
  position:absolute;
  top:0;
  left:0;
  min-width:100%;
  min-height:100%;
  background-color:rgba(0,0,0,0.4);
  z-index: 1;
`
const Header = styled.span`
  font-size: 18px;
  margin-top:20px;
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.20);
`
const HeadingText = styled.h1`
  line-height: 1.1;
  font-size: 2em;
  color:white;
  margin-top:10px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0,0,0,0.20);
`

const Excerpt = styled.span`
  color:white;
`
const ReadMoreButtonContainer = styled.div`
  margin-top:30px;
`
const ReadMoreButton = styled(Link)`
  background-color: ${colours.primaryColour};
  color:white;
  float: right;
  padding: 13px 14px 13px 14px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.20);
  border-radius: 2px;

  :visited {
    color:white;
  }

  :hover {
    background-color: ${color(colours.primaryColour).darken(0.2).string()};
  }
`

export default class FeatureStory extends React.Component {
  render() {
    var featureStory = this.props.featuredStory

    return(
      <SuperWrapper>
        <Container>
          <Header>Featured Story</Header>
          <HeadingText>{featureStory.node.frontmatter.title}</HeadingText>
          <Excerpt>{featureStory.node.frontmatter.excerpt}</Excerpt>
          <ReadMoreButtonContainer><ReadMoreButton to={featureStory.node.fields.slug}>Read More</ReadMoreButton></ReadMoreButtonContainer>

        </Container>
        <Overlay/>
        <ImgBackgroundControl sizes={featureStory.node.frontmatter.image.childImageSharp.sizes} outerWrapperClassName={"index-thumbnail-wrapper"}/>
      </SuperWrapper>
    )
  }
}
