import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import get from 'lodash/get'

import colours from '../utils/colours'

const RecommendStoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  @media (max-width: 768px) {
    flex-direction: column;
    flex-wrap: wrap;
  }
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
`

const PostThumbnail = styled(Img)`
  position: absolute !important;
  top:0;
  left:0;
  height: 100%;
  width: 100%;
  margin:0;
  padding:0;
  display: flex;
  z-index: 0;
`

const BlankPostThumbnail = styled.div`
  position: absolute !important;
  background-color: ${colours.primaryColour};
  top:0;
  left:0;
  height: 100%;
  width: 100%;
  margin:0;
  padding:0;
  display: flex;
  z-index: 0;
`

const ContentContainer = styled.div`
  position: absolute;
  top:0;
  height:100%;
  display:flex;
  align-items: center;
  justify-content:center;
  z-index: 2;
  text-align:center;
`
const StoryTitle = styled.p`
  color: white;
  padding:0;
  width:90%;
  margin: 0 auto;
`

const StoryWrapper = styled(Link)`
  position: relative;
  width: ${props => props.width * 100 + '%'};
  padding: 0.5em;
  height: 200px;

  font-size: 1.2em;
  color: white;
  text-align: center;
  vertical-align: middle;
  text-align: center;
  margin: 0;

  :visited,
  :link {
    color: white;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

export default class RecommendStory extends React.Component {
  render() {
    return (
      <RecommendStoryContainer>
        {this.props.stories.map((story, index) => {
          return (
            <StoryWrapper
              to={story.node.fields.slug}
              key={story.node.fields.slug}
              width={1 / this.props.stories.length}
            >
              <ContentContainer><StoryTitle>{story.node.frontmatter.title}</StoryTitle></ContentContainer>
              <Overlay/>
              {
                get(story.node.frontmatter, 'image.childImageSharp.fluid', null) !== null ?
                  <PostThumbnail title={get(story.node.frontmatter,'title')} alt={get(story.node.frontmatter,'title')} fluid={story.node.frontmatter.image.childImageSharp.fluid}/>
                :
                  <BlankPostThumbnail title={get(story.node.frontmatter,'title')}/>
              }
            </StoryWrapper>
          )
        })}
      </RecommendStoryContainer>
    )
  }
}
