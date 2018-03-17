import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import toInteger from 'lodash/toInteger'
import get from 'lodash/get'
import color from 'color'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'

import colours from '../utils/colours'
import arnondoraIcon from '../assets/arnondoraIcon.svg'

import SocialShareNavBarButtons from './SocialShareNavBarButtons'

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
  overflow:hidden;
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

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;

  @media (max-width: 576px) {
      justify-content: flex-end;
  }
`

const LeftMenu = styled.ul `
  align-self: center;
  color: white;
  font-weight: ${props => props.isArticle ? 400 : 300};
  margin: 0;
  list-style-type: none;
  list-style-position: inside;

  @media (max-width: 576px) {
      display: none;
  }
`

const RightMenu = styled.ul `
  align-self: flex-end;
  color: white;
  font-weight: 300;
  margin: 0;
  list-style-type: none;
  list-style-position: inside;
`

const NavHeadShare = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
`

const NavHeadline = styled.span`
  align-self: flex-start;
  color:white;
  margin: 0 0 0 20px;
  display: inline;
  overflow:hidden;
  font-size: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const NavShareButton = styled.div `
  margin-right: 20px;
  align-self: flex-end;

  @media (max-width: 768px) {
    display: none;
  }

`

const NavSearchWrapper = styled.div `
  margin-right: 20px;
  align-self: flex-end;
`

const MenuItem = styled.li`
  display: inline;
  margin-left: 20px;
  margin-bottom: 0;
  color : white;
`

const StyledLink = styled(Link)`
  color: white;

  :visited {
    color: white;
  }
`

const StyledLinkOut = styled.a`
  color:white !important;

  :visited {
    color: white !important;
  }
`

const SearchIcon = styled(FontAwesomeIcon)`
  align-self: center;
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

        {this.state.scroll > 256 && get(this.props,'article',false && get(this.props,'slug', false)) ?
        <NavHeadShare>
          <NavHeadline>{this.props.headline}</NavHeadline>
          <NavShareButton><SocialShareNavBarButtons slug={this.props.slug}/></NavShareButton>
        </NavHeadShare>

        :

        <Menu>
            <LeftMenu isArticle={get(this.props, 'article', false)}>
                <MenuItem><StyledLink to = "/">Home</StyledLink></MenuItem>
                <MenuItem><StyledLink to = "/cv">about:me</StyledLink></MenuItem>
                <MenuItem><StyledLink to = "/category/tutorial">Tutorial</StyledLink></MenuItem>
            </LeftMenu>

            {
              get(this.props, 'article', false) === false ?
              <RightMenu>
                <MenuItem><StyledLink to = "/search" aria-label="search"><NavSearchWrapper><SearchIcon icon={faSearch}/></NavSearchWrapper></StyledLink></MenuItem>
            </RightMenu> : null
          }
        </Menu>
      }
      </Wrapper>
    )
  }
}
