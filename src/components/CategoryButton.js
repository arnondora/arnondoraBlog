import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

import colours from '../utils/colours'


const Container = styled(Link)`
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${props => props.thumbnail}) ${props => props.hover ? colours.primaryColour : 'white'};
  background-position:center;
  background-repeat: no-repeat;
  color: white;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.05);
  height: 300px;
  width:30%;
  min-width: 200px;
  max-height: 300px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;

  &:hover > * {
    transform: translateY(0);
    transition: transform .2s ease;
  }

  @media (max-width: 693px)
  {
    width:100%;
    margin-left: 0;
  }
`


const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  width:95%;
  margin-left: 10px;
  transform: translateY(90px);

  @media (max-width: 693px)
  {
    transform: translateY(60px);
  }
`

const CatName = styled.span`
  font-size: 36px;
  line-height: 1.2;
  color: white;
  margin-bottom: 20px;
`
const CatDescription = styled.span`
  color: white;
  width:100%;
  visibility: hidden;
  font-size: 18px;
  margin-bottom: 33px;

  ${Container}:hover & {
    color:white;
    visibility:visible;
  }
`

export default class CategoryButton extends React.Component {
  render() {
    var slug = "/category/" + this.props.slug

    return (
      <Container to = {slug} thumbnail={this.props.thumbnail}>
        <ContentWrapper>
            <CatName>{this.props.name}</CatName>
            <CatDescription>{this.props.description.length > 40 ? this.props.description.substr(0,38) + "..." : this.props.description}</CatDescription>
        </ContentWrapper>
      </Container>
    )
  }
}
