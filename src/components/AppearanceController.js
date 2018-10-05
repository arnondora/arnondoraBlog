import React from 'react'
import styled from 'styled-components'

import { Icon } from '../components/MaterialIcon'

const Container = styled.div`
  position: sticky;
  left: 10%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`

const ItemIcon = styled(Icon)`
  font-size: ${props => props.size + 'px'};
  color: ${props =>
    props.isNight ? props.theme.night_text_normal : props.theme.textSecondary};
`

const ItemButton = styled.button`
  display: flex;
  background-color: ${props =>
    props.isNight
      ? props.theme.night_darkBackground
      : props.theme.defaultBackground};
  align-items: center;
  border: none;

  &:focus {
    outline: none;
  }

  &:hover > ${ItemIcon} {
    color: ${props =>
      props.isNight ? props.theme.night_text_light : props.theme.textHeading};
  }
`

export default class AppearanceController extends React.Component {
  render() {
    return (
      <Container>
        <ItemButton
          onClick={this.props.nightModeSwitcher}
          isNight={this.props.isNight}
        >
          <ItemIcon isNight={this.props.isNight} size={30} noLineHeight>
            {this.props.isNight ? 'brightness_3' : 'wb_sunny'}
          </ItemIcon>
        </ItemButton>
        <ItemButton
          onClick={this.props.enlargeFont}
          isNight={this.props.isNight}
        >
          <ItemIcon isNight={this.props.isNight} size={30} noLineHeight>
            {'title'}
          </ItemIcon>
        </ItemButton>
        <ItemButton
          onClick={this.props.decreaseFont}
          isNight={this.props.isNight}
        >
          <ItemIcon isNight={this.props.isNight} size={25} noLineHeight>
            {'title'}
          </ItemIcon>
        </ItemButton>
      </Container>
    )
  }
}
