import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faHome, faUser, faBook} from '@fortawesome/fontawesome-free-solid'
import colours from '../utils/colours'

fontawesome.library.add(faHome, faUser, faBook)

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
`

const Item = styled(Link)`
  background-color: ${props => props.bgColour};
  width:100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-self: center;
  padding-top: 10px;
  padding-bottom: 10px;

  :hover
  {
    background-color: #0c85e5
  }
`

const ItemA = styled.a`
  background-color: ${props => props.bgColour};
  width:100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-self: center;
  padding-top: 10px;
  padding-bottom: 10px;

  :hover
  {
    background-color: #0c85e5
  }
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
        <Item to = "/" bgColour={colours.primaryColour}>
          <Icon icon={["fas", "home"]} size ="2x"/>
          <LogoText>Home</LogoText>
        </Item>

        <ItemA  href = "https://sway.com/tkELbwHp3Smhd1aN" bgColour={colours.primaryColour}>
          <Icon icon={["fas", "user"]} size ="2x"/>
          <LogoText>about:me</LogoText>
        </ItemA>

        <Item to = "/tutorial" bgColour={colours.primaryColour}>
          <Icon icon={["fas", "book"]} size ="2x"/>
          <LogoText>Tutorial</LogoText>
        </Item>
      </Menu>
    )
  }
}
