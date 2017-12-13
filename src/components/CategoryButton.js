import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

import colours from '../utils/colours'
import animator from "./animator.module.css";


const Container = styled.div`
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

const CatName = styled(Link)`
  font-size: 36px;
  line-height: 1.2;
  color: white;
  margin-bottom: 20px;
`
const CatDescription = styled.p`
  color: white;
  width:100%;
  visibility: hidden;
  font-size: 18px;
  margin-bottom: 33px;
`

export default class CategoryButton extends React.Component {
  render() {
    var slug = "/" + this.props.slug

    return (
      <Container thumbnail={this.props.thumbnail} className = {animator.parent}>
        <ContentWrapper className = {animator.fadein}>
            <CatName className = {animator.text} to = {slug}>{this.props.name}</CatName>
            <CatDescription className = {animator.text} to = {slug}>{this.props.description}</CatDescription>
        </ContentWrapper>
      </Container>
    )
  }
}
