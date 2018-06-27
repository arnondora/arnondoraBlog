import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import capitalize from 'lodash/capitalize'

const Container = styled(Link)`
  display: flex;
  flex-direction: column;
  padding: 60px 52px 60px 52px;
  background-color: #ffffff;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  overflow: hidden;
  border-radius: 8px;

  :hover {
    transition: box-shadow 0.5s ease;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  }
`

const Heading = styled.h2`
  color: ${props => props.theme.textHeading};
  font-size: 25.92px;
  margin-top: 0;
  margin-bottom: 0;

  ${Container}:hover > & {
    color: ${props => props.theme.primaryColour};
  }
`

const Except = styled.p`
  color: ${props => props.theme.textSecondary};
  margin-top: 30px;
  margin-bottom: 0;
`

const DateInfo = Except.extend`
  color: ${props => props.theme.textDisable};
`
export default class Card extends React.Component {
  render() {
    return (
      <Container to={this.props.slug}>
        <Heading to={this.props.slug}>{this.props.heading}</Heading>
        <Except>{this.props.excerpt}</Except>
        <DateInfo>
          {capitalize(this.props.category)} | {this.props.publishedDate} |{' '}
          {capitalize(this.props.author)}
        </DateInfo>
      </Container>
    )
  }
}
