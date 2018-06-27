import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { isEmpty, capitalize } from 'lodash'

const Container = styled(Link)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 8px;
  margin-top: 40px;
  :first-child {
    margin-top: 0px;
  }
`
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${props => (props.isThumbnail ? 20 : 60)}px 52px 60px 52px;
  background-color: #ffffff;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  overflow: hidden;

  :hover {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  }
`

const Heading = styled.h2`
  color: ${props => props.theme.textHeading};
  font-size: 25.92px;
  margin-top: 0;
  margin-bottom: 0;

  ${ContentContainer}:hover > & {
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
export default class CardImage extends React.Component {
  render() {
    return (
      <Container to={this.props.post.node.fields.slug}>
        {!isEmpty(this.props.post.node.frontmatter.image) ? (
          <Img
            sizes={this.props.post.node.frontmatter.image.childImageSharp.sizes}
            style={{ height: '300px', width: '100%' }}
          />
        ) : null}
        <ContentContainer
          isThumbnail={!isEmpty(this.props.post.node.frontmatter.image)}
        >
          <Heading to={this.props.post.node.fields.slug}>
            {this.props.post.node.frontmatter.title}
          </Heading>
          <Except>{this.props.post.node.frontmatter.excerpt}</Except>
          <DateInfo>
            {capitalize(this.props.post.node.frontmatter.category)} |{' '}
            {this.props.post.node.frontmatter.date} |{' '}
            {capitalize(this.props.post.node.frontmatter.author)}
          </DateInfo>
        </ContentContainer>
      </Container>
    )
  }
}
