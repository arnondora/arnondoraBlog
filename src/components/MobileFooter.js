import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import color from 'color'

import MaterialIcon from '../components/MaterialIcon'

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: 100%;
  position: fixed;
  bottom: 0;
  box-shadow: 0px -4px 9px -2px rgba(0, 0, 0, 0.2);

  @media (min-width: 576px) {
    display: none;
  }

  z-index: 999;
`

const MenuItemWrapper = styled.div`
  background-color: ${props => props.theme.primaryColour};
  width: 100%;
  flex-grow: 1;
  padding-top: 10px;
  padding-bottom: 10px;
  :hover {
    background-color: ${props =>
      color(props.theme.primaryColour)
        .darken(0.2)
        .rgb()
        .string()};
  }
`

const LinkGroup = styled(Link)`
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
`

const Icon = styled(MaterialIcon)`
  align-self: center;
  color: white;
  margin-top: 0;
  margin-bottom: 10px;
  height: 25px;
  width: auto;
`

const LogoText = styled.p`
  color: white;
  font-size: 14px;
  text-align: center;
  margin-bottom: 0;
`

export default class Footer extends React.Component {
  render() {
    return (
      <Menu>
        <MenuItemWrapper>
          <LinkGroup to="/">
            <Icon iconName={'home'} size="30px" />
            <LogoText>Home</LogoText>
          </LinkGroup>
        </MenuItemWrapper>

        <MenuItemWrapper>
          <LinkGroup to="/cv">
            <Icon iconName={'person'} size="30px" />
            <LogoText>about:me</LogoText>
          </LinkGroup>
        </MenuItemWrapper>

        <MenuItemWrapper>
          <LinkGroup to="/category/tutorial">
            <Icon iconName={'book'} size="30px" />
            <LogoText>Tutorial</LogoText>
          </LinkGroup>
        </MenuItemWrapper>
      </Menu>
    )
  }
}
