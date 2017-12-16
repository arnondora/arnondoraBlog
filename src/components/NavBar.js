import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import color from 'color'
import { toInteger, get } from 'lodash'
import colours from '../utils/colours'
import arnondoraIcon from '../assets/arnondoraIcon.svg'

const Wrapper = styled.div `
  display: flex;
  z-index: 10;
  flex-direction: row;
  align-items: center;
  position: fixed;
  height: 74px;
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
  constructor(props) {
      super(props)
      this.state = {
        scroll: 0,
      }
  }

  componentWillUnmount() {
		if (this.props.article) window.removeEventListener('scroll', this.handleScroll)
	}

	componentDidMount() {
		if (this.props.article) window.addEventListener('scroll', this.handleScroll)
	}

  handleScroll = e => {
    this.setState({
      scroll: window.scrollY
    })
	}

  render() {
    if (this.state.scroll < 256 && get(this.props, 'article', false))
      var bgColour = color(colours.primaryColour).alpha(this.state.scroll/300).string()
    else
      var bgColour = colours.primaryColour

    return (
      <Wrapper bgColour={bgColour}>
        <StyledLink to = "/"><Logo src ={arnondoraIcon}/></StyledLink>
        <StyledLink to = "/"><SiteName>{this.props.siteTitle}</SiteName></StyledLink>
        <Menu>
          <StyledLink to = "/"><MenuItem>Home</MenuItem></StyledLink>
          <StyledLink to = "/"><MenuItem>about:me</MenuItem></StyledLink>
          <StyledLink to = "/"><MenuItem>Tutorial</MenuItem></StyledLink>
        </Menu>
      </Wrapper>
    )
  }
}
