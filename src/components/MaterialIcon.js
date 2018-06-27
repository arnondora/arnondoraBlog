import React from 'react'
import styled from 'styled-components'

const Icon = styled.i`
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: ${props => props.size};
  color: ${props => (props.colour ? props.colour : 'white')};
  display: inline-block;
  line-height: ${props => (props.noLineHeight ? 'inherit' : 1)};
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
`

export default class MaterialIcon extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Icon noLineHeight={this.props.noLineHeight} size={this.props.size}>
          {this.props.iconName}
        </Icon>
      </React.Fragment>
    )
  }
}
