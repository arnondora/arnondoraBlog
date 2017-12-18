import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

import colours from '../utils/colours'

const Container =  styled.div`
  display: flex;
  flex-direction:row;
  flex-wrap:nowrap;

  @media (max-width: 768px) {
    flex-direction:column;
    flex-wrap:wrap;
  }
`

const StoryWrapper = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${props => props.thumbnail}), ${colours.primaryColour};
  background-position:center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0.5em;
  display: flex;
  flex-grow: 1;
  height:200px;
  justify-content: center;
  align-items: center;
`

const Story = styled(Link)`
  font-size: 1.2em;
  color:white;
  text-align: center;
  vertical-align: middle;
  text-align: center;
  margin:0;
`

export default class RecommendStory extends React.Component {
  render () {
    console.log(this.props.stories)
    return (
      <Container>
        {
          this.props.stories.map((story,index) => {
            console.log(story)
            return (
              <StoryWrapper key={story.node.fields.slug} thumbnail={story.node.frontmatter.image.childImageSharp.resolutions.srcWebp}>
                <Story to={story.node.fields.slug}>
                  {story.node.frontmatter.title}
                </Story>
              </StoryWrapper>
            )
          })
        }
      </Container>
    )
  }
}
