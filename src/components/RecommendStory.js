import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import { get } from 'lodash'

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

const StoryWrapper = styled(Link)`
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${props => props.thumbnail}), ${colours.primaryColour};
  background-position:center;
  background-repeat: no-repeat;
  background-size: cover;
  width: ${props => (props.width * 100) + "%"};

  padding: 0.5em;
  display: flex;
  height:200px;
  justify-content: center;
  align-items: center;

  font-size: 1.2em;
  color:white;
  text-align: center;
  vertical-align: middle;
  text-align: center;
  margin:0;

  :visited, :link {
    color:white;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

`

export default class RecommendStory extends React.Component {
  render () {
    return (
      <Container>
        {
          this.props.stories.map((story,index) => {
            return (
              <StoryWrapper to={story.node.fields.slug} key={story.node.fields.slug} width={1/this.props.stories.length} thumbnail={get(story.node.frontmatter,'image.childImageSharp.sizes.src',"")}>
                  {story.node.frontmatter.title}
              </StoryWrapper>
            )
          })
        }
      </Container>
    )
  }
}
