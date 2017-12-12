import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

import colours from '../utils/colours'
import animator from "./animator.module.css";

const Container = styled.div`
  background-color: ${props => props.hover ? colours.primaryColour : 'white'};
  color: white;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.05);
  height: 300px;
  width: 100%;
  max-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 1;
  margin-left: 50px;
  :first-child{
    margin-left: 0px;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  width:95%;
  margin-left: 10px;
  transform: translateY(85px);
`

const CatName = styled(Link)`
  font-size: 36px;
  color: ${colours.textHeading};
  margin-bottom: 20px;
`
const CatDescription = styled.p`
  color: ${colours.textHeading};
  visibility: hidden;
  font-size: 18px;
  margin-bottom: 33px;
`

export default class CategoryButton extends React.Component {
  constructor (props)
  {
    super()
    this.state = {
      isHover : false,
    }
  }

  render() {
    var slug = "/" + this.props.slug

    return (
      <Container className = {animator.parent}>
        <ContentWrapper className = {animator.fadein}>
            <CatName className = {animator.text} to = {slug}>{this.props.name}</CatName>
            <CatDescription className = {animator.text} to = {slug}>{this.props.description}</CatDescription>
        </ContentWrapper>
      </Container>
    )
  }

  onHover = () => {
    this.setState({
      isHover: true,
    })
  }

  onLeave = () => {
    this.setState({
      isHover: false,
    })
  }
}
