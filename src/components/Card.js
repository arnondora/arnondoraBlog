import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import capitalize from 'lodash/capitalize'
import colours from '../utils/colours'

const Container = styled(Link) `
  display: flex;
  flex-direction: column;
  padding: 60px 52px 60px 52px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.05);
  border-radius: 2px;
  overflow: hidden;
  border-radius: 8px;

  :hover {
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.20);
  }
`

const Heading = styled.h2`
  color: ${colours.textHeading};
  font-size: 25.92px;
  margin-top:0;
  margin-bottom: 0;

  ${Container}:hover > & {
    color: ${colours.primaryColour};
  }
`

const Except = styled.p`
  color: ${colours.textSecondary};
  margin-top:30px;
  margin-bottom: 0;
`

const DateInfo = Except.extend`
  color: ${colours.textDisable};
`
export default class Card extends React.Component {
  render () {
    return (
      <Container to ={this.props.slug}>
        <Heading to ={this.props.slug}>{this.props.heading}</Heading>
        <Except>{this.props.excerpt}</Except>
        <DateInfo>{capitalize(this.props.category)} | {this.props.publishedDate} | {capitalize(this.props.author)}</DateInfo>
      </Container>
    )
  }
}
