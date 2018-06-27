import React from 'react'
import styled from 'styled-components'
import color from 'color'

const Container = styled.div`
  background-color: ${props => props.theme.primaryColour};
  color: white;
  float: ${props => props.float};
  padding: 13px 14px 13px 14px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 2px;

  :visited {
    color: white;
  }

  :hover {
    background-color: ${props =>
      color(props.theme.primaryColour)
        .darken(0.2)
        .string()};
  }
`

export default class PrimaryButton extends React.Component {
  render() {
    return <Container float={this.props.float}>{this.props.label}</Container>
  }
}
