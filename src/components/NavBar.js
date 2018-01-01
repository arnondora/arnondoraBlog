import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { toInteger, get } from 'lodash'
import color from 'color'
import colours from '../utils/colours'
import arnondoraIcon from '../assets/arnondoraIcon.svg'

const Wrapper = styled.div `
  display: flex;
  z-index: 10;
  flex-direction: row;
  align-items: center;
  position: fixed;
  top: 0;
  height: 74px;
  justify-content: flex-start;
  width:100%;
  padding: 15px 0px 15px 15px;
  background-color: ${props => props.bgColour};
  overflow-x:hidden;
`

const Logo = styled.img `
  height: 40px;
  width: auto;
  margin : 0;
`

const SiteName = styled.span `
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

const NavHeadline = styled.p`
  color:white;
  margin: 0 0 0 20px;
  display: inline;
  overflow:hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const MenuItem = styled.li`
  display: inline;
  margin-left: 20px;
`

const StyledLink = styled(Link)`
  color: white;
`

const StyledLinkOut = styled.a`
  color:white;
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
      scroll: window.scrollY,
    })
	}

  render() {
    if (this.state.scroll < 256 && get(this.props, 'article', false))
      var bgColour = color(colours.primaryColour).alpha(this.state.scroll/300).string()
      else
      var bgColour = colours.primaryColour
    return (
      <Wrapper bgColour={bgColour}>
        <StyledLink to = "/"><Logo alt ={"site-logo"} src ={arnondoraIcon}/></StyledLink>
        {get(this.props,'article', false) ? null : <StyledLink to = "/"><SiteName>{this.props.siteTitle}</SiteName></StyledLink>}
        {this.state.scroll > 256 && get(this.props,'article',false) ? <NavHeadline>{this.props.headline}</NavHeadline>:<Menu>
          <StyledLink to = "/"><MenuItem>Home</MenuItem></StyledLink>
          <StyledLinkOut href = "https://sway.com/tkELbwHp3Smhd1aN"><MenuItem>about:me</MenuItem></StyledLinkOut>
          <StyledLink to = "/page/tutorial"><MenuItem>Tutorial</MenuItem></StyledLink>
        </Menu>}
      </Wrapper>
    )
  }
}
