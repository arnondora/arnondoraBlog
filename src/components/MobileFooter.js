import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import color from 'color'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faHome from '@fortawesome/fontawesome-free-solid/faHome'
import faUser from '@fortawesome/fontawesome-free-solid/faUser'
import faBook from '@fortawesome/fontawesome-free-solid/faBook'
import colours from '../utils/colours'

const Menu = styled.div`
  display: flex;
  justify-content:space-between;
  flex-direction: row;
  align-items: center;
  width:100%;
  position: fixed;
  bottom: 0;
  box-shadow: 0px -4px 9px -2px rgba(0,0,0,0.2);

  @media (min-width: 576px) {
      display: none;
  }

  z-index: 999;
`

const MenuItemWrapper = styled.div`
  background-color: ${colours.primaryColour};
  width:100%;
  flex-grow: 1;
  padding-top: 10px;
  padding-bottom: 10px;
  :hover
  {
    background-color: ${color(colours.primaryColour).darken(0.2).rgb().string()}
  }
`

const LinkGroup = styled(Link)`
  display: flex;
  flex-direction: column;
  align-self: center;
`

const Icon = styled(FontAwesomeIcon)`
  align-self: center;
  color: white;
  margin-top:0;
  margin-bottom: 10px;
  height:25px;
  width: auto;
`

const LogoText = styled.p`
  color: white;
  font-size: 14px;
  text-align: center;
  margin-bottom: 0;
`

export default class Footer extends React.Component {
  render () {
    return (
      <Menu>
        <MenuItemWrapper>
          <LinkGroup to = "/">
            <Icon icon={faHome} size ="2x"/>
            <LogoText>Home</LogoText>
          </LinkGroup>
        </MenuItemWrapper>

        <MenuItemWrapper>
          <LinkGroup to = "/cv">
            <Icon icon={faUser} size ="2x"/>
            <LogoText>about:me</LogoText>
          </LinkGroup>
        </MenuItemWrapper>

        <MenuItemWrapper>
          <LinkGroup  to = "/page/tutorial">
            <Icon icon={faBook} size ="2x"/>
            <LogoText>Tutorial</LogoText>
          </LinkGroup>
        </MenuItemWrapper>
      </Menu>
    )
  }
}
