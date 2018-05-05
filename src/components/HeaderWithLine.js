import React from 'react'
import styled from 'styled-components'

import colours from '../utils/colours'

const Container = styled.div`
  width: 100%;
  border-bottom-style: solid;
  border-bottom-color: ${colours.primaryColour};
  border-bottom-width: 5px;
`
const Label = styled.span`
  font-size: 37.32px;
  font-weight: 800;
  padding-bottom: 12px;
`
export default class HeaderWithLine extends React.Component {
  render () {
    return (
      <Container>
        <Label>{this.props.label}</Label>
      </Container>
    )
  }
}
