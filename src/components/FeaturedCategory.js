import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { navigateTo } from "gatsby-link"
import { get } from 'lodash'
import colours from '../utils/colours'

const Container = styled.div`
  width:100%;
  margin-top: 20px;
  position: relative;
  overflow: hidden;
  border-radius: 8px;

  :hover {
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.20);
  }
`

const ContentContainer = styled.div`
  position: absolute;
  bottom: 8px;
  left: 16px;
  display: flex;
  flex-direction: column;
  width:80%;
  padding-left: 20px;
  z-index: 2;

  @media (min-width: 1024px) {
    padding-left: 50px;
    width:40%;
  }
`

const BlankBG = styled.div`
  height: 450px;
  width: 100%;
  background-color: ${colours.primaryColour}
`

const Overlay = styled.div`
  position:absolute;
  min-width:100%;
  min-height:100%;
  margin-top:-450px;
  background-color:rgba(0,0,0,0.4);
  z-index: 1;
`

const Title = styled.h2`
  color:white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.20);
  font-weight: 700;
  font-size: 22px;

  @media (min-width: 1024px) {
    font-size: 40px;
  }
`

const Subtitle = styled.p`
  color:white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.20);

  @media (min-width: 1024px) {
    font-size: 19px;
  }
`

export default class FeaturedCategory extends React.Component {

  render () {
    return (
      <Container onClick={ () => navigateTo(this.props.post.node.fields.slug)}>
        {
          get(this.props.post.node, 'frontmatter.image', false) !== false ?
            <Img sizes={this.props.post.node.frontmatter.image.childImageSharp.sizes}
              alt={this.props.post.node.frontmatter.title}
              style={{height:'450px', width:'100%'}}
            />
          :
          null
        }
        <Overlay/>

        <ContentContainer>
          <Title>{this.props.post.node.frontmatter.title}</Title>
          <Subtitle>{this.props.post.node.frontmatter.excerpt}</Subtitle>
        </ContentContainer>
      </Container>
    )
  }
}
