import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import color from 'color'

import colours from '../utils/colours'

const SuperWrapper = styled.div`
  background-color: ${colours.secondaryBackground};
  border-top: 1px solid ${colours.secondaryBorder};
  padding-top: 35px;
  padding-bottom: 35px;
`

const Container = styled.div`
  display: flex;
  justify-content:space-between;
  flex-wrap: wrap;
  width: 50%;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction:column;
  }
`

const StoryContainer = styled.div`
    display: flex;
    flex-basis: 50%;
    flex-direction:column;
    width:50%;

    @media (max-width: 768px) {
      width:100%;
      margin-top:0;
      margin-bottom: 0;

      :last-child {
        margin-top:10px
      }
    }
`
const PreviousStoryContainer = StoryContainer.extend`
  align-self:flex-start;
  float: left;
`

const NextStoryContainer = StoryContainer.extend`
  align-self:flex-end;
  float: right;
`

const Label = styled.p`
  color: ${colours.textSecondary};
  font-size: 1.2em;
  margin: 0;

  ${NextStoryContainer} > & {
    text-align: right;
  }
`

const Heading = styled(Link)`
  color: ${colours.primaryColour};
  font-size: 1.4em;
  font-weight: 700;
  margin: 10px 0 0 0;

  ${NextStoryContainer} > & {
    text-align: right;
  }

  :hover {
    color: ${color(colours.primaryColour).darken(0.2).string()};
  }

`

export default class NextStory extends React.Component {
  render() {
    return (
        <SuperWrapper>
          <Container>
            {
              this.props.prev != false ?
              <PreviousStoryContainer>
                <Label>Previous</Label>
                <Heading to = {this.props.prev.fields.slug}>← {this.props.prev.frontmatter.title}</Heading>
              </PreviousStoryContainer>
              :
              null
            }

            {
              this.props.next != false ?
              <NextStoryContainer>
                <Label>Next</Label>
                <Heading to={this.props.next.fields.slug}>{this.props.next.frontmatter.title} →</Heading>
              </NextStoryContainer>
              :
              null
            }

          </Container>
        </SuperWrapper>
    )
  }
}
