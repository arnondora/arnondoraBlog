import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import color from 'color'
import { toInteger } from 'lodash'
import colours from '../utils/colours'
import arnondoraIcon from '../assets/arnondoraIcon.svg'

const Wrapper = styled.div `
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width:100%;
  padding: 15px 0px 15px 15px;
  background-color: ${props => props.bgColour}
`

const Logo = styled.img `
  height: 40px;
  width: auto;
  margin : 0;
`

const SiteName = styled.p `
  color: white;
  font-size: 24px;
  font-weight: 400;
  margin: 0;
  margin-left: 15px;
`

const Menu = styled.ul `
  color: white;
  font-weight: 300;
  margin: 0;
  list-style-type: none;
  list-style-position: inside;

  @media (max-width: 576px) {
      display: none;
  }
`

const MenuItem = styled.li`
  display: inline;
  margin-left: 20px;
`

const StyledLink = styled(Link)`
  color: white;
`

export default class NavBar extends React.Component
{
  render() {
    if (toInteger(this.props.isTransparent) == 1) var bgColour = color(colours.primaryColour).alpha(0).string()
    else var bgColour = colours.primaryColour
    return (
      <Wrapper bgColour={bgColour}>
        <StyledLink to = "/"><Logo src ={arnondoraIcon}/></StyledLink>
        <StyledLink to = "/"><SiteName>"{process.env.SITE_NAME}"</SiteName></StyledLink>
        <Menu>
          <StyledLink to = "/"><MenuItem>Home</MenuItem></StyledLink>
          <StyledLink to = "/"><MenuItem>about:me</MenuItem></StyledLink>
          <StyledLink to = "/"><MenuItem>Tutorial</MenuItem></StyledLink>
        </Menu>
      </Wrapper>
    )
  }
}
