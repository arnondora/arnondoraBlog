import React from 'react'
import styled from 'styled-components'

import { Icon } from '../components/MaterialIcon'

const ControllerLabel = styled.span`
  color: ${props =>
    props.isNight ? props.theme.night_text_normal : props.theme.textSecondary};
`

const ItemIcon = Icon.extend`
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

export default class MobileTextController extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ControllerLabel isNight={this.props.isNight}>
          Appearance Controller :{' '}
        </ControllerLabel>
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
      </React.Fragment>
    )
  }
}
