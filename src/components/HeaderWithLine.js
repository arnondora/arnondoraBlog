import React from 'react'
import styled from 'styled-components'

const Label = styled.span`
  font-size: 37.32px;
  font-weight: 800;
  margin-bottom: 12px;
  width: 100%;
  border-bottom-style: solid;
  border-bottom-color: ${props => props.theme.primaryColour};
  border-bottom-width: 5px;
`
export default class HeaderWithLine extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Label>{this.props.label}</Label>
      </React.Fragment>
    )
  }
}
