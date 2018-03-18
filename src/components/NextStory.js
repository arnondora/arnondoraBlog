import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import color from 'color'

import colours from '../utils/colours'

const SuperWrapper = styled.div`
  background-color: ${colours.secondaryBackground};
  border-top: 1px solid ${colours.secondaryBorder};
  border-bottom: ${props => props.hasRelated? '1px solid ' + colours.secondaryBorder : 'none'};
  padding-top: 35px;
  padding-bottom: 35px;
`

const Container = styled.div`
  display: flex;
  justify-content:space-between;
  flex-wrap: nowrap;
  width: 70%;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction:column;
  }
`

const StoryContainer = styled.div`
    display: flex;
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
  margin-right: 5px;
`

const NextStoryContainer = StoryContainer.extend`
  align-self:flex-end;
  float: right;
  margin-left: 5px;
`

const Label = styled.span`
  color: ${colours.textSecondary};
  font-size: 1.2em;
  font-weight: 300;
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

    @media (max-width: 768px) {
      text-align: left;
    }
  }

  :hover {
    color: ${color(colours.primaryColour).darken(0.2).string()};
  }

`

const ContentWrapper = styled.div`
  margin:3px;
  display: flex;
  flex-direction:column;
`

export default class NextStory extends React.Component {
  render() {
    return (
        <SuperWrapper hasRelated={this.props.hasRelated}>
          <Container>
            {
              this.props.next != false ?
              <NextStoryContainer>
                  <ContentWrapper>
                    <Label>Previous</Label>
                    <Heading to={this.props.next.fields.slug}>← {this.props.next.frontmatter.title}</Heading>
                  </ContentWrapper>
              </NextStoryContainer>
              :
              null
            }

            {
              this.props.prev != false ?
              <PreviousStoryContainer>
                  <ContentWrapper>
                    <Label>Next</Label>
                    <Heading to = {this.props.prev.fields.slug}>{this.props.prev.frontmatter.title} →</Heading>
                  </ContentWrapper>
              </PreviousStoryContainer>
              :
              null
            }

          </Container>
        </SuperWrapper>
    )
  }
}
